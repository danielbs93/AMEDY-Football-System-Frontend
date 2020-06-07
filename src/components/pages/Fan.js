import React from 'react';
import { Container, Media, Button } from 'react-bootstrap';
import styled from 'styled-components';
// import { Container, Header, Content, Footer, Sidebar } from 'rsuite';
import { FaUserEdit } from 'react-icons/fa';
import { FaPenSquare } from 'react-icons/fa';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiMailSendLine } from 'react-icons/ri';
import { Menu } from '@material-ui/core';




const Styles = styled.div`
    .overlay {
        position: center;
    }
`;

export class Fan extends React.Component {
   
    

    render() {
        let auth = localStorage.getItem('user'); 
        console.log(localStorage.getItem('user'));
        return (
            <React.Fragment>
    {
      !auth 
         ?
           this.props.history.push(`/`)
         :
         <Styles>
         <h3>Hey (FanName)</h3>
         <br></br>
         <div className="overlay"></div>
         <Container>
             {/* <Sidebar as={Menu}>
                <Menu.Iteam></Menu.Iteam>
             </Sidebar> */}
         </Container>
     </Styles>
    }
    </React.Fragment>
            
        )
    }
}