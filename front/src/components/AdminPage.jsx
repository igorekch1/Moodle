import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_courses, 
            create_course, 
            update_course,
            reset_current_courseid, 
            set_current_courseId,
            delete_course,
            set_current_course,
            reset_current_course
        } from "../actions/courseAction";
import { reset_current_topic } from "../actions/topicAction";
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, Form, FormControl, CardColumns, Card } from "react-bootstrap";
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

        this.inputName = React.createRef();
        this.inputDescription = React.createRef();

        this.createNewCourse = this.createNewCourse.bind(this);
        this.goToTopicEditor = this.goToTopicEditor.bind(this);
        this.handleCourseName = this.handleCourseName.bind(this);
        this.handleCourseDescription = this.handleCourseDescription.bind(this);
        this.editCourseName = this.editCourseName.bind(this);
        this.editDescription = this.editDescription.bind(this);
    }

    componentDidMount() {
        this.props.fetch_courses();
        // this.intervalIdCourse = setInterval(this.props.fetch_courses, 3000);
    }
    
    componentWillUnmount() {
        clearInterval(this.intervalIdCourse);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.currentCourse)
        // if (nextProps.currentCourse) return;
        if (Object.entries(nextProps.newCourse).length !== 0) {
            this.props.courses.unshift(nextProps.newCourse);
        }
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        return (
            <Container fluid className="Container">  

                <Header user = {this.props.userName}/>
     
                <Row className="justify-content-md-center" noGutters>
                    <Col xs="2">
                        <ButtonToolbar>
                            <Button variant="outline-dark"
                                    className="Btn-create-topic"
                                    onClick = {() => {
                                            this.setState({modalShow: true});
                                            this.props.reset_current_course()
                                        }
                                    }        
                            >
                                Create new course
                            </Button>
                            <ModalInput 
                                show={this.state.modalShow}
                                onHide={modalClose}
                                onSave = {this.createNewCourse}
                                modalTitle = {Object.entries(this.props.currentCourse).length !== 0 ? "Edit course" : "New course"} 
                            >   
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fab fa-leanpub"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        aria-describedby = "course-icon"
                                        value = {this.state.course_name}
                                        placeholder = "Enter name..."
                                        ref = {this.inputName}
                                        onChange = {this.handleCourseName}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><i className="fas fa-info"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        as="textarea"
                                        aria-label="With textarea"
                                        value = {this.state.course_description}
                                        placeholder="Enter description..."
                                        ref = {this.inputDescription}
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
                                    <Card.Header className = "d-flex justify-content-between">
                                    <InputGroup>
                                        <FormControl
                                            aria-label="Course name"
                                            aria-describedby="basic-addon2"
                                            placeholder = {course.name}
                                            onChange = {this.handleCourseName}
                                        />
                                        <InputGroup.Append>
                                            <Button 
                                                variant="outline-light"
                                                data-course = {JSON.stringify(course)}    
                                                onClick = {this.editCourseName}     
                                            > Edit 
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text style={{color:"#e9e9e9"}}>
                                            <InputGroup>
                                                <FormControl as="textarea" 
                                                            aria-label="With textarea"
                                                            placeholder = {course.description} 
                                                            onChange = {this.handleCourseDescription}
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text>
                                                        <Button 
                                                            variant="outline-dark"
                                                            data-course = {JSON.stringify(course)}
                                                            onClick = {this.editDescription}
                                                        > Edit
                                                        </Button>
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Card.Text>
                                        <Card.Title>
                                            {/* getting topics by course id */}
                                            <Topic idCourse = {course.id}/>
                                            <div className="mt-3 create-topic-link">
                                                <i className="fa fa-plus" aria-hidden="true" style={{color:'#00ff77', marginRight: '10px'}}></i> 
                                                <span className="create-topic-link-text"
                                                    data-id = {course.id}
                                                    onClick={this.goToTopicEditor}   
                                                >
                                                    Create new topic
                                                </span>
                                            </div>
                                            <div className="mt-3 delete-course-btn">
                                                <i className="fa fa-times" aria-hidden="true" style={{color:'#ff3300', marginRight: '10px'}}></i>
                                                <span className="delete-course-text"
                                                    onClick={() => this.props.delete_course(course.id)}
                                                >
                                                    Delete this course
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

    goToTopicEditor(e){
        let course_id = e.target.getAttribute("data-id");
        this.props.set_current_courseId(course_id);
        this.props.reset_current_topic();
        this.props.history.push("/editor");
    }

    editCourseName(e) {
        e.preventDefault();
        let currentCourse = JSON.parse(e.target.getAttribute("data-course"));
        let course = {
            id: currentCourse.id,
            name: this.state.course_name,
            description: ''
        }
        this.props.update_course(course);
    }

    editDescription(e) {
        e.preventDefault();
        let currentCourse = JSON.parse(e.target.getAttribute("data-course"));
        let course = {
            id: currentCourse.id,
            name: '',
            description: this.state.course_description
        }
        this.props.update_course(course);
    }
}

AdminPage.defaultProps = {
    userName: 'default_user'
};

const mapStateToProps = state => ({
    courses: state.course.allCourses,
    courseItem: state.course.courseItem,
    newCourse: state.course.courseItem,
    courseId: state.course.courseId,
    currentCourse: state.course.currentCourse,
    currentTopic: state.topic.currentTopic,
    userId: state.login.userId,
    userName: state.login.userName
});

export default connect(mapStateToProps, { 
    fetch_courses, 
    create_course, 
    reset_current_topic, 
    reset_current_courseid, 
    set_current_courseId, 
    delete_course,
    set_current_course,
    reset_current_course,
    update_course
})(AdminPage);