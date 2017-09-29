import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_LOGS,
    FETCH_VISITORS,
    SOCKET_STATE,
    UPLOAD_DOCUMENT_SUCCESS,
    UPLOAD_DOCUMENT_FAIL,
    VISITOR_ADD_FAIL,
    VISITOR_ADD_SUCCESS,
    VISITOR_DELETE_FAIL,
    VISITOR_DELETE_SUCCESS,
    MAKE_PHOTO_FAIL,
    MAKE_PHOTO_SUCCESS,
    RESET_ADD_FORM
} from './types.js';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                // If request is good
                // - update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                // - save jwt token and id
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                // redirect to another route
                browserHistory.push('/');
            })
            .catch(() => {
                // If request bad
                // - show an error to the user
                dispatch(authError('Invalid email or password'));
            });

        // If request is successful
    }
}

export function signupUser({email, password}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id', response.data.id);
                browserHistory.push('/');
            })
            .catch(response => {
                dispatch(authError(response.response.data.error));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');

    return {type: UNAUTH_USER};
}

export function fetchLogs() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/logs`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_LOGS,
                    payload: response.data.logs
                });
            });
    }
}

export function fetchVisitors() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/visitors`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_VISITORS,
                    payload: response.data.visitors
                });
            });
    }
}


export function addVisitor({firstname, lastname, email}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/add_visitor`, {firstname, lastname, email})
            .then(response => {
                dispatch({
                    type: VISITOR_ADD_SUCCESS,
                    payload: 'success'
                });
                console.log("Visitor added");
            })
            .catch(response => {
                dispatch({
                    type: VISITOR_ADD_FAIL,
                    payload: 'fail'
                });
                console.log("Can't add a visitor");
            });
    }
}

export function deleteVisitor(id) {
    return function (dispatch) {
        axios.delete(`${ROOT_URL}/delete/${id}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: VISITOR_DELETE_SUCCESS,
                    payload: 'success'
                });
                console.log("Visitor deleted");
            })
            .catch(response => {
                dispatch({
                    type: VISITOR_DELETE_FAIL,
                    payload: 'fail'
                });
                console.log("Can't delete a visitor");
            });
    }
}

export function toogleAccess(id, value) {
    return function (dispatch) {
        axios.patch(`${ROOT_URL}/toogle/${id}/${value}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(response => {
                console.log("Access changed");
            })
            .catch(response => {
                console.log("Can't change access");
            });
    }
}

export function addSocketToState(ws) {
    return {
        type: SOCKET_STATE,
        payload: ws
    };
}

export function uploadDocument({file}, ws) {
    let data = new FormData();
    data.append('file', file);
    return (dispatch) => {
        axios.post(`${ROOT_URL}/photo`, data)
            .then(response => {
                // it causes error when it sends success msg first before sending request to websocket when it isn't connected
                // that's why I changed the order // by jun
                ws.send("photo_upload");
                dispatch({type: UPLOAD_DOCUMENT_SUCCESS, payload: 'success'});
			})
            .catch(error => dispatch({type: UPLOAD_DOCUMENT_FAIL, payload: 'fail'}));
    };
}

export function photoMake(result) {
    return function (dispatch) {
        if (result == 'success') {
            dispatch({
                type: MAKE_PHOTO_SUCCESS,
                payload: 'success'
            });
            console.log('Photo make success');
        } else if (result == 'fail') {
            dispatch({
                type: MAKE_PHOTO_FAIL,
                payload: 'fail'
            });
            console.log('Photo make fail');
        }
    };
}

export function resetAddForm() {
    return function (dispatch) {
        dispatch({
            type: RESET_ADD_FORM,
            payload: 'reset'
        });
        console.log('Form reset');
    };
    
}
