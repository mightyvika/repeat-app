    import {GET_LEARNING_WORDS, GET_USER_LEARNING_WORDS} from "../actions/types";


const initialState = {
    userLearningWords: null,
    wordsForLearning: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LEARNING_WORDS:{
            console.log('wordsForLearning', { ...state }, action.payload)
            return { ...state, wordsForLearning: [... action.payload.words ]};
        }
        case GET_USER_LEARNING_WORDS: {
            console.log('userLearningWords', { ...state }, action.payload)
            return { ...state, userLearningWords: [... action.payload.words ]};
        }
        default:
            return state;
    }
};