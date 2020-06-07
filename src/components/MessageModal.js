import React, { Component } from 'react';
import { Modal} from 'react-bootstrap';
import { Container, Form, Button } from 'react-bootstrap';

export class MessageModal extends Component {
    

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
          Patients
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="overlay"></div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicText1">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="Enter first name" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                First name
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicText2">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="Enter last name" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                Last name
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
        </div>)
    }
}