import { GET_WORD_CATEGORIES, WORD_CATEGORIES_LOADING } from "../actions/types";

const initialState = {
    wordCategories: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WORD_CATEGORIES:{
            console.log('work', state)
            return { ...state, wordCategories: action.payload, loading: false   };
        }
        case WORD_CATEGORIES_LOADING:{
            console.log('work', state)
            return { ...state, loading: true };
        }
        default:
            return state;
    }
}