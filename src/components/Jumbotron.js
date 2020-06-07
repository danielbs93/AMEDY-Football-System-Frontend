import React from 'react';
import { Jumbotron as Jumbo, Container ,Table, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import background from '../assets/backgroundHome.jpg';

const Styles = styled.div`
    .jumbo { 
        background: url(${background}) top;
        background-size: cover;
        color: #efefef;
        height: 150px;
        position: relative;
        z-index: -2;
    }

    .overlay {
        background-color: #0009;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

export const Jumbotron = () => (
    <Styles>
        <Jumbo className="jumbo">
        <div className="overlay"></div>
        <h1  style={{fontFamily: 'Impact' }}>AMEDY </h1>
        <h5 style={{fontFamily: 'Impact' }}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Football Information and Reccomandation System </h5>
        </Jumbo>
    </Styles>
)