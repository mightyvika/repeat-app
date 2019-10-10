import axios from 'axios';
import { returnErrors } from './errorAction';

import {
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    USER_LOADING, USER_LOADED
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