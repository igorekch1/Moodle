import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch_topics } from "../actions/topicAction";
import { fetch_tests, set_current_test } from "../actions/testAction";
import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Header from "./Header";
import BurgerMenu from "./BurgerMenu";

const marked = require('marked');

class TopicPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }

        this.startTest = this.startTest.bind(this);
    }

    componentDidMount() {
        this.setState({
            content: this.props.currentTopic.content
        })

        this.props.fetch_tests(this.props.currentTopic.id);
    }

    render() {
        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>

                <BurgerMenu menuItems = {this.props.topics}>
                    <Row noGutters className="page-title">
                        <h3 style={{color:"#ca1111"}}>{this.props.currentTopic.name}</h3>
                        <Link to="/courses">
                            <h4><i className="fas fa-arrow-circle-left"></i> Back to courses</h4>
                        </Link>
                    </Row>
                    <Row noGutters>
                        <Col xs = {9} style={{padding: '20px'}} dangerouslySetInnerHTML={{__html: marked(this.props.currentTopic.content)}} className = "topic-content"/>
                        <Col xs={2} style={{margin:'0 auto'}}>
                            <div style={{textAlign: 'center'}}>Tests</div>
                            <ListGroup>
                                {this.props.tests.map(test => {
                                    return  <ListGroup.Item action 
                                                            variant="dark"
                                                            key = {test.id}
                                                            data-test = {JSON.stringify(test)} 
                                                            style={{textAlign:'right', cursor:'pointer'}}
                                                            onClick = {this.startTest}
                                            >
                                                {test.name}
                                            </ListGroup.Item>
                                })}
                            </ListGroup>
                        </Col>
                    </Row>
                </BurgerMenu>
            </Container>
        )
    }

    startTest(e) {
        let test = JSON.parse(e.target.getAttribute("data-test"));
        this.props.set_current_test(test);
        this.props.history.push("/testpage");
    }
}

const mapStateToProps = state => ({
    topics: state.topic.allTopics,
    userName: state.login.userName,
    currentTopic: state.topic.currentTopic,
    courseId: state.course.courseId,
    tests: state.test.allTests,
    currentTest: state.test.currentTest
})


export default connect(mapStateToProps, { fetch_topics, fetch_tests, set_current_test })(TopicPage);