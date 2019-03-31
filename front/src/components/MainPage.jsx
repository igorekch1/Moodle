import React, { Component } from 'react'
import { connect } from "react-redux";
import Anime from "react-anime";
import { Row, Col } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup"

class MainPage extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            shouldAnimate: false
        }

        this.triggerAnim = this.triggerAnim.bind(this);
    }

    triggerAnim() {
        this.setState({
            shouldAnimate: !this.state.shouldAnimate
        })
    }

    componentDidUpdate() {
        if (this.props.loggedIn) this.props.history.push("/determinant");
    }

    render() {
        return (
            <div>

                <Row noGutters className="mainpage-header">
                    <Col xs={'auto'}>Logotype</Col>
                    <Col xs={'auto'}>
                        <Signup/>
                    </Col>
                </Row>

                {this.state.shouldAnimate === false ?
                    <button className='signin-btn' onClick={() => this.triggerAnim()}>Sign in</button>
                      : <Anime translateY={-500}>
                            <button className='signin-btn' onClick={() => this.triggerAnim()}>Sign in</button>
                        </Anime>
                }

                <svg viewBox="0 0 215 95.8">
                    {this.state.shouldAnimate === true ?
                        <Anime
                            points={[
                                { value: '215,95.8 0,95.8 0,0 46.216,0 70.899,69.189' },
                                { value: '215,95.8 0,95.8 0,0 0,0 70.899,69.189 ' }
                            ]}
                            easing='easeOutQuad'
                            duration={1200}
                            loop={false}
                        >
                            <polygon fill="#24292e" points="215,95.8 0,95.8 0,0 47.7,0 215,0 " />
                        </Anime>
                        // : <div/>
                        :
                        <polygon className="polygon" points="215,95.8 0,95.8 0,0 46.216,0 215,0 " />
                    }
                </svg>

                {this.state.shouldAnimate === true ?
                    <Anime
                        opacity={1}
                        duration={500}
                        translateY={150}
                    >
                        <span className='signin-close' onClick={() => this.triggerAnim()} ><i className="fas fa-times" style={{fontSize: '24px'}}></i></span>
                        <div className='blip'>
                            <Login/>
                        </div>
                    </Anime>
                    :
                    <div>
                        <span className='signin-close' onClick={() => this.triggerAnim()} ><i className="fas fa-times"></i></span>
                        <div className='blip'>
                            <Login/>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProp = state => ({
    loggedIn: state.login.loggedIn
})

export default connect(mapStateToProp, {})(MainPage);