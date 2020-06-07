import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button ,Col,Row,Modal} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { addNewTeam } from '../UserFunctions'; 
import { getAllUnAssignedPlayers } from '../UserFunctions'; 
import { getAllStadiums } from '../UserFunctions'; 
import { getAllUnAssignedCoaches } from '../UserFunctions'; 
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

const columns = [
    {
      name: 'Player ID',
      selector: 'player_id',
      sortable: true,
    },
    {
      name: 'Player name',
      selector: 'player_name',
      sortable: true,
    },
    {
      name: 'Player type',
      selector: 'player_type',
      sortable: true,
    }
  ];

export class AddNewTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            team_name: '',
            League: '123',
            coach: '123',
            players: [],
            chosenPlayer: [],
            leagues: [],
            stadiums: [],
            coaches: [],
            game_minute: '123',
            home_team: '',
            away_team: '',
            stadium: '123',
            rfa_id: '123',
            successInsertion: false,
            errorOccured: false,
            error: ''

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    onChange(e) {
      console.log(e);
      console.log(e.target.name);
      console.log(e.target.value);
      this.setState({[e.target.name]: e.target.value});
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

      const team_to_add = {
          team_name: this.state.team_name,
          league: this.state.League,
          coach: this.state.coach,
          game_minute: this.state.game_minute,
          home_team: this.state.home_team,
          away_team: this.state.away_team,
          players: this.state.chosenPlayers,
          description: this.state.description,
          staduim: this.state.stadium,
          rfa_id: auth.profileID
        
      };
           
    addNewTeam(team_to_add).then(res => {
          if (res) {
            console.log(res);
            this.onOpenSuccessInsertion();
        }
          else {
          }
      }).catch(err => {
        // this.setState({error: err.response.data.message}, () => this.onOpenError());
        this.onOpenError(err.response.data.message);
    })
  }

  addPlayer(e){
    this.setState({chosenPlayers: e.selectedRows.map((cell) => cell.player_id)}, () => console.log(this.state.players));
    // this.state.players = e.selectedRows.map((cell) => cell.player_id);
    // console.log(this.state.players);
  }

  updateState = state => {
    console.log("here");
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
      if (msg==="For input string: \"undefined\"") {
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

    getAllUnAssignedCoaches().then(res => { 
        console.log(res.data)
          this.setState({coaches:res.data})
      }).catch((err) => {
        alert(err.response.data.message);
        console.log(err)
      })

      getAllStadiums().then(res => { 
        console.log("hey",res.data)
          this.setState({stadiums:res.data})
      }).catch((err) => {
        alert(err.response.data.message);
        console.log(err)
      })

      getAllLeagues().then(res => { 
        console.log(res.data)
          this.setState({leagues:res.data})
      }).catch((err) => {
        alert(err.response.data.message);
        console.log(err)
      })

      getAllUnAssignedPlayers().then(res => { 
        console.log(res.data)
          this.setState({players:res.data})
      }).catch((err) => {
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
                    className="success-team-assertion-modal"
                    show={this.state.successInsertion} 
                    onHide={this.onDismissInsertion} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="team-assertion-modal-title-vcenter"
                    >
                        <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                            <Modal.Title><strong>Great!</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body > You have successfully added new team to the system!</Modal.Body>
                        <Modal.Footer >
                            <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismissInsertion}>
                                Close
                            </Button>
                        </Modal.Footer>
                  </Modal>
                  
                  <Modal 
                    className="team-error-modal"
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
                                    <Form.Label>Team name:</Form.Label>
                                    <Form.Control type="text"  name="team_name"  placeholder="Enter team name" onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <Form.Label>Select leauge:</Form.Label>
                                    <Form.Control as="select" value={this.state.leauge} name="League" placeholder="Select league" onChange={this.onChange}>
                                        <option>Select league</option>
                                        {this.state.leagues.map((league) => <option key={league.leagueID} value={league.leagueID}>{league.leagueName}</option>)}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Select staduim:</Form.Label>
                                    <Form.Control as="select" value={this.state.stadium} name="stadium" placeholder="Select stadium" onChange={this.onChange}>
                                    <option>Select stadium</option>
                                    {this.state.stadiums.map((stadium) => <option key={stadium.stadiumID} value={stadium.stadiumID}>{stadium.stadiumName}</option>)}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label>Select coach:</Form.Label>
                                    <Form.Control as="select" value={this.state.event_type} name="coach" placeholder="Select coach" onChange={this.onChange}>
                                    <option>Select coach</option>
                                    {this.state.coaches.map((coach) => <option key={coach.coachID} value={coach.coachID}>{coach.coachName}</option>)}
                                    </Form.Control>
                                </Col>
                        </Row>
                            <br></br>
                        <DataTable
                            title="Select players:"
                            columns={columns}
                            highlightOnHover
                            data={this.state.players}
                            selectableRows
                            selectableRowsHighlight
                            pagination
                            onSelectedRowsChange={(e) => this.addPlayer(e)}
                            />
                        <br></br>
                    <Button variant="outline-success" type="submit">
                    <IoIosAddCircle size="20"/>
                            Add team
                    </Button>
                </Form>
            </Container>
      </Styles>
    )
  }
};
 
export default AddNewTeam
