import {
    AUTH_ERROR,
    USER_LOADED,
    USER_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS, ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER, ADD_WORD_TO_LEARNING_WORDS, ADD_WORD_TO_KNOWN_WORDS
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
            return {
                ...state,
                userCategories: [... action.payload.categories ]
            };
        case REMOVE_WORD_CATEGORY_FROM_USER:
            return {
                ...state,
                userCategories: [... action.payload.categories ]
            };
        case ADD_WORD_TO_LEARNING_WORDS:
            console.log('work learn', [... action.payload.words ]);
            return {
                ...state,
                user: {...state.user, learnedWords: [... action.payload.words ]}
            };
        case ADD_WORD_TO_KNOWN_WORDS:
            console.log('work known', [... action.payload.words ]);
            return {
                ...state,
                user: {...state.user, knownWords: [... action.payload.words ]}
            };
        default:
            return { ...state }
    }
}