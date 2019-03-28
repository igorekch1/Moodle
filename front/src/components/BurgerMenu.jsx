import React, { Component } from 'react'
import { connect } from "react-redux";
import { bubble as Menu } from 'react-burger-menu';
import { set_current_topic } from "../actions/topicAction";

class BurgerMenu extends Component {
    constructor(props) {
        super(props)

        this.showTopic = this.showTopic.bind(this);
    }

    componentDidMount() {
        console.log()
    }

    render() {
        return (
            <div id="outer-container">
                {/* <header>I am a fixed header!</header> */}
                <Menu pageWrapId={ "page-wrap" } 
                      outerContainerId={ "outer-container" }
                      width = { '20%' }
                >
                    {this.props.menuItems.map(item => {
                        return <a key = {item.id} 
                                  className="menu-item"
                                  data-id={JSON.stringify(item)}
                                  onClick = {this.showTopic}
                               >
                                    {item.name}
                               </a>
                    })}
                </Menu>
                <main id="page-wrap">
                    {this.props.children}
                </main>
            </div>
        )
    }

    showTopic(e) {
        let current_topic = e.target.getAttribute("data-id")
        this.props.set_current_topic(JSON.parse(current_topic));
        console.log(this.props.currentTopic)
    }
}

const mapStateToProps = state => ({
    currentTopic: state.topic.currentTopic
})

export default connect(mapStateToProps, { set_current_topic })(BurgerMenu);