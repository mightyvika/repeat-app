import axios from "axios";
import {GET_LEARNING_WORDS, GET_USER_LEARNING_WORDS} from "./types";
import {returnErrors} from "./errorAction";
import {tokenConfig} from "./authActions";

export const getWordsForLearning = (userCategories, learnedWords = [], knownWords = []) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    let excludeWords = [... new Set(learnedWords.concat(knownWords))]
    const body = JSON.stringify({userId, userCategories, excludeWords});
    axios.post('/api/words/get_words', body, tokenConfig(getState))
        .then(res => dispatch({
                type: GET_LEARNING_WORDS,
                payload: {learningWords: res.data.words}
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

export const getUserLearningWords = (userLearningWords) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const userId = getState().auth.user._id;
    const body = JSON.stringify({userId, userLearningWords});
    axios.post('/api/words/get_user_words', body, tokenConfig(getState))
        .then(res => dispatch({
                type: GET_USER_LEARNING_WORDS,
                payload: {userLearningWords: res.data.words}
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

