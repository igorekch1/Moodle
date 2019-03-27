import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetch_topics, set_current_topic } from "../actions/topicAction";
import { set_current_courseId } from "../actions/courseAction";
import { Link } from "react-router-dom";

class Topic extends Component {
    constructor(props){
        super(props)

        this.setTopicAndCourse = this.setTopicAndCourse.bind(this);
    }

    componentDidMount() {
        this.props.fetch_topics(this.props.idCourse);
        // this.intervalIdTopic = setInterval(this.props.fetch_topics.bind(this, this.props.idCourse), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalIdTopic);
    }

    render() {
        return (
            <div>
                {this.props.topics.map((topic) => {
                    let self = topic;
                    return <div key = {topic.id}>
                                <li>
                                    <Link to = {this.props.userRole === "admin" ? "/editor" : "/topic"}
                                          data-id={JSON.stringify(self)} 
                                          onClick={this.setTopicAndCourse}
                                    >
                                        {topic.name}
                                    </Link>
                                </li>
                            </div>
                })}
            </div>
        )
    }

    setTopicAndCourse(e) {
        let current_topic = e.target.getAttribute("data-id");
        this.props.set_current_topic(JSON.parse(current_topic));
        this.props.set_current_courseId(this.props.idCourse);   
    }
}

const mapStateToProps = state => ({
    topics: state.topic.allTopics,
    currentTopic: state.topic.currentTopic,
    courseId: state.course.courseId,
    userRole: state.login.userRole
});

export default connect(mapStateToProps, { fetch_topics, set_current_topic, set_current_courseId })(Topic);