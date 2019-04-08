import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_tests } from "../actions/testAction";
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, Form, FormControl, CardColumns, Card } from "react-bootstrap";
import ModalInput from "./ModalInput";
import Header from "./Header";

class TestEditor extends Component {
    constructor(props) {
        super(props);
        
        this.state = {

        }
    }

    componentDidMount() {
        this.props.fetch_tests(this.props.currentTopic.id)
    }

    render() {
        return (
            <Container fluid className="Container">
                <Header user = {this.props.userName}/>

                <Row className="justify-content-md-center" noGutters>
                    {this.props.tests.map((test) => {
                        return <div key = {test.id}>{test.name}</div>
                    })}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    tests: state.test.allTests,
    newTest: state.test.testItem,
    currentTopic: state.topic.currentTopic,
    userName: state.login.userName
});

export default connect(mapStateToProps, { fetch_tests })(TestEditor);