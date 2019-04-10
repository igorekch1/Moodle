import React, { Component } from 'react'
import { connect } from 'react-redux';
import { update_test, create_question, fetch_questions } from "../actions/testAction";
import {Link} from "react-router-dom";
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, FormControl, Form, Table } from "react-bootstrap";
import ModalInput from "./ModalInput";
import Header from "./Header";

class TestEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            testName: '',
            testDescription: '',
            questionText: '',
            answers: ''
        }

        this.createNewQuestion = this.createNewQuestion.bind(this);
    }

    componentDidMount() {
        this.setState({
            testName: this.props.currentTest.name,
            testDescription: this.props.currentTest.description
        })

        this.props.fetch_questions(this.props.currentTest.id);
    }

    componentWillReceiveProps(nextProps) {
        if (Object.entries(nextProps.newQuestion).length !== 0) {
            this.props.questions.unshift(nextProps.newQuestion);
        }
    }
    
    render() {
        
        let modalClose = () => this.setState({ modalShow: false });
        
        return (
            <Container fluid className="Container">

                <Header user = {this.props.userName}/>
                
                <Row noGutters className="d-flex justify-content-between mt-3 pl-5">
                    <Col xs={2}>
                        <Link to="/testcreator">
                            <h4><i className="fas fa-arrow-circle-left"></i> Back to tests</h4>
                        </Link>
                    </Col>

                    <Col xs={5}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Test name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value = {this.state.testName}
                                onChange = {this.handleTestName}
                                />
                            <InputGroup.Append>
                                <Button variant="outline-secondary"
                                        onClick = {() => {this.props.update_test(this.props.currentTest.id, this.state.testName)}}
                                        >
                                    Edit
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>

                    <Col xs={2}>
                    <ButtonToolbar>
                            <Button variant="success"
                                    onClick = {() => {
                                        this.setState({modalShow: true});
                                    }
                                    }        
                            >
                                Create question
                            </Button>
                            <ModalInput 
                                show={this.state.modalShow}
                                onHide={modalClose}
                                onSave = {this.createNewQuestion}
                                modalTitle = "New question" 
                                >   
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-question"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        aria-describedby = "course-icon"
                                        placeholder = "Enter text..."
                                        onChange = {this.handleQuestionText}
                                        />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Enter answers..."
                                        onChange = {this.handleAnswers}
                                        />
                                </InputGroup>
                            </ModalInput> 
                        </ButtonToolbar>  
                    </Col>
                </Row>

                <Row className="justify-content-center mt-4">
                    <Col xs={8}>
                        {this.props.questions.length !== 0 ? (
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answers</th>
                                        <th>Right answer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.questions.map(q => {
                                        return <tr key={q.id}>
                                                    <td>{q.questionText}</td>
                                                    <td>{JSON.parse(q.answers).join(", ")}</td>
                                                    <td>{q.rightAnswer}</td>
                                                </tr>
                                    })}
                                </tbody>
                            </Table>
                        ) : <div></div> }
                    </Col>
                </Row>
            </Container>
        )
    }

    handleTestName = e => this.setState({testName: e.target.value});
    
    handleQuestionText = e => this.setState({questionText: e.target.value});
    
    handleAnswers = e => this.setState({answers: e.target.value});
    
    createNewQuestion() {
        console.log(this.props.currentTest)
        console.log(this.state)
        this.props.create_question(this.state.questionText, this.state.answers, this.props.currentTest.id)
    }
}   

const mapStateToProps = state => ({
    currentTest: state.test.currentTest,
    userName: state.login.userName,
    questions: state.test.allQuestions,
    newQuestion: state.test.questionItem
});

export default connect(mapStateToProps, { update_test, create_question, fetch_questions })(TestEditor);