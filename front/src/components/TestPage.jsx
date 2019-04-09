import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch_questions } from "../actions/testAction";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import Header from "./Header";

class TestPage extends Component {
    constructor(props) {
        super(props)
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
                                            <form>
                                                <fieldset id={`group_${q.id}`}>
                                                    {JSON.parse(q.answers).map(answer => {
                                                        return <div>
                                                                <input type="radio" value={answer} name={`group_${q.id}`}/> {answer}
                                                            </div>
                                                    })}
                                                </fieldset>
                                            </form>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                    })}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    questions: state.test.allQuestions,
    currentTest: state.test.currentTest
})

export default connect(mapStateToProps, {fetch_questions})(TestPage);