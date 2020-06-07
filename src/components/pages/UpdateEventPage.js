import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button, Accordion, Card, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getRefereeMatches, getMatchEvents } from '../UserFunctions';
import {MessageModal} from '../MessageModal';
import history from '../../history';
import { UpdateEventForm } from './UpdateEventForm';

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
    name: 'Match ID',
    selector: 'match_id',
    sortable: true,
  },
  {
    name: 'Staduim',
    selector: 'stadium',
    sortable: true,
  },
  {
    name: 'Home Team',
    selector: 'home_team',
    sortable: true,
  },
  {
    name: 'Away Team',
    selector: 'away_team',
    sortable: true
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
  }
];

/**
 * Example to load on the page to see all functionallity is working
 */
const matchRows = [
    {
        match_id: '1',
        stadium: 'Terner',
        home_team: 'Barcelona',
        away_team: 'Real Madrid',
        date: '17/04/2020'
    },
    {
        match_id: '2',
        stadium: 'Teddi',
        home_team: 'Roma',
        away_team: 'Inter',
        date: '27/05/2020'
    },
    {
        match_id: '3',
        stadium: 'asdasd',
        home_team: 'Beitar',
        away_team: 'Hatafe',
        date: '10/11/2020'
    },
    {
        match_id: '4',
        stadium: 'dfgs',
        home_team: 'Maccabi',
        away_team: 'Flitza',
        date: '12/06/2020'
    },
    {
        match_id: '5',
        stadium: 'blibla',
        home_team: 'Sheraton',
        away_team: 'Learvev',
        date: '10/07/2020'
    }
];

const matchEventsColumns = [
    // {
    //     name: 'Match ID',
    //     selector: 'match_id',
    //     sortable: true,
    //     value: this.state.match_id
    //   },
      {
        name: 'Event ID',
        selector: 'event_id',
        sortable: true,
      },
      {
        name: 'Event Type',
        selector: 'event_type',
        sortable: true,
      },
      {
        name: 'Player Maker number',
        selector: 'player_number',
        sortable: true
      },
      {
        name: 'Game Minute',
        selector: 'game_min',
        sortable: true,
      },
      {
        name: 'Description',
        selector: 'description',
        sortable: true,
      }
];

const matchEventsRows = [
    {
        match_id: '1',
        event_id: '123',
        event_type: 'Foul',
        game_min: '23',
        player_number: '17',
        description: 'Ronaldo made foul on Ronaldiniho, make a stright glitch to his right leg after a corner'
    },
    {
        match_id: '1',
        event_id: '103',
        event_type: 'Goal',
        game_min: '40',
        player_number: '29',
        description: 'Messi shot the ball from half of the field'
    },
    {
        match_id: '1',
        event_id: '19',
        event_type: 'RedCard',
        game_min: '56',
        player_number: '2',
        description: 'Pique got red ticket because hw was ben zona'
    }
];
 
export class UpdateEventPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            matchEvents: [],
            MessageModalShow: false,
            match_id: '',
            player_number: '',
            game_min: '',
            description:'',
            event_type: '',
            date: '',
            oldevent_id: '',
            visible: false,
            moveToUpdate: false,
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
      e.preventDefault();
  }

  /**
   * This functions responisble for openning and closing the modal of the event list of 
   * a chosen match that was clicked
   */
  onDismissClickedRow = () => {
    this.setVisible(false);
    }

    // putMatchID(e){

    // }

    onOpenClickedRow (e) {
        // e.preventDefault();
        console.log(e);
        // putMatchID(e);
        this.setState({match_id: e.match_id},()=>{this.showMatchEvents();});
    }

    setVisible = (flag) => {
        this.setState({visible: flag});
    }

    /**
     * This functions responisble for showing the the component UpdateEventForm
     */
    setUpdateFlag = (flag) => {
        this.setState({moveToUpdate: flag});
    }
    onUpdateEvent = (e) => {
        this.setUpdateFlag(true);
        this.setState({
            oldevent_id: e.event_id,
            player_number: e.player_number,
            game_min: e.game_min,
            description: e.description,
            event_type: e.event_type
        });
        this.onDismissClickedRow();
    }

    showMatchEvents = () => {
      console.log(this.state.match_id);
    //   console.log(this.props.match_id);
        getMatchEvents(this.state.match_id).then (res => {
          if (res) {
            this.setState({matchEvents: res.data});
          }
          else{
            this.setState({matchEvents: matchEventsRows});
          }
            this.setVisible(true);
        }).catch((err) => {
          // alert(err.response.data.message)
          this.setState({matchEvents: matchEventsRows});
          this.setVisible(true);
      })
    }

    componentDidMount() {
        let profiles = JSON.parse(localStorage.getItem("profiles"));
        let auth = profiles;
        for (let i = 0; i < profiles.length; i++) {
            if(profiles[i].profileName==="referee")
                {
                    console.log(profiles[i].profileName);
                    auth = profiles[i] ;

                }
          }

        getRefereeMatches(auth.profileID).then(res => { 
          console.log(res.data)
            this.setState({matches:res.data})
        }).catch((err) => {
          if (err.response.data.message)
            alert(err.response.data.message);
          else
            alert("connection has lost");
        })
    }
    
  render() {
    
    let rowClicked = this.state.visible;
    let showUpdatePage = this.state.moveToUpdate;
    let MessageModalClose = () => this.setState({MessageModalShow: false});
    return (
      
      <Styles>
        {!showUpdatePage
            ?
            <div>
            <DataTable className="Matches-Modal"
            title="Matches list"
            columns={columns}
            highlightOnHover
            data={this.state.matches}
            // data={matchRows}
            pagination
            Clicked
            // style={{cursor: 'pointer'}}
            pointerOnHover
            onRowClicked={(e) => this.onOpenClickedRow(e)}
            />
            <MessageModal
                show={this.state.MessageModalShow}
                onHide={MessageModalClose}
                props={'hello'}
                />
            <br></br>
            <span className = "badge badge-pill badge-info"> *Choose the desired match by clicking on the row </span>
            </div>
            :
            <UpdateEventForm
            oldevent_id={this.state.oldevent_id}
            match_id={this.state.match_id} 
            event_type={this.state.event_type} 
            player_number={this.state.player_number}
            game_min={this.state.game_min}
            description={this.state.description}
            >
            </UpdateEventForm>
        }
        {!rowClicked
            ?
            null
            :
            <Modal 
            className="show-match-events-modal"
            show={rowClicked} 
            onHide={this.onDismissClickedRow} 
            animation={true}
            autoFocus={true}
            scrollable={true}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                    <Modal.Title><strong>Match Events List</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <span className = "badge badge-pill badge-info"> *Choose the desired match by clicking on the row </span>
                <DataTable className="Events-Modal"
                    columns={matchEventsColumns}
                    highlightOnHover
                    data={this.state.matchEvents}
                    // data={matchEventsRows}
                    // style={{cursor: 'pointer'}}
                    pointerOnHover
                    onRowClicked={(e) => this.onUpdateEvent(e)}
                />
                </Modal.Body>
                <Modal.Footer >
                    <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismissClickedRow}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        }
      </Styles>
    )
  }
};
 
export default UpdateEventPage
