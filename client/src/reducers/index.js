import { combineReducers } from 'redux';
import wordCategoryReducer from './wordCategoryReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    wordCategories: wordCategoryReducer,
    user: userReducer,
    error: errorReducer,
    auth: authReducer
})