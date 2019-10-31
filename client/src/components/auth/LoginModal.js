import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/authActions';

class LoginModal extends React.Component {
    state = {
        modal: false,
        email: '',
        password: '',
        message: null
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({message: error.message.message})
            } else {
                this.setState({message: null});
            }
        }

        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }

        }
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loginUser: PropTypes.func.isRequired
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        console.log(email, password)
        const user = {
            email,
            password
        };

        this.props.loginUser(user);

    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Войти</NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Войти</ModalHeader>
                    <ModalBody>
                        { this.state.message ? (<Alert color="danger">{this.state.message}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Пароль</Label>
                                <Input type="password" name="password" id="password" placeholder="Пароль" onChange={this.onChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="dark" block>Войти</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { loginUser })(LoginModal);