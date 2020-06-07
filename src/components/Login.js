import React from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { login } from './UserFunctions';
import { NavigationBar } from './NavigationBar';
import { useAlert } from 'react-alert';  
// import { Menu } from './pages/Menu';
import styled from 'styled-components';
import history from '../history';
import ReactDOM from "react-dom";
// import { LoginModal } from './pages/LoginModal';


const Styles = styled.div`
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    log-in-modal .modal-content {
        background-color: green;
    }

    close-modal {
        color: blue;
    }
`;


export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            profiles: [],
            flagLoggedin: false,
            flagWrongDetails: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDismissLoggedIn = () => {
        this.setVisibleLoggedIn(false);
        history.push('/');
        window.location.reload(true);
    }
    onOpenLoggedIn = () => this.setVisibleLoggedIn(true);
    setVisibleLoggedIn = (flag) => {
        if (flag) {
            this.setState({flagLoggedin: true});
        }
        else {
            this.setState({flagLoggedin: false});
        }
    }

    onWrongDetailsDismiss = () => this.setVisibleWrongDetails(false);
    onWrongDetailsOpen = () => this.setVisibleWrongDetails(true);
    setVisibleWrongDetails = (flag) => {
        if (flag) {
            this.setState({flagWrongDetails: true});
        }
        else {
            this.setState({flagWrongDetails: false});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };
        
        login(user).then((res, err) => {
            if (res) {
                console.log(res);
                // localStorage.setItem("user", res);
                localStorage.setItem("profiles", JSON.stringify(res));
                // alert("You have successfully logged in");
                let profiles = JSON.parse(localStorage.getItem("profiles") || "[]");
                console.log(profiles);
                this.onOpenLoggedIn();
                
            }
            else {
                console.log(err);
                // alert("You have inserted wrong details, please try again");
                this.onWrongDetailsOpen();
            }
        }).catch(err => {
            // alert(err.response.data.message);
            this.onWrongDetailsOpen();
        })
    }


    render() {

        let loggedIn = this.state.flagLoggedin;
        let wrongDetails = this.state.flagWrongDetails;

        return (
            <Styles>
                {
                !loggedIn
                ?
                    <div></div>
                :
                    <Modal 
                    className="log-in-modal"
                    show={this.state.flagLoggedin} 
                    onHide={this.onDismissLoggedIn} 
                    animation={true}
                    autoFocus={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    >
                        <Modal.Header closeButton style={{backgroundColor: "#80f2bd"}}>
                            <Modal.Title><strong>Welcome!</strong></Modal.Title>
                        </Modal.Header>
                        <Modal.Body > You have successfully logged in!</Modal.Body>
                        <Modal.Footer >
                            <Button style={{backgroundColor: "#5190f5"}} variant="secondary" onClick={this.onDismissLoggedIn}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                }
                {
                !wrongDetails
                ?
                    <div></div>
                :
                    <Alert isOpen={this.state.flagWrongDetails} variant="warning">
                        <Alert.Heading>Ops</Alert.Heading>
                        <p>
                            You have inserted wrong details, or you have not registered yet.
                            Sign up to our amazing AMEDY system
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                        <Button onClick={this.onWrongDetailsDismiss} variant="outline-success">
                            Close
                        </Button>
                        </div>
                    </Alert>
                }
                <div className="overlay"></div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                {/* We'll never share your email with anyone else. */}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange}/>
                        </Form.Group>
                        
                        <Button variant="outline-success" type="submit" >
                            Login
                        </Button>
                        &nbsp; &nbsp; 
                        <Button variant="outline-success" type="submit" href="/register">
                            Register
                        </Button>
                    </Form>
                </Container>
            </Styles>
        )
    }
}

