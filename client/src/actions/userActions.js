import {ADD_WORD_CATEGORY_TO_USER, AUTH_ERROR, REMOVE_WORD_CATEGORY_FROM_USER, USER_LOADED} from './types';
import axios from "axios";
import {returnErrors} from "./errorAction";
import {tokenConfig} from "./authActions";

export const toggleUserCategory = (userId, categoryId) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

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