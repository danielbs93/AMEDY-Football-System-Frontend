import React from 'react';
import { Modal, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import styled from 'styled-components';
import history from '../history';
import { AiFillHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi'; 

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;
        &:hover {
            color: white;
        }
    }
`;


export class NavigationBar extends React.Component {
    state = {visible: false};
    onDismiss = () => this.setVisible(false);
    onOpen = () => this.setVisible(true);
    setVisible = (flag) => {
        if (flag) {
            this.setState({visible: true});
        }
        else {
            this.setState({visible: false});
        }
    }


    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('profiles');
        this.onOpen();
        // alert("you successfully logeed out");

        // window.location.reload(true);
        history.push('/');
    }

    render() {
        let auth = JSON.parse(localStorage.getItem("profiles"));
        let show = this.state.visible;
        // let profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
        // console.log(profiles);
        // console.log(auth.profileID);
        return (
        <Styles> 
            { !show
                ?
                <div></div>
                :
                <Modal 
                    className="log-in-modal"
                    show={this.state.visible} 
                    onHide={this.onDismiss} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                            <Modal.Title><strong>Good Bye!</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body >You have succesfully logged out from the AMEDY system!</Modal.Body>
                        <Modal.Footer >
                            <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismiss}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
            }       
            { !auth 
                ?
                <Navbar bg="secondary" expand="lg" variant="dark">
                <Navbar.Brand href="/Home"><AiFillHome size="35"/> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">                      
                        <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>    
                    <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/login">Login  <FiLogIn size="18"/></Nav.Link></Nav.Item>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                :
                <Navbar bg="secondary" expand="lg" variant="dark">
                <Navbar.Brand href="/Home"><AiFillHome size="35"/> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown title="Profile" id="collasible-nav-dropdown">
                            {auth.map((profile)=> 
                        <NavDropdown.Item href={"/" + profile.profileName}>{profile.profileName}</NavDropdown.Item>)}
                        {/* <NavDropdown.Item href="/rfa">RFA</NavDropdown.Item>
                        <NavDropdown.Item href="/fan">Fan</NavDropdown.Item> */}
                             {/* {localStorage.getItem('profiles').map((profile) => <option name="chosen_league" key={profile.profileID} value={profile.profileID}>
                              {profile.profileName}</option>)} */}
                        </NavDropdown>                        
                        <Nav.Item><Nav.Link href="/NoMatch">Menu</Nav.Link></Nav.Item>
                        <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>  
                        <Nav.Item><Nav.Link href="/" onClick={this.logOut.bind(this)}>Logout  <FiLogOut size="18"/></Nav.Link></Nav.Item>  
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            }
        </Styles>
        )
    }
}


