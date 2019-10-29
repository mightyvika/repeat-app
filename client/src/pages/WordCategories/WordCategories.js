import React from 'react';
import { MdCheckBox as Check, MdCheckBoxOutlineBlank as EmptyCheck } from "react-icons/md";
import { connect } from 'react-redux';
import { getWordCategories } from "../../redux/actions/wordCategoriesActions";
import { addUserCategory, removeUserCategory } from "../../redux/actions/authActions";
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
        let { user } = this.props;
        console.log(this.props, this.props.item);
        return (
            <div>
                {wordCategories.map((item) =>
                    (<div>
                        <div className="category-item">
                            <div className="category-item__icon"><img src="../../logo192.png"/></div>
                            <div>{item.name}</div>
                            <div className="category-item__check-icon">
                            {this.props.userCategories && this.props.userCategories.includes(item._id) ? <Check onClick={this.props.removeUserCategory.bind(this, item._id)}/> : <EmptyCheck onClick={this.props.addUserCategory.bind(this, item._id)}/>}
                            </div>
                        </div>
                    </div>)
                )}
            </div>
        )
    }
}

WordCategories.propTypes = {
    getWordCategories: PropTypes.func.isRequired,
    removeUserCategory: PropTypes.func.isRequired,
    addUserCategory: PropTypes.func.isRequired,
    wordCategories: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {wordCategories: state.wordCategories, user: state.auth.user, userCategories: state.auth.userCategories}
};

export default connect(mapStateToProps, { getWordCategories, removeUserCategory, addUserCategory })(WordCategories);