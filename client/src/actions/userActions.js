import { ADD_WORD_CATEGORY_TO_USER, REMOVE_WORD_CATEGORY_FROM_USER } from './types';

export const toggleUserCategory = (userId, categoryId) => {
    return {
        type: ADD_WORD_CATEGORY_TO_USER,
        payload: {userId: userId, categoryId: categoryId}
    }
};