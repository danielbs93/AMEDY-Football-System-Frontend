import React from 'react';
import { Container, Media, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { FaPenSquare } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiMailSendLine } from 'react-icons/ri';
import { getRefereeMatches } from '../UserFunctions';
import history from '../../history';



const Styles = styled.div`
    .overlay {
        position: center;
    }
`;

export class Referee extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
            user:  JSON.parse(localStorage.getItem("profiles")),
            myMatches: ''
       }
   }

    render() {
        let profiles = JSON.parse(localStorage.getItem("profiles"));
        let auth = profiles;
        if (!auth) {
            auth = false;
        }
        else {
        for (let i = 0; i < profiles.length; i++) {
            
            if(profiles[i].profileName==="referee")
                {
                    auth = profiles[i] ;
                }
          }
        }
        auth = {profileName: "referee",profilID: "204"};
        return (
            <React.Fragment>
    {
      !auth 
         ?
           this.props.history.push(`/`)
         :
         <Styles>
         <h3>Hey (RefereeName)</h3>
         <br></br>
         <div className="overlay"></div>
            <Container>
                <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                    <Media>
                        <FaUserEdit size="50"/>
                        <Media.Body>
                            <h5> Edit Details  </h5>
                            <p>
                            Edit My personal details
                            </p>
                        </Media.Body>    
                    </Media>
                </Button>
                <br></br>
                <Button variant="outline-success" type="submit" href="/referee/RefereeMatches" size="lg" block>
                    <Media>
                        <FaRegCalendarAlt size="50"/>
                        <Media.Body >
                            <h5> My Matches </h5>
                            <p>
                            Watching my matches
                            </p>
                        </Media.Body>
                    </Media>
                </Button>
                <br></br>
                <Button variant="outline-success" type="submit" href="/referee/UpdateEventPage" size="lg" block>
                    <Media>
                        <FaPenSquare size="50"/>
                        <Media.Body >
                            <h5> Update Match Event </h5>
                            <p>
                            Update events up to five hours after the game
                            </p>
                        </Media.Body>
                    </Media>
                </Button>
                <br></br>
                <Button variant="outline-success" type="submit" href="/referee/AddEventForm" size="lg" block>
                    <Media>
                        <FaRegCalendarAlt size="50"/>
                        <Media.Body >
                            <h5> Add Match Event </h5>
                            <p>
                            Add events up to five hours after the game
                            </p>
                        </Media.Body>
                    </Media>
                </Button>
                <br></br>
                <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                    <Media>
                        <RiMailSendLine size="50"/>
                        <Media.Body >
                            <h5> Send Notification </h5>
                            <p>
                            Send notification to another user
                            </p>
                        </Media.Body>
                    </Media>
                </Button>
         </Container>
     </Styles>
    }
    </React.Fragment>
            
        )
    }
}