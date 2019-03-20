import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_courses, create_course } from "../actions/courseAction";
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, FormControl, CardColumns, Card } from "react-bootstrap";
import ModalInput from "./ModalInput";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            modalShow: false,
            course_name: ''
        };

        this.createNewCourse = this.createNewCourse.bind(this);
        this.handleCourseName = this.handleCourseName.bind(this);
    }

    componentDidMount() {
        this.props.fetch_courses();
        this.intervalId = setInterval(this.props.fetch_courses, 2000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newCourse) {
            this.props.courses.unshift(nextProps.newCourse);
        }
    }

    render() {

        let modalClose = () => this.setState({ modalShow: false });

        return (
            <Container> 
                <Row>
                    <Col>
                        Hellow, {this.props.userName}!
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col xs="2">
                        <ButtonToolbar>
                            <Button variant="outline-dark"
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
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><i className="fab fa-leanpub"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Enter here..."
                                        aria-label="Course"
                                        aria-describedby="basic-addon1"
                                        onChange = {this.handleCourseName}
                                    />
                                </InputGroup>
                            </ModalInput> 
                        </ButtonToolbar>  
                    </Col>  
                </Row>
                <CardColumns>
                    { this.props.courses.map((course) => {
                        return <Card key = {course.id} bg="dark" text="white">
                                    <Card.Img variant="top" src="./assets/js.png" alt="Card image"/>
                                    <Card.Body>
                                    <Card.Title>{course.name}</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional
                                        content.
                                    </Card.Text>
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

    createNewCourse(){
        this.props.create_course(this.state.course_name);
    }
}

AdminPage.defaultProps = {
    userName: 'default_user'
};

const mapStateToProps = state => ({
    courses: state.course.allCourses,
    newCourse: state.course.courseItem,
    // userId: state.login.userId,
    userName: state.login.userName
})

export default connect(mapStateToProps, { fetch_courses, create_course })(AdminPage);