import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button ,Col,Row,Table, Modal} from 'react-bootstrap';
import { addEventToMatch } from '../UserFunctions'; //TODO: Need to change for relvant function
import { IoIosAddCircle } from 'react-icons/io';

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

export class AddEventToMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            match_id: '',
            event_type: '',
            player_number: '123',
            game_minute: '123',
            description: '',
            successInsertion: false,
            errorOccured: false,
            error: ''

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  /**
     * functions for showing and dismissing the modal of success insertion operation
     */
    onDismissInsertion = () => {
        this.setSuccessInsertion(false);
      }
  
      onOpenSuccessInsertion = () => {
        this.setSuccessInsertion(true);
      }
  
      setSuccessInsertion = (flag) => {
        this.setState({successInsertion: flag});
      }
      
      /**
       * 
       * functions for Showing and dismissing the modal of error occured respones
       */
      onDismissError = () => {
        this.setOpenError(false);
      }
  
      onOpenError = () => {
        this.setOpenError(true);
      }
  
      setOpenError = (flag) => {
        this.setState({errorOccured: flag});
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
          match_id: this.props.matchID,
          event_type: this.state.event_type,
          player_number: this.state.player_number,
          game_minute: this.state.game_minute,
          description: this.state.description,
          referee_id: auth.profileID
        
      };
      
    
    addEventToMatch(event_to_add).then(res => {
          if (res) {
            console.log(res);
            // alert("Event add succssesfuly");
            this.onOpenSuccessInsertion();
            this.props.onDismiss();
        }
      })
      .catch(err=>{
        // alert(err.response.data.message);
        if (err.response.data.message)
            this.setState({error: err.response.data.message}, () => this.onOpenError());
        else
            alert("connection has lost");
    })

      
  }

    updateState = state => {
        this.setState({ selectedRows: state.selectedRows });
      }


  render() {


    return (
      <Styles>

<Modal 
                    className="event-success-assertion-modal"
                    show={this.state.successInsertion} 
                    onHide={this.onDismissInsertion} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="event-assertion-modal-title-vcenter"
                    >
                        <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                            <Modal.Title><strong>Great!</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body > You have successfully added new League Rank Policy to the system!</Modal.Body>
                        <Modal.Footer >
                            <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismissInsertion}>
                                Close
                            </Button>
                        </Modal.Footer>
                  </Modal>
                  
                  <Modal 
                    className="event-error-modal"
                    show={this.state.errorOccured} 
                    onHide={this.onDismissError} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="event-error-modal-title-vcenter"
                    >
                        <Modal.Header closeButton style={{backgroundColor: "#fc3f5c"}}>
                            <Modal.Title><strong>Oops!</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body > {this.state.error} </Modal.Body>
                        <Modal.Footer >
                            <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismissError}>
                                Close
                            </Button>
                        </Modal.Footer>
                  </Modal>

            <div className="overlay"></div>
            <Container>
                <Form onSubmit={this.onSubmit}>
                        {/* <Table> */}
                            <Row>
                                <Col>
                                    <Form.Label>Match ID</Form.Label>
                                    <Form.Control type="number"  name="match_id"  placeholder={this.props.matchID} value={this.props.matchID} onChange={this.onChange}></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Event Type</Form.Label>
                                    <Form.Control as="select" value={this.state.event_type} name="event_type" placeholder="Select event type" onChange={this.onChange}>
                                        <option>Foul</option><option>Injury</option><option>Substitution</option><option>Goal</option><option>Offside</option>
                                        <option>YellowCard</option><option>RedCard</option><option>Extension</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                            <Col>
                            <Form.Label>Player number</Form.Label>
                            <Form.Control type="number" name="player_number" placeholder="Enter player number" onChange={this.onChange}/>
                            </Col>
                            <Col>
                            <Form.Label>Game minute</Form.Label>
                            <Form.Control type="number" name="game_minute" placeholder="Enter game minute" onChange={this.onChange}/>
                            </Col>
                            </Row>
                            <br></br>
                            <Row>
                            <Col>
                                <Form.Check type="radio" label="Home team" name="formHorizontalRadios" id="home_team" defaultChecked onChange={this.onChange}/>
                                <Form.Check type="radio" label="Away team" name="formHorizontalRadios" id="away_team" onChange={this.onChange}/>
                            </Col>
                            </Row>
                        <br></br>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows="3" onChange={this.onChange} />
                        <br></br>
                    <Button variant="outline-success" type="submit">
                    <IoIosAddCircle size="20"/>
                            Add Event
                    </Button>
                </Form>
            </Container>
      </Styles>
    )
  }
};
 
export default AddEventToMatch
