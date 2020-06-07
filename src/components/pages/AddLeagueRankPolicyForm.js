import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button ,Col,Row, Modal } from 'react-bootstrap';
import { addLeagueRankPolicy } from '../UserFunctions';
import { getAllLeagues } from '../UserFunctions'; 
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
`;

export class AddLeagueRankPolicyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            policy_name: '',
            win_points: '',
            lose_points: '',
            draw_points: '',
            leagues: [],
            chosen_league: '',
            rfa_id: '',
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
      console.log(e.target.value)
  }

  onSubmit(e) {
      e.preventDefault();

      let profiles = JSON.parse(localStorage.getItem("profiles"));
      let auth = profiles;
      for (let i = 0; i < profiles.length; i++) {
          if(profiles[i].profileName==="rfa")
              {
                  console.log(profiles[i].profileName);
                  auth = profiles[i] ;

              }
        }

      const policy_to_add = {
        policy_name: this.state.policy_name,
        win_points: this.state.win_points,
        lose_points: this.state.lose_points,
        draw_points: this.state.draw_points,
        chosen_league: this.state.chosen_league,
        rfa_id: auth.profileID
        
      };

    addLeagueRankPolicy(policy_to_add).then(res => {
      console.log(policy_to_add);
          if (res) {
            console.log(res);
            this.onOpenSuccessInsertion();
        }
          else {
            let msg = "Insertion failed! please insert all the required fields";
            this.onOpenError(msg);
          }
    })
    .catch(err => {
      // alert(err.response.data.message);
      // this.setState({error: err.response.data.message}, () => this.onOpenError());
      this.onOpenError(err.response.data.message);
  })
  }

    updateState = state => {
        this.setState({ selectedRows: state.selectedRows });
      }

    /**
     * functions for showing and dismissing the modal of success insertion operation
     */
    onDismissInsertion = () => {
      this.setSuccessInsertion(false);
      history.push('/rfa');
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

    onOpenError = (msg) => {
      this.setOpenError(true);
      if (msg==="Failed to convert value of type 'java.lang.String' to required type 'int'; nested exception is java.lang.NumberFormatException: For input string: \"\"") {
        let myMsg = "Insertion failed! please insert all the required fields";
        this.setState({error: myMsg});
      }
      else {
        this.setState({error: msg})
      }
    }

    setOpenError = (flag) => {
      this.setState({errorOccured: flag});
    }



    componentDidMount() {
      // let profiles = JSON.parse(localStorage.getItem("profiles"));
      // let auth = profiles;
      // for (let i = 0; i < profiles.length; i++) {
      //     if(profiles[i].profileName==="rfa")
      //         {
      //             console.log(profiles[i].profileName);
      //             auth = profiles[i] ;

      //         }
      //   }

      getAllLeagues().then(res => {
          console.log(res.data)
            this.setState({leagues:res.data})
        }).catch((err) => {
          console.log(err)
          if (err.response.data.message)
            alert(err.response.data.message);
          else
            alert("connection has lost");
        })

    }
    


  render() {

    return (
      <Styles>
                  <Modal 
                    className="success-assertion-modal"
                    show={this.state.successInsertion} 
                    onHide={this.onDismissInsertion} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="assertion-modal-title-vcenter"
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
                    className="error-modal"
                    show={this.state.errorOccured} 
                    onHide={this.onDismissError} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="error-modal-title-vcenter"
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
                  <Row>
                    <Col>
                      <Form.Label>Select leauge</Form.Label>
                        <Form.Control as="select" value={this.state.league} id="chosen_league" name="chosen_league" placeholder="Select league" onChange={this.onChange}>
                            <option>Select league</option>
                            {this.state.leagues.map((league) => <option name="chosen_league" key={league.leagueID} value={league.leagueID}>
                              {league.leagueName}</option>)}
                        </Form.Control>
                    </Col>
                      <Col>
                        <Form.Label>Policy Name</Form.Label>
                        <Form.Control type="text"  name="policy_name"  placeholder="Enter policy name" onChange={this.onChange}/>
                      </Col>                    
                      <Col></Col>
                  </Row>
                    <br></br>
                  <Row>
                    <Col>
                      <Form.Label>Win</Form.Label>
                      <Form.Control type="number" name="win_points" placeholder="Points for winning team" onChange={this.onChange}/>
                    </Col>
                    <Col>
                      <Form.Label>Lose</Form.Label>
                      <Form.Control type="number" name="lose_points" placeholder="Points for losing team" onChange={this.onChange}/>
                    </Col>
                    <Col>
                      <Form.Label>Draw</Form.Label>
                      <Form.Control type="number" name="draw_points" placeholder="Points for draw" onChange={this.onChange}/>
                    </Col>
                  </Row>
                <br></br><br></br>
                <Button variant="outline-success" type="submit">
                <IoIosAddCircle size="20"/>
                        Add Policy
                </Button>
            </Form>
        </Container>
      </Styles>
    )
  }
};
 
export default AddLeagueRankPolicyForm
