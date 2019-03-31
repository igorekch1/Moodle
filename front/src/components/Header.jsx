import React, { Component } from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";
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
                    <Col xs="true" className="Header-greeting">Logotype</Col>
                    <Col className="Header-greeting" xs="true">
                        Signed in as: {this.props.user}
                    </Col>
                    <Col xs="true" className="Logout-btn">
                        <Button variant="danger"
                                onClick = {this.log_out}
                        >
                            Log out
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
        console.log("LOGOUTED")
    }
}

const mapStateToProps = state => ({

})

export default connect ( null, { logout })(Header);