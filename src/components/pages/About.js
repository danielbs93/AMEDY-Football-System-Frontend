import React from 'react';
import styled from 'styled-components';


const Styles = styled.div`
    .overlay {
        position: absolute;
        top: 10px;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }

    h2, h5 {
        display: inline;
    }
    h2 {
        color: purple;
    }
    h5 {
        color: black;
    }
`;

export const About = () => (
    <Styles>
        <div>
            <h2 style={{color: "black", textDecoration: "underline"}}>About Page</h2>  

            <br></br><br></br>
            <h1 style={{textDecoration: "underline"}}>AMEDY System </h1>
                <h2>A<h5>viv Amsalem  </h5></h2>
                <h2>M<h5>ichal Talmor  </h5></h2>
                <h2>E<h5>ran Toutian  </h5></h2>
                <h2>D<h5>aniel Ben-Simon  </h5></h2>
                <h2>Y<h5>arden Curiel</h5></h2><br></br> <br></br> 
            <p>
        
                We are third year students of Software and Information Systems Engineering, Ben-Gurion University, Israel.

                In this project...
            </p>
        </div>
    </Styles>
)
