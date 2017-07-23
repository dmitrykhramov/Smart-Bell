import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
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
                browserHistory.push('/home');
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
                browserHistory.push('/home');
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

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}

export function addVisitor({ firstname, lastname }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/add_visitor`, { firstname, lastname})
            .then(response => {
                console.log("Visitor added");
            })
            .catch(response => {
                console.log("Can't add a visitor");
            });
    }
}


