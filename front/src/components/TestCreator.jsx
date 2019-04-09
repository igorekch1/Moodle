import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_tests, create_test, delete_test, set_current_test } from "../actions/testAction";
import { Link } from 'react-router-dom';
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, Form, Card } from "react-bootstrap";
import ModalInput from "./ModalInput";
import Header from "./Header";

class TestCreator extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            testName: '',
            testDescription: '',
            testTime: null
        }

        this.createTest = this.createTest.bind(this);
        this.goToTestEditor = this.goToTestEditor.bind(this);
    }

    componentDidMount() {
        this.props.fetch_tests(this.props.currentTopic.id);
    }

    componentWillReceiveProps(nextProps) {
        if (Object.entries(nextProps.newTest).length !== 0) {
            this.props.tests.unshift(nextProps.newTest);
        }
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });
        
        return (
            <Container fluid className="Container">
                <Header user = {this.props.userName}/>
                <Row className="mt-4">
                    <Col xs={2} className="ml-4">
                        <Link to="/editor">
                            <h4><i className="fas fa-arrow-circle-left"></i> Back to topic</h4>
                        </Link>
                    </Col>
                    <Col md={{span: 2, offset: 3}}>
                        <ButtonToolbar>
                            <Button variant="outline-dark" 
                                    block
                                    onClick = {() => {
                                        this.setState({modalShow: true});
                                    }}
                                    > 
                                Create test
                            </Button>

                            <ModalInput 
                                show={this.state.modalShow}
                                onHide={modalClose}
                                onSave = {this.createTest}
                                modalTitle = "New test" 
                                >   
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="far fa-file-alt"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        aria-describedby = "course-icon"
                                        placeholder = "Enter name..."
                                        onChange = {this.handleTestName}
                                        />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="far fa-file-alt"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        aria-describedby = "course-icon"
                                        placeholder = "Enter description..."
                                        onChange = {this.handleTestDescription}
                                        />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-sort-numeric-down"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control as="select"
                                        aria-describedby = "course-icon"
                                        placeholder = "Enter ..."
                                        onChange = {this.handleTestTime}
                                        >
                                        <option>5</option>
                                        <option>10</option>
                                        <option>15</option>
                                        <option>20</option>
                                        <option>25</option>
                                        <option>30</option>
                                    </Form.Control>
                                </InputGroup>
                            </ModalInput> 
                        </ButtonToolbar>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-3" noGutters>
                    {this.props.tests.map((test) => {
                        return  <Card bg="secondary" 
                                      text="white" 
                                      className="text-center mt-4" 
                                      key={test.id} 
                                      style={{width: '60%'}}
                                >
                                    <Card.Header>Test</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{test.name}</Card.Title>
                                        <Card.Text>
                                            {test.description}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="light" 
                                                className="mr-2" 
                                                style={{width:'100px'}}
                                                data-test = {JSON.stringify(test)}
                                                onClick = {this.goToTestEditor}
                                        >
                                            View
                                        </Button>
                                        <Button variant="dark" 
                                                className="ml-2" 
                                                style={{width:'100px'}}
                                                onClick = {()=> this.props.delete_test(test.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Card.Footer>
                                </Card>
                    })}
                </Row>
            </Container>
        )
    }

    handleTestName = e => this.setState({testName: e.target.value});

    handleTestDescription = e => this.setState({testDescription: e.target.value});

    handleTestTime = e => this.setState({testTime: e.target.value});

    createTest(){
        this.props.create_test(this.state.testName, this.state.testDescription, this.state.testTime, this.props.currentTopic.id);
    }

    goToTestEditor(e) {
        let curTest = e.target.getAttribute("data-test");
        this.props.set_current_test(JSON.parse(curTest));
        this.props.history.push("/testeditor")
    }
}

const mapStateToProps = state => ({
    tests: state.test.allTests,
    newTest: state.test.testItem,
    currentTest: state.test.currentTest,
    currentTopic: state.topic.currentTopic,
    userName: state.login.userName
});

export default connect(mapStateToProps, { fetch_tests, create_test, delete_test, set_current_test })(TestCreator);