import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signup } from '../actions/loginAction';


class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: ''
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
        return (
            <Container>
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
                    
                    <Form.Group as={Row}>
                        <Col sm = {{span: 4, offset: 4}}>
                            <Button type = "submit"
                                    variant = "dark" 
                                    block>
                                Sign up
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

    regit(e) {
        e.preventDefault();
        this.inputLogin.current.value = '';
        this.inputPassword.current.value = '';
        this.props.signup(this.state.login, this.state.password);
        this.checkIfSignuped();
        // this.props.history.push("/test");
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