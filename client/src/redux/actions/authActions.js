import axios from 'axios';
import { returnErrors } from './errorAction';

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADING, USER_LOADED, ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });



    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({type: AUTH_ERROR});
        })
};

export const registerUser = ({name, email, password}) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});
    axios.post('/api/users', body, config)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: REGISTER_FAIL})
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        })
};

export const loginUser = ({email, password}) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password});
    axios.post('/api/auth', body, config)
        .then(res => {
            dispatch({type: LOGIN_SUCCESS, payload: res.data})
        })
        .catch(err => {
            dispatch({type: LOGIN_FAIL})
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        })
};

export const logout = () => {
    return {type: LOGOUT_SUCCESS}
};

export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
};

export const addUserCategory = (categoryId) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    const body = JSON.stringify({userId, categoryId});
    axios.post('/api/users/word_category/add', body, tokenConfig(getState))
        .then(res => dispatch({
                type: ADD_WORD_CATEGORY_TO_USER,
                payload: {categories: res.data.categories}
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

export const removeUserCategory = (categoryId) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    const body = JSON.stringify({userId, categoryId});
    axios.post('/api/users/word_category/remove', body, tokenConfig(getState))
        .then(res => dispatch({
                type: REMOVE_WORD_CATEGORY_FROM_USER,
                payload: {categories: res.data.categories}
            })
         )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

export const addWordToLearningWords = (categoryId) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    const body = JSON.stringify({userId, categoryId});
    axios.post('/api/users/word_category/add', body, tokenConfig(getState))
        .then(res => dispatch({
                type: ADD_WORD_CATEGORY_TO_USER,
                payload: {categories: res.data.categories}
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

export const addWordToKnownWords = (categoryId) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    const body = JSON.stringify({userId, categoryId});
    axios.post('/api/users/word_category/add', body, tokenConfig(getState))
        .then(res => dispatch({
                type: ADD_WORD_CATEGORY_TO_USER,
                payload: {categories: res.data.categories}
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};