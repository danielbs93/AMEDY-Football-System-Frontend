import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button ,Col,Row, Table, Modal, Alert} from 'react-bootstrap';
import { updateEventToMatch } from '../UserFunctions'; 
import { IoIosAddCircle } from 'react-icons/io';
import history from "../../history";

const Styles = styled.div`
    .overlay {
        position: absolute;
        top: 10px;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

export class UpdateEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldevent_id: props.oldevent_id,
            match_id: props.match_id,
            event_type: '',
            player_number: '123',
            game_minute: '123',
            description: '',
            visible: false,
            errorOccured: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    setVisible = (flag) => {
        this.setState({visible: flag});
    } 
    onDismiss = () => {
        this.setVisible(false);
        history.push('/referee');
    }
    onOpen = () => {
        this.setVisible(true);
    }

    setErrorOccured = (flag) => {
        this.setState({errorOccured: flag});
    }

    onErrorOccured = () => {
        this.setErrorOccured(true);
    }

    onErrorModalDismiss = () => {
        this.setErrorOccured(false);
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
      e.preventDefault();

      let profiles = JSON.parse(localStorage.getItem("profiles"));
      let auth = profiles;
      for (let i = 0; i < profiles.length; i++) {
          if(profiles[i].profileName==="referee")
              {
                  console.log(profiles[i].profileName);
                  auth = profiles[i] ;
              }
        }


      const event_to_add = {
          match_id: this.state.match_id,
          event_type: this.state.event_type,
          player_number: this.state.player_number,
          game_minute: this.state.game_minute,
          description: this.state.description,
          referee_id: auth.profileID
        
      };
      
    //   console.log(policy_to_add);      
    updateEventToMatch(auth.profileID,this.state.oldevent_id,event_to_add).then(res => { //need to change referee id
          if (res) {
            this.onOpen();
        }
          else {
              this.onErrorOccured();
          }
      })
      .catch(err => {
        this.onErrorOccured();
        // alert(err.response.data.message);
    })
  }

    updateState = state => {
        this.setState({ selectedRows: state.selectedRows });
      }


  render() {

    let eventUpdated = this.state.visible;
    let errOccured = this.state.errorOccured;

    return (
      <Styles>
          {!errOccured
            ?
            <div></div>
            :
            <Alert isOpen={this.state.errorOccured} variant="warning">
                        <Alert.Heading>Ops</Alert.Heading>
                        <p>
                            You have inserted wrong details, or you have not filled all the required fields.
                            Please try again :)
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Button onClick={this.onErrorModalDismiss} variant="outline-success">
                            Close
                        </Button>
                        </div>
            </Alert>

          }
            <div className="overlay"></div>
            <Container>
                <Form onSubmit={this.onSubmit}>
                        {/* <Table> */}
                            <Row>
                                <Col>
                                    <Form.Label>Event Type</Form.Label>
                                    <Form.Control as="select" value={this.state.event_type} name="event_type" placeholder={this.props.event_type} onChange={this.onChange}>
                                        <option>Foul</option><option>Injury</option><option>Substitution</option><option>Goal</option><option>Offside</option>
                                        <option>YellowCard</option><option>RedCard</option><option>Extension</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                            <Col>
                            <Form.Label>Player number</Form.Label>
                            <Form.Control type="number" name="player_number" placeholder={"player number was: " + this.props.player_number} onChange={this.onChange}/>
                            </Col>
                            <Col>
                            <Form.Label>Game minute</Form.Label>
                            <Form.Control type="number" name="game_minute" placeholder={"Game minut was: " + this.props.game_min} onChange={this.onChange}/>
                            </Col>
                            </Row>
                            <br></br>
                        <br></br>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" placeholder={"Description was: " + this.props.description} rows="3" onChange={this.onChange} />
                        <br></br>
                    <Button variant="outline-success" type="submit">
                    <IoIosAddCircle size="20"/>
                            Update Event
                    </Button>
                </Form>
            </Container>
            {!eventUpdated
                ?
                <div></div>
                :
                <Modal 
                className="update-event-modal"
                show={eventUpdated} 
                onHide={this.onDismiss} 
                animation={true}
                autoFocus={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                        <Modal.Title><strong>Event Updated!</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        Hi, you have successfully updated the desired event, see you next time!
                    </Modal.Body>
                    <Modal.Footer >
                        <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismiss}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            }
      </Styles>
    )
  }
};
 
export default UpdateEventForm
