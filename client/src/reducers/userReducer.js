import {ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER, SET_USER} from '../actions/types';

const initialState = {
    _id: null,
    name: null,
    email: null,
    categories: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: {
            console.log('set user',action.payload)
            return { ...action.payload};
        }
        case ADD_WORD_CATEGORY_TO_USER:{
            console.log('work', { ...state }, action.payload)
            return { ...state, categories: [... action.payload.categories ]};
        }
        case REMOVE_WORD_CATEGORY_FROM_USER: {
            return { ...state, categories: [... action.payload.categories ]};
        }
        default:
            return state;
    }
}