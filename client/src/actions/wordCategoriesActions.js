import axios from 'axios';
import { GET_WORD_CATEGORIES, WORD_CATEGORIES_LOADING } from "./types";

export const getWordCategories = () => dispatch => {
    dispatch(setWordCategoriesLoading());
    axios
        .get('/api/word_categories')
        .then(res =>
            dispatch({
                type: GET_WORD_CATEGORIES,
                payload: res.data
            })
        )
};

export const setWordCategoriesLoading = () => {
    return {
        type: WORD_CATEGORIES_LOADING
    }
}