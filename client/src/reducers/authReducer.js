import {
    AUTH_ERROR,
    USER_LOADED,
    USER_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS, ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    userCategories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
                userCategories: action.payload.categories
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                userCategories: null,
                isAuthenticated: false,
                isLoading: false
            };
        case ADD_WORD_CATEGORY_TO_USER:
            console.log('work', { ...state }, action.payload);
            return {
                ...state,
                userCategories: [... action.payload.categories ]
            };
        case REMOVE_WORD_CATEGORY_FROM_USER:
            console.log('work remove4', [... action.payload.categories ]);
            return {
                ...state,
                userCategories: [... action.payload.categories ]
            };
        default:
            return { ...state }
    }
}