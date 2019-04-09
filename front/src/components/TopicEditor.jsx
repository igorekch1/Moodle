import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetch_topics, create_topic, delete_topic } from "../actions/topicAction";
import { Link } from 'react-router-dom';
import {Container, Button, Row, Col, Form, ButtonToolbar, InputGroup} from "react-bootstrap";

const initialMarkdown = `

### Headers

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

### List

- list item one
- list item two
- list item three

### Links

[FreeCodeCamp](https://learn.freecodecamp.org)

[Google](https://www.google.com "World's Most Popular Search Engine")

### Text Decorations

*italic*

**bold**

***bold and italic***

### Blockquote

> To be, or not to be. That is a stupid question.

### Code
`

const marked = require('marked');

var renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
  return `<a href=${href} target="_blank">${text}</a>`
}

marked.setOptions({
  renderer,
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value
  },
  breaks: true
})

class TopicEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            markdown: '',
            topicName: ''
        }

        this.sendEditText = this.sendEditText.bind(this);
        this.deleteCurTopic = this.deleteCurTopic.bind(this);
    }

    componentDidMount() {
        this.setState({
            markdown: `${this.props.currentTopic ? this.props.currentTopic.content: ''}`,
            topicName: this.props.currentTopic ? this.props.currentTopic.name : ''
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newTopic) {
            this.props.topics.push(nextProps.newTopic);
        }
        this.props.history.push("/admin");
    }
    
    
    render() {

        return (
            <Container fluid className="Editor-page-container">

                <Row className="d-flex justify-content-between mt-3 pl-4 pr-4">
                    <Link to="/admin">
                        <h4><i className="fas fa-arrow-circle-left"></i> Back to topics</h4>
                    </Link>
                    {this.props.currentTopic && this.props.currentTopic.name ? 
                        <h3>Topic <span style={{color:"#ca1111"}}>"{this.props.currentTopic ? this.props.currentTopic.name: ''}"</span> is now being edited... </h3>
                    : <h3 style={{color:"#ca1111"}}>{this.state.topicName}</h3> }
                </Row>

                <Row className="mt-4">
                    <Col xs={6}>
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextTopic">    
                                <Form.Label column sm="2">
                                    Topic name
                                </Form.Label>
                                <Col xs={10} style={{marginLeft:"-24px"}}>
                                    <Form.Control type="text" 
                                                    placeholder="Enter here..."
                                                    value = {this.state.topicName} 
                                                    onChange = {this.handleTopic}              
                                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={{ span: 2, offset: 4 }} style={{fontSize: '20px'}}>
                        <Link to='/testcreator'>View tests</Link>
                    </Col>
                </Row>

                <div className="editor-container">
                    <div className="editor-left">
                        <textarea id='editor' value={this.state.markdown} onChange={this.handleEditor}/>
                    </div>
                    <div className="preview-right">
                        <div id='preview' 
                             dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}} 
                             ref= {this.editedText}     
                        />
                    </div>
                </div>

                <Row>
                    <Col  xs={{span:2, offset: 8}}>
                        <Button variant="danger"
                                block
                                onClick = {this.deleteCurTopic}    
                        >
                            Delete this topic
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="success" 
                                block
                                onClick = {this.sendEditText}
                                >
                            Save
                        </Button>
                    </Col>
                </Row>

            </Container>
        )
    }
    
    handleEditor = e => this.setState({ markdown: e.target.value });

    handleTopic = e => this.setState({ topicName: e.target.value });

    deleteCurTopic(e) {
        e.preventDefault();
        this.props.delete_topic(this.props.currentTopic.id);
    }

    sendEditText(e) {
        e.preventDefault();
        this.props.create_topic(this.state.topicName, this.state.markdown, this.props.courseId, this.props.currentTopic);
    }
}

const mapStateToProps = state => ({
    topics: state.topic.allTopics,
    newTopic: state.topic.topicItem,
    topicId: state.topic.currentId,
    currentTopic: state.topic.currentTopic,
    courseId: state.course.courseId
})

export default connect(mapStateToProps, { create_topic, delete_topic })(TopicEditor);