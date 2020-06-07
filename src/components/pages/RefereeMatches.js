import React from 'react';
import styled from 'styled-components';
import { Container, Form, Button, Accordion, Alert } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { getRefereeMatches } from '../UserFunctions';
import {MessageModal} from '../MessageModal';


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


 
export class RefereeMatches extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            MessageModalShow: false,
            match_id: '',
            stadium: '',
            home_team: '',
            away_team:'',
            date: '',
            errorMessage: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
      e.preventDefault();

  }

    updateState = state => {
      console.log("here");
        this.setState({ selectedRows: state.selectedRows });
      }

    componentDidMount() {  
      let errorMessage;
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
          console.log("hey" , res.data)
            this.setState({matches:res.data})
        })
        .catch((err) => {
          if (err.response.data.message)
            alert(err.response.data.message);
          else
            alert("connection has lost");
        })
    }

    
  render() {
    
    let MessageModalClose = () => this.setState({MessageModalShow: false});
    return (
      
      <Styles>
        <DataTable
          title="Matches list"
          columns={columns}
          highlightOnHover
          data={this.state.matches}
          // selectableRows
          // dense
          pagination
          expandOnRowClicked
        />
        <MessageModal
              show={this.state.MessageModalShow}
              onHide={MessageModalClose}
              props={'hello'}
            />
      </Styles>
    )
  }
};
 
export default RefereeMatches
