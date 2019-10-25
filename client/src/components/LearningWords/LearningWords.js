import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {addWordToKnownWords, addWordToLearningWords} from "../../actions/authActions";
import {getWordsForLearning, getUserLearningWords} from "../../actions/wordsAction";

import './LearningWords.css';

class LearningWords extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            words: [],
            // userCategories: []
        }
    }

    componentDidMount() {
        const self = this;
        let { user } = this.props;
        console.log(this.props.user, this.props.userCategories, this.props, user, this)
        if (this.props.userCategories) {
            const words = this.props.getWordsForLearning(this.props.userCategories)
            console.log(words)
        }
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

const mapStateToProps = (state) => {
    return {user: state.auth.user, userCategories: state.auth.userCategories}
};

export default connect(mapStateToProps, {addWordToLearningWords, addWordToKnownWords, getWordsForLearning, getUserLearningWords})(LearningWords);