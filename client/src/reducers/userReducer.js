import {ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER} from '../actions/types';

const initialState = {
    user: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_WORD_CATEGORY_TO_USER:{
            console.log('work', state)
            return { ...state, user: [... state.user.categories, action.payload.categoryId] };
        }
        case REMOVE_WORD_CATEGORY_FROM_USER: {
            return { ...state }
        }
        default:
            return state;
    }
}