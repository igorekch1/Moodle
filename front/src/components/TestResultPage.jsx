import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { reset_test_result } from "../actions/testAction";
import Header from "./Header";
import {Link} from "react-router-dom";
// import CustomAlert from "./CustomAlert";

class TestResultPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            show: true
        };
    }

    componentDidMount() {
    }

    render() {

        const handleHide = () => this.setState({ show: false });
        const handleShow = () => this.setState({ show: true });

        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>
                <Row className="justify-content-center mt-5" noGutters>
                    <Col xs={6}>    
                        <Alert show={this.props.show} variant="info">
                            <Alert.Heading>Test result</Alert.Heading>
                            <p style={{fontSize: "20px"}}>
                                Correct answers: {this.props.testResult.correctAnswers} / {this.props.testResult.qAnswers}
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <Button variant="dark">
                                <Link to="/testpage"
                                      className="myLink"
                                >
                                    Got it!
                                </Link>
                            </Button>
                            </div>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        )
    }

}

const mapStateToProps = state => ({
    questions: state.test.allQuestions,
    currentTest: state.test.currentTest,
    userName: state.login.userName,
    testResult: state.test.testResult
})

export default connect(mapStateToProps, {reset_test_result})(TestResultPage);