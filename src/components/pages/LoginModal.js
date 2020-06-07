import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import { Container, Form, Button } from 'react-bootstrap';


export class LoginModal extends React.Component {
    constructor(props) {
      super(props);
    }

    render(){

        let showModal = this.props.open;

        return (
            <div>
              { showModal
                ?
                <Modal.Dialog
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Login Window
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div className="overlay"></div>
                            <Container>
                                <label>You have logged in successfully</label>
                            </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                  </Modal.Footer>
                </Modal.Dialog>
                :
                <Modal.Dialog
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Login Window
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div className="overlay"></div>
                            <Container>
                                <label>You have entered wrong details, please try again</label>
                            </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              }   
            </div>
        )   
    }
}