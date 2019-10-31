import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/actions/authActions';

class RegistrationModal extends React.Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        message: null
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
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
        registerUser: PropTypes.func.isRequired
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    };

    onChange = e => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = e => {
        e.preventDefault();

        const { name, email, password } = this.state;
        console.log(name, email, password)
        const newUser = {
            name,
            email,
            password
        };

        this.props.registerUser(newUser);

    };

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">Зарегистрироваться</NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Зарегистрироваться</ModalHeader>
                    <ModalBody>
                        { this.state.message ? (<Alert color="danger">{this.state.message}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Имя</Label>
                            <Input type="text" name="name" id="name" placeholder="Имя" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Пароль</Label>
                            <Input type="password" name="password" id="password" placeholder="Пароль" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="dark" block>Зарегистрироваться</Button>
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

export default connect(mapStateToProps, { registerUser })(RegistrationModal);