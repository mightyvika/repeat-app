import {ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER} from './types';
import axios from "axios";
import {returnErrors} from "./errorAction";
import {tokenConfig} from "./authActions";

export const toggleUserCategory = (categoryId) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    const body = JSON.stringify({userId, categoryId});
    axios.post('/api/users/word_category', body, tokenConfig(getState))
        .then(res => dispatch({
                type: ADD_WORD_CATEGORY_TO_USER,
                payload: {userId: userId, categories: res.categories}
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
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
        .then(res => {
            console.log(res)
            dispatch({
                type: ADD_WORD_CATEGORY_TO_USER,
                payload: {userId: userId, categories: res.data.categories}
            })

        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}

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
            payload: {userId: userId, categories: res.data.categories}
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}