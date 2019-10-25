import axios from "axios";
import {GET_LEARNING_WORDS, GET_USER_LEARNING_WORDS} from "./types";
import {returnErrors} from "./errorAction";
import {tokenConfig} from "./authActions";

export const getWordsForLearning = (userCategories, learnedWords = [], knownWords = []) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let excludeWords = [... new Set(learnedWords.concat(knownWords))]
    const body = JSON.stringify({userCategories, excludeWords});
    console.log(userCategories)
    axios.get('/api/words/get_words', {params: {userCategories, excludeWords}})
        .then(res => {console.log(res.data);dispatch({
                type: GET_LEARNING_WORDS,
                payload: {words: res.data}
            })}
        )
        .catch(err => {
            // dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err)
        })
};

export const getUserLearningWords = (userLearningWords) => (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({userLearningWords});
    axios.get('/api/words/get_user_words', body)
        .then(res => dispatch({
                type: GET_USER_LEARNING_WORDS,
                payload: {words: res.data.words}
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

