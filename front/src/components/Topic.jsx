import React, { Component } from 'react'
import { connect } from "react-redux";
import { fetch_topics, set_current_topic } from "../actions/topicAction";
import { Link } from "react-router-dom";

class Topic extends Component {
    constructor(props){
        super(props)

        this.setTopic = this.setTopic.bind(this);
    }

    componentDidMount() {
        this.props.fetch_topics(this.props.idCourse);
        console.log(this.props.userRole)
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
                                          onClick={this.setTopic}
                                    >
                                        {topic.name}
                                    </Link>
                                </li>
                            </div>
                })}
            </div>
        )
    }

    setTopic(e) {
        let current_topic = e.target.getAttribute("data-id");
        this.props.set_current_topic(JSON.parse(current_topic));   
    }
}

const mapStateToProps = state => ({
    topics: state.topic.allTopics,
    currentTopic: state.topic.currentTopic,
    courseId: state.course.courseId,
    userRole: state.login.userRole
});

export default connect(mapStateToProps, { fetch_topics, set_current_topic })(Topic);