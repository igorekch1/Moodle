import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";

const marked = require('marked');

class TopicPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: ''
        }
    }

    componentDidMount() {
        console.log(this.props.currentTopic)
        this.setState({
            content: this.props.currentTopic.content
        })
    }

    render() {
        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>

                <Row noGutters className="d-flex justify-content-between mt-3 pl-4 pr-4" style={{padding:'0 40px'}}>
                    <Link to="/courses">
                        <h4><i className="fas fa-arrow-circle-left"></i> Back to topics</h4>
                    </Link>
                    <h3 style={{color:"#ca1111"}}>{this.props.currentTopic.name}</h3>
                </Row>

                <div dangerouslySetInnerHTML={{__html: marked(this.state.content)}} style = {{border: '1px solid #777'}}/>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    userName: state.login.userName,
    currentTopic: state.topic.currentTopic
})

export default connect(mapStateToProps, {})(TopicPage);