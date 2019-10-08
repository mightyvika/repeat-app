import { GET_WORD_CATEGORIES } from "../actions/types";

const initialState = {
    wordCategories: [{id: '1', name: 'Top 100'}]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WORD_CATEGORIES:{
            console.log('work', state)
            return { ...state };}
        default:
            return state;
    }
}