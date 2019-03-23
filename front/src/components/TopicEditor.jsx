import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetch_topics, create_topic } from "../actions/topicAction";
import { Link } from 'react-router-dom';
import {Container, Button, Row, Col, Form} from "react-bootstrap";

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
            markdown: '',
            topicName: ''
        }

        this.sendEditText = this.sendEditText.bind(this);
    }

        // componentWillMount() {
        //     this.setState({
        //         markdown: this.props.currentTopic.content
        //     })
        // }

    componentDidMount() {
        console.log(this.props.currentTopic)
        this.setState({
            markdown: `${this.props.currentTopic.content}`
        })
    }

    
    render() {
        return (
            <Container fluid className="Editor-page-container">
                <Row className="d-flex justify-content-between mt-3 pl-4 pr-4">
                    <Link to="/admin">
                        <h4><i className="fas fa-arrow-circle-left"></i> Back to topics</h4>
                    </Link>
                    <h3>Topic <span style={{color:"#ca1111"}}>"{this.props.currentTopic.name}"</span> is now being edited... </h3>
                </Row>
                <Form className="mt-4">
                    <Form.Group as={Row} controlId="formPlaintextTopic">    
                        <Form.Label column sm="1">
                            Topic name
                        </Form.Label>
                        <Col sm="5" style={{marginLeft:"-24px"}}>
                            <Form.Control type="text" 
                                            placeholder="Enter here..." 
                                            onChange = {this.handleTopic}              
                            />
                        </Col>
                    </Form.Group>
                </Form>
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
                    <Col xs={{span:2, offset: 10}}>
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
    
    handleEditor = e => this.setState({ markdown: e.target.value })

    handleTopic = e => this.setState({ topicName: e.target.value })

    sendEditText(e) {
        e.preventDefault();
        console.log(this.state.markdown)
        console.log(this.state.topicName)
    }
}

const mapStateToProps = state => ({
    topicId: state.topic.currentId,
    currentTopic: state.topic.currentTopic
})


// export default TopicEditor;
export default connect(mapStateToProps, {})(TopicEditor);