import React from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
// import { login } from './UserFunctions';
// import { Menu } from './pages/Menu';
import styled from 'styled-components';
// import history from '../history';

const Styles = styled.div`
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    .tuple {
        background: none;
        border: none;
        font-weight:bold;
        color: black;
    }

    .head {
        color: white;
        font-size: 30px;
        text-shadow: -3px 1.5px 3px black;
        background: linear-gradient(to right, green 0%, #330867 100%);
        
    }
`;

export class MatchHomePanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                HomeTeams: props.data.HomeTeams,
                MatchDetails: props.data.MatchDetails,
                AwayTeams: props.data.AwayTeams,
        };
    }


    render() {
        return (
            <Styles>
                <Table striped bordered hover variant="light">
                    <thead className="head">
                        <tr>
                            <th>Home Team</th>
                            <th>Match Details</th>
                            <th>Away Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.HomeTeams.map((item, idx) => (
                            <tr id="addr0" key={idx}>
                                <td>
                                    <label
                                    className="form-control tuple"
                                    >{item}</label>
                                </td>
                                <td>
                                    <label
                                    className="form-control tuple"
                                    >{this.state.MatchDetails[idx]}</label>
                                </td>
                                <td>
                                    <label
                                    className="form-control tuple"
                                    >{this.state.AwayTeams[idx]}</label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Styles>
        )
    }
}

