import React, { Component } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signup } from '../actions/loginAction';
import ModalInput from "./ModalInput";


class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            modalShow: false
        }

        this.inputLogin = React.createRef();
        this.inputPassword = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.regit = this.regit.bind(this);
    }

    // componentWillUpdate() {
        // this.checkIfSignuped();
    // }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        return (
            <Container>
                <div 
                    className = "signup"
                    onClick = {() => this.setState({modalShow: true})}
                    style={{cursor: 'pointer'}}    
                >
                    <span className="mr-3">Create New account?</span>
                    <a id="create-account-btn"
                         
                        >
                        Sign up
                    </a>
                </div>
                <ModalInput 
                    show={this.state.modalShow}
                    onHide={modalClose}
                    onSave = {this.regit}
                    modalTitle = "Create account"
                >   
                    <Form onSubmit = {this.regit}>
                        <Form.Group as={Row} controlId="formHorizontalUsername">
                            <Form.Label column sm = {2} className="text-right">
                                Username
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="text" 
                                            placeholder="Username" 
                                            ref = {this.inputLogin}
                                            onChange = {this.handleLogin}
                                            />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} sm={{span:10, offset : 2}} controlId="formHorizontalPassword">
                            <Form.Label column sm={2} className="text-right">
                                Password
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control type="password" 
                                            placeholder="Password" 
                                            ref = {this.inputPassword}
                                            onChange = {this.handlePassword}
                                            />
                            </Col>
                        </Form.Group>
                    </Form>
                </ModalInput> 
            </Container>
        )
    }

    handleLogin(e) {
        this.setState({
            login: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    regit(e) {
        this.inputLogin.current.value = '';
        this.inputPassword.current.value = '';
        this.props.signup(this.state.login, this.state.password);
        // this.checkIfSignuped();
    }

    checkIfSignuped(){
        console.log(this.props.errorOccured)
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,
    errorOccured: state.login.errorOccured
})

export default connect(mapStateToProps, { signup })(Signup);