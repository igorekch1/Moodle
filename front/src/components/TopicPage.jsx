import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_topics } from "../actions/topicAction";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import BurgerMenu from "./BurgerMenu";

const marked = require('marked');

class TopicPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        this.setState({
            content: this.props.currentTopic.content
        })
    }

    render() {
        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>
                
                {/* <Row noGutters className="d-flex justify-content-between mt-3 pl-4 pr-4" style={{padding:'0 40px'}}>
                    <Link to="/courses">
                        <h4><i className="fas fa-arrow-circle-left"></i> Back to courses</h4>
                    </Link>
                    <h3 style={{color:"#ca1111"}}>{this.props.currentTopic.name}</h3>
                </Row> */}

                <BurgerMenu menuItems = {this.props.topics}>
                    <div dangerouslySetInnerHTML={{__html: marked(this.state.content)}} className = "topic-content"/>
                </BurgerMenu>

            </Container>
        )
    }
}

const mapStateToProps = state => ({
    topics: state.topic.allTopics,
    userName: state.login.userName,
    currentTopic: state.topic.currentTopic,
    courseId: state.course.courseId
})


export default connect(mapStateToProps, { fetch_topics })(TopicPage);