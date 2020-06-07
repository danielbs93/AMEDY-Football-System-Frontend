import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button ,Row, Col, Modal, Alert } from 'react-bootstrap';
import { addNewPlayer } from '../UserFunctions'; //TODO: Need to change for relvant function
import { IoIosAddCircle } from 'react-icons/io';
import history from '../../history';

const Styles = styled.div`
    .overlay {
        position: absolute;
        top: 10px;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    .Form .Label {
        font-weight: bold;
    }
`;

export class AddNewPlayerForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            birth_date: '',
            player_type: '',
            visible_registered: false,
            wrongDetails: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }


    onDismissRegistered = () => {
        this.setVisibleRegistered(false);
        history.push('/rfa');
    }
    onOpenRegistered = () => this.setVisibleRegistered(true);
    setVisibleRegistered = (flag) => {
        if (flag) {
            this.setState({visible_registered: true});
        }
        else {
            this.setState({visible_registered: false});
        }
    }

    onWrongDetailsDismiss = () => this.setVisibleWrongDetails(false);
    onWrongDetailsOpen = () => this.setVisibleWrongDetails(true);
    setVisibleWrongDetails = (flag) => {
        if (flag) {
            this.setState({wrongDetails: true});
        }
        else {
            this.setState({wrongDetails: false});
        }
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
      e.preventDefault();

      const player_to_add = {
        name: this.state.name,
        birth_date: this.state.birth_date,
        player_type: this.state.player_type
      };
      
    // console.log(policy_to_add);
    if (document.getElementById("player-name").value.length === 0
         || document.getElementById("player-role").value.length === 0
         || document.getElementById("birth-date").value.length === 0) {
            this.onWrongDetailsOpen();
    }
    else {      
        // addNewPlayer(player_to_add).then(res => {
        //     if (res) {
        //         console.log(res);
                this.onOpenRegistered();

            // }
            // else {
                
            // }
        // })
    }
  }

    updateState = state => {
        this.setState({ selectedRows: state.selectedRows });
      }


  render() {

    let registered = this.state.visible_registered;
    let wrongDetails = this.state.wrongDetails;

      const roles = [
            'Goal Keeper',
            'Centre Back',
            'Right Fullback',
            'Left Fullback',
            'Left MF',
            'Centre MF',
            'Right MF',
            'Centre Forward'
        ];

    return (
      <Styles>
          { !registered
                ?
                <div></div>
                :
                <Modal 
                    className="log-in-modal"
                    show={registered} 
                    onHide={this.onDismissRegistered} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                            <Modal.Title><strong>Congrats - Player created</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body >{this.state.name} Have successfully created and added to AMEDY system!</Modal.Body>
                        <Modal.Footer >
                            <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismissRegistered}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            }
            { !wrongDetails
                ?
                <div></div>
                :
                <Alert isOpen={wrongDetails} variant="warning">
                        <Alert.Heading>Ops</Alert.Heading>
                        <p>
                            You have inserted wrong details, or you have not filled 
                            all the required fields.
                            Please try again.
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Button onClick={this.onWrongDetailsDismiss} variant="outline-success">
                            Close
                        </Button>
                        </div>
                    </Alert>

            }
            <div className="overlay"></div>
            <Container>
                <Form onSubmit={this.onSubmit}>
                        {/* <table> */}
                            <Row>
                              <Col>
                              <Form.Label>Player Name</Form.Label>
                                <Form.Control type="text" id="player-name" name="name" placeholder="Full name of player" onChange={this.onChange}>
                              </Form.Control>
                              </Col>
                              <Col>
                                <Form.Label>Player Role</Form.Label>
                                <Form.Control as="select"  id="player-role" name="player_type" placeholder="Select your role" onChange={this.onChange}>
                                {roles.map((role,idx) => <option key={idx} value={role}>{role}</option>)}
                                </Form.Control>
                              </Col>
                              <Col>
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control type="date" id="birth-date" name="birth_date" placeholder="" onChange={this.onChange}/>
                              </Col>
                            </Row>
                            <br></br>
                        {/* </table> */}
                        <br></br>
                    <Button variant="outline-success" type="submit">
                    <IoIosAddCircle size="20"/>
                            Add new player
                    </Button>
                </Form>
            </Container>
      </Styles>
    )
  }
};
 
export default AddNewPlayerForm
