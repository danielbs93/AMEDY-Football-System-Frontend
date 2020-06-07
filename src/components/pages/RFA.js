import React from 'react';
import { Container, Media, Button, Col,Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AiTwotoneEdit } from 'react-icons/ai';
import { GoCalendar } from 'react-icons/go';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';




const Styles = styled.div`
    .overlay {
        position: center;
    }
`;

export class RFA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem('user')
        }
    }
    

    render() {
        let profiles = JSON.parse(localStorage.getItem("profiles"));
        let auth = profiles;
        for (let i = 0; i < profiles.length; i++) {
            
            if(profiles[i].profileName==="rfa")
                {
                    console.log(profiles[i].profileName);
                    auth = profiles[i] ;
                }
          }
        console.log(auth);
        return (
            <React.Fragment>
    {
      !auth 
         ?
           this.props.history.push(`/`)
         :
         <Styles>
         <h3>Hey (RFAName)</h3>
         <br></br>
         <div className="overlay"></div>
         <Container>
         <th>
            <p> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </p>
        </th>
             <th>
                 {/* <Col> */}
                     {/* <Row> */}
                        <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>   
                            <Media>
                                <IoIosAddCircle size="50"/>
                                <Media.Body>
                                    <h5> Add Leauge  </h5>
                                    <p>
                                    Create new leauge
                                    </p>
                                </Media.Body>    
                            </Media>
                        </Button>
                    {/* </Row> */}
                    {/* <Row> */}
                        <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block >
                            <Media>
                            <IoIosAddCircle size="50"/>
                            <Media.Body >
                                <h5> Add Season </h5>
                                <p>
                                Add season to leauge
                                </p>
                            </Media.Body>
                            </Media>
                    </Button>
                    {/* </Row> */}
                    {/* <Row> */}
                        <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                            <Media>
                            <AiOutlineUserAdd size="50"/>
                            <Media.Body >
                                <h5> Add Referee </h5>
                                <p>
                                Registration Referee to the football association
                                </p>
                            </Media.Body>
                        </Media>
                    </Button>
                {/* </Row> */}
                {/* <Row> */}
                    <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                     <Media>
                         <AiOutlineUserDelete size="50"/>
                        <Media.Body >
                         <h5> Remove Referee </h5>
                         <p>
                         Remove referee from the football association
                         </p>
                     </Media.Body>
                 </Media>
             </Button>
            {/* </Row> */}
         {/* <Row> */}
            <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                 <Media>
                     <GoCalendar size="50"/>
                     <Media.Body>
                         <h5> Assign Referees  </h5>
                         <p>
                         Assign referees to leauge in particular season
                         </p>
                     </Media.Body>    
                 </Media>
            </Button>
        {/* </Row> */}
        {/* <Row> */}
             <Button variant="outline-success" type="submit" href="/rfa/AddNewTeam" size="lg" block>
                 <Media>
                    <AiOutlineUsergroupAdd size="50"/>
                     <Media.Body >
                         <h5> Create Team </h5>
                         <p>
                         Add new team to league
                         </p>
                     </Media.Body>
                 </Media>
             </Button>
            {/* </Row> */}
        {/* </Col> */}
        </th>
        <th>
            <p> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </p>
        </th>
        <th>
        {/* <Col> */}
        {/* <Row> */}
            <Button variant="outline-success" type="submit" href="/rfa/AddLeagueRankPolicyForm" size="lg" block>
                 <Media>
                     <IoIosAddCircle size="50"/>
                     <Media.Body>
                         <h5> Create Leauge Rank Policy  </h5>
                         <p>
                         Add new leauge rank policy to leauge
                         </p>
                     </Media.Body>    
                 </Media>
             </Button>
        {/* </Row> */}
            {/* <Row> */}
            <Button variant="outline-success" type="submit" href="/rfa/AddNewMatchAssignmentPolicyForm" size="lg" block>
                 <Media>
                     <IoIosAddCircle size="50"/>
                     <Media.Body >
                         <h5> Create Match Assignment Policy</h5>
                         <p>
                         Add new match assignment policy to leauge
                         </p>
                     </Media.Body>
                 </Media>
            </Button>
            {/* </Row> */}
            {/* <Row> */}
            <Button variant="outline-success" type="submit" href="/rfa/AddNewMatchAssignmentPolicyForm" size="lg" block>
                 <Media>
                     <AiTwotoneEdit size="50"/>
                     <Media.Body >
                         <h5> Update Policy</h5>
                         <p>
                         Update exist policy
                         </p>
                     </Media.Body>
                 </Media>
            </Button>
         <Button variant="outline-success" type="submit" href="/rfa/AddNewPlayerForm" size="lg" block>
                 <Media>
                     <IoIosAddCircle size="50"/>
                     <Media.Body >
                         <h5> Add New Player</h5>
                         <p>
                         Create new player in the system
                         </p>
                     </Media.Body>
                 </Media>
            </Button>
            <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                 <Media>
                     <AiOutlineUserAdd size="50"/>
                     <Media.Body>
                         <h5> Add Coach </h5>
                         <p>
                         Add new coach
                         </p>
                     </Media.Body>    
                 </Media>
             </Button>
            <Button variant="outline-success" type="submit" href="/NoMatch" size="lg" block>
                <Media>
                <   IoIosAddCircle size="50"/>
                     <Media.Body >
                         <h5> Add Stadium </h5>
                         <p>
                         Add new stadium
                         </p>
                     </Media.Body>
                 </Media>
             </Button>
         </th>
         </Container>
     </Styles>
    }
    </React.Fragment>
            
        )
    }
}