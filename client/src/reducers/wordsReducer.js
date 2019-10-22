    import {GET_LEARNING_WORDS, GET_USER_LEARNING_WORDS} from "../actions/types";


const initialState = {
    _id: null,
    name: null,
    email: null,
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LEARNING_WORDS:{
            console.log('work', { ...state }, action.payload)
            return { ...state, categories: [... action.payload.categories ]};
        }
        case GET_USER_LEARNING_WORDS: {
            return { ...state, categories: [... action.payload.categories ]};
        }
        default:
            return state;
    }
};