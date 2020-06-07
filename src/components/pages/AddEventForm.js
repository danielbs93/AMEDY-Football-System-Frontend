import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button, Accordion, Card, Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getRefereeMatches, getMatchEvents } from '../UserFunctions';
import {MessageModal} from '../MessageModal';
import history from '../../history';
import { AddEventToMatch } from './AddEventToMatch';
// import ReactDataTablePagination from 'react-datatable-pagination'

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

 
export class AddEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            MessageModalShow: false,
            match_id: '',
            visible: false,
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
    // history.push('/rfa');
    }
    onOpenClickedRow (e) {
        console.log(e);
        this.setState({
            match_id: e.match_id,
        });
        this.setVisible(true);
    }
    setVisible = (flag) => {
        this.setState({visible: flag});
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
          console.log(err)
          if (err.response.data.message)
            alert(err.response.data.message);
          else
            alert("connection has lost");
        })
    }

    
  render() {
    
    let rowClicked = this.state.visible;
    let MessageModalClose = () => this.setState({MessageModalShow: false});
    return (
      
      <Styles>
            <div>
            <DataTable className="Matches-Modal2"
            title="Matches list"
            columns={columns}
            highlightOnHover
            data={this.state.matches}
            // data={matchRows}
            Clicked
            // style={{cursor: 'pointer'}}
            pointerOnHover
            pagination
            filtering
            onRowClicked={(e) => this.onOpenClickedRow(e)}
            customStyles
            />
            <MessageModal
                show={this.state.MessageModalShow}
                onHide={MessageModalClose}
                props={'hello'}
                />
            <br></br>
            <span className = "badge badge-pill badge-info"> *Choose the desired match by clicking on the row </span>
            </div>
        {!rowClicked
            ?
            null
            :
            <Modal 
            className="show-add-event-modal"
            show={rowClicked} 
            onHide={this.onDismissClickedRow} 
            animation={true}
            autoFocus={true}
            scrollable={true}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                    <Modal.Title><strong>Add Event To Match</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <AddEventToMatch matchID={this.state.match_id} onDismiss={this.onDismissClickedRow}/>
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
 
export default AddEventForm
