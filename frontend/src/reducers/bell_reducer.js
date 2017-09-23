import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_LOGS,
    FETCH_VISITORS,
    SOCKET_STATE,
    UPLOAD_DOCUMENT_FAIL,
    UPLOAD_DOCUMENT_SUCCESS,
    VISITOR_ADD_SUCCESS,
    VISITOR_ADD_FAIL,
    VISITOR_DELETE_SUCCESS,
    VISITOR_DELETE_FAIL
} from '../actions/types';

export default function(state = {visitor_add: 'none', visitor_delete: 'none', photo: 'none'}, action) {
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
        case UPLOAD_DOCUMENT_SUCCESS:
            return { ...state, visitor_add: 'none', photo: action.payload };
        case UPLOAD_DOCUMENT_FAIL:
            return { ...state, photo: action.payload };
        case VISITOR_ADD_SUCCESS:
            return { ...state, visitor_add: action.payload };
        case VISITOR_ADD_FAIL:
            return { ...state, visitor_add: action.payload };
        case VISITOR_DELETE_SUCCESS:
            return { ...state, visitor_delete: action.payload };
        case VISITOR_DELETE_FAIL:
            return { ...state, visitor_delete: action.payload };
    }

    return state;
}