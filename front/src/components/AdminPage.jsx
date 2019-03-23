import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_courses, create_course, reset_current_courseid } from "../actions/courseAction";
import { reset_current_topic } from "../actions/topicAction";
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, FormControl, CardColumns, Card } from "react-bootstrap";
import ModalInput from "./ModalInput";
import Header from "./Header";
import Topic from "./Topic";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            modalShow: false,
            course_name: '',
            course_description: ''
        };

        this.createNewCourse = this.createNewCourse.bind(this);
        this.goToTopicEditor = this.goToTopicEditor.bind(this);
        this.handleCourseName = this.handleCourseName.bind(this);
        this.handleCourseDescription = this.handleCourseDescription.bind(this);
    }

    componentDidMount() {
        this.props.fetch_courses();
        // this.intervalIdCourse = setInterval(this.props.fetch_courses, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalIdCourse);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newCourse) {
            this.props.courses.unshift(nextProps.newCourse);
        }
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        return (
            <Container fluid className="Container">  
                <Header user = {this.props.userName}/>
     
                <Row className="justify-content-md-center">
                    <Col xs="2">
                        <ButtonToolbar>
                            <Button variant="outline-dark"
                                    className="Btn-create-topic"
                                    onClick = {() => this.setState({modalShow: true})}        
                            >
                                Create new course
                            </Button>
                            <ModalInput 
                                show={this.state.modalShow}
                                onHide={modalClose}
                                onSave = {this.createNewCourse}
                                modalTitle = "New course"
                            >   
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fab fa-leanpub"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Enter name..."
                                        aria-describedby="course-icon"
                                        onChange = {this.handleCourseName}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-info"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Enter description..."
                                        onChange = {this.handleCourseDescription}
                                    />
                                </InputGroup>
                            </ModalInput> 
                        </ButtonToolbar>  
                    </Col>  
                </Row>
                <CardColumns className="Topic-cards">
                    {/* getting all courses */}
                    { this.props.courses.map((course) => {
                        return <Card key={course.id} bg="dark" text="white" className="Topic-card-item">
                                    <Card.Img variant="top" src="./assets/js.png" alt="Card image"/>
                                    <Card.Header><h3>{course.name}</h3></Card.Header>
                                    <Card.Body>
                                    <Card.Text style={{color:"#e9e9e9"}}>
                                        {course.description}
                                    </Card.Text>
                                    <Card.Title>
                                        {/* getting topics by course id */}
                                        <Topic idCourse = {course.id}/>
                                        <div className="mt-3">
                                            <i className="fa fa-plus" aria-hidden="true" style={{color:'#00ff00', marginRight: '5px'}}></i> 
                                            <span className="Create-topic-link"
                                                onClick={this.goToTopicEditor}   
                                            >   Create new topic
                                            </span>
                                        </div>
                                            
                                    </Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated {Math.round((new Date() - Date.parse(course.updatedAt))/(1000*60)%60)} mins ago.</small>
                                    </Card.Footer>
                                </Card>
                    })} 
                </CardColumns>    
                    
            </Container>
        )
    }
    
    handleCourseName(e) {
        this.setState({
            course_name: e.target.value
        })
    }

    handleCourseDescription(e) {
        this.setState({
            course_description: e.target.value
        })
    }

    createNewCourse(){
        this.props.create_course(this.state.course_name, this.state.course_description);
    }

    // reset current topic when link on creating new topic
    goToTopicEditor(e){
        this.props.reset_current_topic();
        this.props.reset_current_courseid();
        console.log(this.props.currentTopic, " ", this.props.idCourse)
        // console.log(e.target.getAttribute("data-id"))
        this.props.history.push("/editor")
        // e.stopPropagation()
    }
}

AdminPage.defaultProps = {
    userName: 'default_user'
};

const mapStateToProps = state => ({
    courses: state.course.allCourses,
    newCourse: state.course.courseItem,
    idCourse: state.course.courseId,
    currentTopic: state.topic.currentTopic,
    // userId: state.login.userId,
    userName: state.login.userName
})

export default connect(mapStateToProps, { fetch_courses, create_course, reset_current_topic, reset_current_courseid })(AdminPage);