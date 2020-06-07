import React from 'react';
import { Container, Media, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { IoMdContacts } from 'react-icons/io';
import { MdPermContactCalendar } from 'react-icons/md';
import { FaCalendarCheck, FaHospital } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';



const Styles = styled.div`
    .container {
        position: center;
    }
`;

export class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        };
        
        console.log(user.email, user.password);
    }


    render() {
        
        return (
            <Styles>
                <div className="overlay"></div>
                <Container>
                    <Button variant="primary" type="submit" href="/awaitingsurgeriestest" size="lg" block>
                        <Media>
                            <IoMdContacts size="50"/>
                            <Media.Body>
                                <h5> Awaiting Surgeries</h5>
                                <p>
                                Surgeries that are waiting for an assignment
                                </p>
                            </Media.Body>    
                        </Media>
                    </Button>
                <br></br>
                    <Button variant="primary" type="submit" href="/nomatch" size="lg" block>
                        <Media>
                            <MdPermContactCalendar size="50"/>
                            <Media.Body>
                                <h5> Surgeons' Shifts </h5>
                                <p>
                                Surgeries that are waiting for an assignment
                                </p>
                            </Media.Body>
                        </Media>
                    </Button>
                <br></br>
                    <Button variant="primary" type="submit" href="/viewboard" size="lg" block>
                        <Media>
                            <FaCalendarCheck size="50"/>
                            <Media.Body >
                                <h5> Current Schedule </h5>
                                <p>
                                Current assignment of surgeries
                                </p>
                            </Media.Body>
                        </Media>
                    </Button>
                <br></br>
                    <Button variant="primary" type="submit" href="/nomatch" size="lg" block>
                        <Media>
                            <FaHospital size="50"/>
                            <Media.Body>
                                <h5> Ward Rooms </h5>
                                <p>
                                The rooms that are assigned to the ward
                                </p>
                            </Media.Body>
                        </Media>
                    </Button>
                <br></br>
                    <Button variant="primary" type="submit" href="/nomatch" size="lg" block>
                        <Media>
                            <AiOutlineCheckCircle size="50"/>
                            <Media.Body>
                                <h5> Final Approval </h5>
                                <p>
                                Final assignment approval
                                </p>
                            </Media.Body>
                        </Media>
                    </Button>
                </Container>
            </Styles>
        )
    }
}
