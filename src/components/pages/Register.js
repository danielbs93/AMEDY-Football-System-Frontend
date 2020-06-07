import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { register } from '../UserFunctions';
import styled from 'styled-components';
import history from '../../history';


const Styles = styled.div`
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    .h2 {
        position: center;
        color: #fff;
    }
`;

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };
        
        register(user).then(res => {
            if (res) {
                history.push(`/`);
            }
            else {
                console.log('not registered');
                // history.push(`/nomatch`);
            }
        }).catch((e) => {
            console.log(e)
        })
    }


    render() {
        
        return (
            <Styles>
                <h2>User Registration</h2>  
                <div className="overlay"></div>
                <Container>
                    <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicText1">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="Enter first name" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                First name
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicText2">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="Enter last name" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                Last name
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.onChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Styles>
        )
    }
}