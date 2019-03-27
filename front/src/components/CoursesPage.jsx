import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_courses } from "../actions/courseAction";
import { Container, Row, Col, ButtonToolbar, Button, InputGroup, FormControl, CardColumns, Card } from "react-bootstrap";
import Header from "./Header";
import Topic from "./Topic";

class CoursePage extends Component {
    constructor(props) {
        super(props);
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

        return (
            <Container fluid className="Container">  
                <Header user = {this.props.userName}/>
     
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
                                        <Topic idCourse = {course.id}
                                        />  
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
}


const mapStateToProps = state => ({
    courses: state.course.allCourses,
    newCourse: state.course.courseItem,
    courseId: state.course.courseId,
    currentTopic: state.topic.currentTopic,
    userId: state.login.userId,
    userName: state.login.userName
})

export default connect(mapStateToProps, { fetch_courses })(CoursePage);