import React, { Component } from 'react';
import { Modal, Button} from 'react-bootstrap';

export class EventModal extends Component {
    

    render(){
        return (<div>
            <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Surgery Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
            --- Surgery Information ---
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        </div>)
    }
}