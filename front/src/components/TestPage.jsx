import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch_questions, send_answers, reset_test_result } from "../actions/testAction";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "./Header";
import CustomAlert from "./CustomAlert";

const INITIAL_STATE = {
    answers: []
}

class TestPage extends Component {
    constructor(props) {
        super(props)

        this.state = INITIAL_STATE;

        this.sendAnswers = this.sendAnswers.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
    }

    componentDidMount() {
        console.log(this.props.currentTest.id)
        // this.props.reset_test_result();
        this.props.fetch_questions(this.props.currentTest.id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.testResult) {
            console.log("res - ",nextProps.testResult)
        }
    }

    render() {
        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>

                <Row className="mt-4" noGutters>
                    <Col xs={{span: "2", offset: '1'}}>
                        <Link to="/topic">
                            <h4><i className="fas fa-arrow-circle-left"></i> Back to topic editor</h4>
                        </Link>
                    </Col>
                    <Col xs={{span: "2", offset: '2'}}>
                        <Button variant="success" block>
                            <Link to = "/testresult"
                                className="myLink"
                                >
                                View last result
                            </Link>
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3" noGutters>
                    {this.props.questions.map(q => {
                        return  <Card style={{width: '60%'}} className="mt-3" key={q.id}>
                                    <Card.Body>
                                        <Card.Title>{q.questionText}</Card.Title>
                                        <Card.Text>
                                            <form onChange = {this.setAnswer}>
                                                <fieldset id={`group_${q.id}`}>
                                                    {JSON.parse(q.answers).map(answer => {
                                                        return <div>
                                                                <input type="radio" id={q.id} value={answer} name={`group_${q.id}`}/> {answer}
                                                            </div>
                                                    })}
                                                </fieldset>
                                            </form>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                    })}
                </Row>
                <Row className="mt-4 mb-4" noGutters>
                    <Col xs={{span: "2", offset: "5"}}>
                        <Button variant="dark"
                                block
                                onClick = {this.sendAnswers}    
                                >
                            Send
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }

    setAnswer(e) {
        let answer = {
            id: e.target.id,
            chosenAnswer: e.target.value
        }

        INITIAL_STATE.answers.push(answer)
    }

    sendAnswers(e) {
        this.setState({
            ...INITIAL_STATE
        })
        // SEND ANSWERS
        console.log(this.state.answers)
        this.props.send_answers(this.state.answers)
        this.props.history.push("/testresult")
    }
}

const mapStateToProps = state => ({
    questions: state.test.allQuestions,
    currentTest: state.test.currentTest,
    userName: state.login.userName,
    testResult: state.test.testResult
})

export default connect(mapStateToProps, {fetch_questions, send_answers, reset_test_result})(TestPage);