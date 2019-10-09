import { combineReducers } from 'redux';
import wordCategoryReducer from './wordCategoryReducer';
import userReducer from './userReducer';

export default combineReducers({
    wordCategories: wordCategoryReducer,
    user: userReducer
})