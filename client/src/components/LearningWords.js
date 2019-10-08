import React from 'react';

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
            <div>
                LearningWord
            </div>
        )
    }
}

export default LearningWords;