import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetch_courses } from "../actions/courseAction";

class AdminPage extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetch_courses();
    }
    
    render() {

        return (
            <div>
                <div>Hellow, {this.props.userName}!</div>
                <div>   
                    { this.props.courses.map((course) => {
                        return  <li key = {course.id}>{course.name}</li>
                    })}
                </div>
            </div>
        )
    }
}

AdminPage.defaultProps = {
    userName: 'default_user'
};

const mapStateToProps = state => ({
    courses: state.course.allCourses
    // userId: state.login.userId,
    // userName: state.login.userName
})

export default connect(mapStateToProps, { fetch_courses })(AdminPage);