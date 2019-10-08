import { combineReducers } from 'redux';
import wordCategoryReducer from './wordCategoryReducer';

export default combineReducers({
    wordCategories: wordCategoryReducer
})