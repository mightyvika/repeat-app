import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addWordToKnownWords, addWordToLearningWords} from "../../redux/actions/authActions";
import {getWordsForLearning, getUserLearningWords} from "../../redux/actions/wordsAction";

import './LearningWords.css';

class LearningWords extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            words: [],
            currentWord: {}
        }
    }

    componentDidMount() {
        let { user } = this.props;
        console.log(this.props.user, this.props.userCategories, this.props, user, this)
        if (this.props.userCategories) {
            const words = this.props.getWordsForLearning(this.props.userCategories)
            console.log(words)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userCategories !== prevProps.userCategories) {
            this.props.getWordsForLearning(this.props.userCategories)
        }
        if (this.props.wordsForLearning !== prevProps.wordsForLearning){
            const words = [...this.props.wordsForLearning];
            this.setState({currentWord: words.pop(), words: words})
        }

        console.log('this', this, '\nprev', prevProps)
    }

    setWordAsKnown(wordId){
        this.setState({words: this.state.words.filter(word => word._id !== wordId)})
        this.props.addWordToKnownWords(wordId)
    }

    learnWord(wordId){
        this.setState({words: this.state.words.filter(word => word._id !== wordId)})
        this.props.addWordToLearningWords(wordId)
    }

    render() {
        if (this.props.user) {
            if (this.state.currentWord){
                const {_id, word, transcription, translation} = this.state.currentWord;
                return (
                    <div className="learning-words-container">
                        <div className="word-card">
                            <div className="word-card__word-container">
                                <div className="word-card__title">{word}</div>
                                <div className="word-card__transcription">[{transcription}]</div>
                                <div className="word-card__translation">{translation}</div>
                            </div>
                            <div className="word-card__buttons-container">
                                <div className="word-card__button" onClick={this.setWordAsKnown.bind(this, _id)}>Я знаю это слово</div>
                                <div className="word-card__button" onClick={this.learnWord.bind(this, _id)}>Я не знаю это слово</div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>Сейчас нет слов для запоминания</div>
                )
            }

        } else {
            return (
                <div className="learning-words-container">Пожалуйста, зарегистируйтесь или войдите в аккаунт</div>
            )

        }
    }
}

const mapStateToProps = (state) => {
    return {user: state.auth.user, userCategories: state.auth.userCategories, wordsForLearning: state.words.wordsForLearning, userLearningWords: state.auth.wordsToLearn}
};

export default connect(mapStateToProps, {addWordToLearningWords, addWordToKnownWords, getWordsForLearning, getUserLearningWords})(LearningWords);