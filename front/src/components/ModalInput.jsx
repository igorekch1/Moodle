import React, { Component } from 'react'
import { Modal, Button } from "react-bootstrap";

class ModalInput extends Component {
    constructor(props) {
        super(props);

        this.saveNexit = this.saveNexit.bind(this);
      }

      render() {
        return (
            <Modal
                show = {this.props.show}
                onHide = {this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.modalTitle}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6>Enter the course name</h6>
                {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                <Button variant="primary" onClick={this.saveNexit}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
      }

      saveNexit(e) {
          this.props.onHide();
          this.props.onSave();
      }
}

export default ModalInput;