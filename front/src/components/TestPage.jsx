import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch_questions, send_answers } from "../actions/testAction";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Header from "./Header";

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
        this.props.fetch_questions(this.props.currentTest.id);
    }

    render() {
        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>
                <Row className="justify-content-center mt-5" noGutters>
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
                <Row className="mt-4">
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
    }
}

const mapStateToProps = state => ({
    questions: state.test.allQuestions,
    currentTest: state.test.currentTest,
    userName: state.login.userName,
    testResult: state.test.testResult
})

export default connect(mapStateToProps, {fetch_questions, send_answers})(TestPage);