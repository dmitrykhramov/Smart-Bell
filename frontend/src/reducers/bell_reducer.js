import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_LOGS,
    FETCH_VISITORS,
    SOCKET_STATE
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case FETCH_LOGS:
            return { ...state, logs: action.payload };
        case FETCH_VISITORS:
            return { ...state, visitors: action.payload };
        case SOCKET_STATE:
            return { ...state, socket: action.payload };
    }

    return state;
}