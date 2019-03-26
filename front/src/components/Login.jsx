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
        if (this.props.loggedIn) this.props.history.push("/determinant");
    }

    render() {
        return (
            <Container>
                <Form onSubmit = {this.login}>
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
                    
                    <Form.Group as={Row}>
                        <Col sm = {{span: 4, offset: 4}}>
                            <Button type="submit" 
                                    variant = "dark" 
                                    block
                            >
                                Log in
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
                
                <Row>
                    <Col sm = {{offset:4}}>
                        <Link to="/signup" className="text-decoration-none text-reset">Create an account?</Link>
                    </Col>
                
                </Row>
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