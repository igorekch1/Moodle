import React, { Component } from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/loginAction";

class Header extends Component{
    constructor(props){
        super(props);

        this.log_out = this.log_out.bind(this);
    }

    render() {
        return (
            <div className="header-wrapper">
            <Container fluid className="Header">
                <Row className="justify-content-between" noGutters>
                    <Col xs="true" className="Header-greeting">Test System</Col>
                    <Col className="Header-greeting" xs="true">
                        Signed in as: {this.props.user}
                    </Col>
                    <Col xs="true" className="Logout-btn">
                            <Button variant="danger"
                                    onClick = {this.log_out}
                            >
                                <Link to="/" className="logout-btn">
                                    Log out
                                </Link>
                            </Button>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }

    log_out(e) {
        e.preventDefault();
        this.props.logout();
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn
})

export default connect ( mapStateToProps, { logout })(Header);