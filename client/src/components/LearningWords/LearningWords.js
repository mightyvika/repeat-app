import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './LearningWords.css';

class LearningWords extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            words: [],
            userCategories: []
        }
    }

    componentDidMount() {
        const self = this;
    }

    render() {
        return (
            <div className="learning-words-container">
                <div className="word-card">
                    <div className="word-card__word-container">
                        <div className="word-card__title">Word</div>
                        <div className="word-card__transcription">[dfkjfokjrf]</div>
                        <div className="word-card__translation">Перевод</div>
                    </div>
                    <div className="word-card__buttons-container">
                        <div className="word-card__button">Я знаю это слово</div>
                        <div className="word-card__button">Я не знаю это слово</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {addWordToLearningWords, addWordToKnownWords, getWordsForLearning, getUserLearningWords})(LearningWords);