import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/loginAction";

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            login: '',
            password: ''
        }

        this.inputLogin = React.createRef();
        this.inputPassword = React.createRef();
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidUpdate() {
        // if (this.props.loggedIn) this.props.history.push("/determinant");
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center mb-4">
                    <h1>Sign in</h1>
                </Row>
                <Form onSubmit = {this.login}>
                    <Form.Group as={Row} controlId="formHorizontalUsername">
                        <Col>
                            <Form.Control type="text" 
                                          placeholder="Username" 
                                          ref = {this.inputLogin}
                                          onChange = {this.handleLogin}              
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Col>
                            <Form.Control type="password" 
                                          placeholder="Password" 
                                          ref = {this.inputPassword}
                                          onChange = {this.handlePassword}  
                            />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row}>
                        <Col>
                            <Button type="submit" 
                                    variant = "dark"
                                    block
                            >
                                Continue
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
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

    login(e) {
        e.preventDefault();
        this.inputLogin.current.value = '';
        this.inputPassword.current.value = '';
        this.props.login(this.state.login, this.state.password);
        // this.checkIfSignuped();
    }
}

const mapStateToProp = state => ({
    loggedIn: state.login.loggedIn,
    errorOccured: state.login.errorOccured,
    userId: state.login.userId,
    userRole: state.login.userRole
})

export default connect(mapStateToProp, { login })(Login);