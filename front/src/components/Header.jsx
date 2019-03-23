import React, { Component } from 'react'
import {Container, Row, Col, Button} from "react-bootstrap";

class Header extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Container fluid className="Header">
                <Row className="justify-content-between">
                    <Col xs="2" className="Header-greeting">Logotype mVzVhVkV</Col>
                    <Col className="Header-greeting" xs="2">
                        Welcome, {this.props.user}
                    </Col>
                    <Col xs="2" className="Logout-btn">
                        <Button variant="danger">Log out</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Header;