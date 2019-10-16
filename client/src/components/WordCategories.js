import React from 'react';
import { MdCheckCircle as Check } from "react-icons/md";
import { connect } from 'react-redux';
import { getWordCategories } from "../actions/wordCategoriesActions";
import { toggleUserCategory } from "../actions/userActions";
import PropTypes from 'prop-types';

import './WordCategories.css';

class WordCategories extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            userCategories: []
        }
    }

    componentDidMount() {
        this.props.getWordCategories();
    }

    onToggleCategory = (categoryId) => {
        if (this.props.user._id) {
            console.log('fofof', this.props.user, this.props.user._id, categoryId)
            this.props.toggleUserCategory(this.props.user._id, categoryId);
        }
    }

    // toggleUserCategory = (itemId) => {
    //     let userCategories;
    //     if (this.state.userCategories.includes(itemId)){
    //         userCategories = this.state.userCategories.filter(item => item !== itemId);
    //     } else {
    //         userCategories = [itemId, ...this.state.userCategories];
    //     }
    //     this.setState({userCategories});
    // };

    render() {
        let { wordCategories } = this.props.wordCategories;
        console.log(this.props, this.props.item);
        return (
            <div>
                {wordCategories.map((item) =>
                    (<div>
                        <div className="category-item" onClick={this.onToggleCategory.bind(this, item._id)}>
                            <div className="category-item__icon"><img src="../../logo192.png"/></div>
                            <div>{item.name}</div>
                            {this.props.user && this.props.user.categories.includes(item.id) ? (
                                <div className="category-item__check-icon"><Check/></div>
                            ) : null}
                        </div>
                    </div>)
                )}
            </div>
        )
    }
}

WordCategories.propTypes = {
    getWordCategories: PropTypes.func.isRequired,
    wordCategories: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    console.log(state)
    return {wordCategories: state.wordCategories, user: state.auth.user}
};

export default connect(mapStateToProps, { getWordCategories, toggleUserCategory })(WordCategories);