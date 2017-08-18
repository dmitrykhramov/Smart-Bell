import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_LOGS,
    FETCH_VISITORS
} from './types.js';

const ROOT_URL = 'http://localhost:3090';

export function signinUser( { email, password }) {
    return function(dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password})
            .then(response => {
                // If request is good
                // - update state to indicate user is authenticated
                dispatch( { type: AUTH_USER });
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

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password})
            .then(response => {
                dispatch( { type: AUTH_USER });
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

    return { type: UNAUTH_USER };
}

export function fetchLogs() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/logs`, {
            headers: { authorization: localStorage.getItem('token') }
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
    return function(dispatch) {
        axios.get(`${ROOT_URL}/visitors`, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_VISITORS,
                    payload: response.data.visitors
                });
            });
    }
}

export function addVisitor({ firstname, lastname }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/add_visitor`, {firstname, lastname})
            .then(response => {
                console.log("Visitor added");
            })
            .catch(response => {
                console.log("Can't add a visitor");
            });
    }
}

export function deleteVisitor(id) {
    return function(dispatch) {
        axios.delete(`${ROOT_URL}/delete/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                console.log("Visitor deleted");
            })
            .catch(response => {
                console.log("Can't delete a visitor");
                console.log(response);
            });
    }
}

export function toogleAccess(id, value) {
    return function(dispatch) {
        axios.patch(`${ROOT_URL}/toogle/${id}/${value}`, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                console.log("Access changed");
            })
            .catch(response => {
                console.log("Can't change access");
            });
    }
}



