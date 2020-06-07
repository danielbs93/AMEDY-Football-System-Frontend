import React from 'react';
import { Form, Col, InputGroup, Button, DropdownButton, DropdownItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faSearch} from '@fortawesome/fontawesome-free-solid'
import styled from 'styled-components';
import { Login } from '../Login';                                     // Login component
import { MatchHomePanel } from './MatchHomePanel';
import { getAllMatches} from '../UserFunctions';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';

var currentLeague;
var currentSeason;
export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            league: 'League Rank 1',
            season: 'S-2020'
        };

        this.onChange = this.onChange.bind(this);
        this.exampleForMatchList = this.exampleForMatchList.bind(this);
        this.searchQuery = this.searchQuery.bind(this);
        this.handleKeyPressForQuery = this.handleKeyPressForQuery.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    changeLeagueLabel(e) {
        document.getElementById("league-home-button").innerText = e.target.innerText;
    }
    
    changeSeasonLabel(e) {
        document.getElementById("season-home-button").innerText = e.target.innerText;
    }
 
    searchQuery() {
        var text = document.getElementById("search-query-text").value;
        if (text == null || text.length == 0) {
          return alert("you must fill the search bar in order to search");
        }
        else {
          //fill this in order to retrieve results
          // return alert("query has not found");
          this.props.history.push(`/NoMatch`);
        }
    }

    handleKeyPressForQuery = (event) => {
      if(event.key === 'Enter'){
        var text = document.getElementById("search-query-text").value;
        if (text == null || text.length == 0) {
          return alert("you must fill the search bar in order to search");
        }
        else {
          //fill this in order to retrieve results
          // return alert("query has not found");
          this.props.history.push(`/NoMatch`);
        }
      }
    }

    exampleForMatchList() {
        var homeTeam1 = 'Barcelona';
        var homeTeam2 = 'Liverpool';
        var homeTeam3 = 'Milan';
        var homeTeam4 = 'Juventus';
        var homeTeam5 = 'Manchester city';
        var homeTeam6 = 'Aresnal';

        var matchDetails1 = '8th Nov, 18:00, Stadium1, 22C';
        var matchDetails2 = '18th Nov, 17:00, Stadium2, 10C';
        var matchDetails3 = '28th Nov, 20:00, Stadium3, 27C';
        var matchDetails4 = '9th Mar, 09:00, Stadium4, 25C';
        var matchDetails5 = '12th Apr, 14:00, Stadium5, 22C';
        var matchDetails6 = '16th Jul, 21:00, Stadium6, 20C';

        var awayTeam1 = 'Real Madrid';
        var awayTeam2 = 'Manchester United';
        var awayTeam3 = 'Dortmond';
        var awayTeam4 = 'Sevilla';
        var awayTeam5 = 'Valnecia';
        var awayTeam6 = 'Napoli';

        var res = {
            HomeTeams: [homeTeam1,homeTeam2,homeTeam3,homeTeam4,homeTeam5,homeTeam6],
            MatchDetails: [matchDetails1,matchDetails2,matchDetails3,matchDetails4,matchDetails5,matchDetails6],
            AwayTeams: [awayTeam1,awayTeam2,awayTeam3,awayTeam4,awayTeam5,awayTeam6],
        }
        return res;
    }

    render() {
        return (
            <Styles>
                <div >
                    <div className="btn-toolbar">
                        <span className="home-btn choose">
                            <DropdownButton variant="outline-success" title="League" id="league-home-button" onChange={this.onChange} >
                                <DropdownItem href="" onClick={(event) => this.changeLeagueLabel(event)} >League Rank 1</DropdownItem>
                                <DropdownItem href="" onClick={(event) => this.changeLeagueLabel(event)}>League Rank 2</DropdownItem>
                                <DropdownItem href="" onClick={(event) => this.changeLeagueLabel(event)}>League Rank 3</DropdownItem>
                            </DropdownButton>
                        </span>
                        <span className="home-btn choose">
                            <DropdownButton variant="outline-success" title="Season" id="season-home-button" onChange={this.onChange}>
                                <DropdownItem href="" onClick={(event) => this.changeSeasonLabel(event)}>S-2020</DropdownItem>
                                <DropdownItem href="" onClick={(event) => this.changeSeasonLabel(event)}>S-2019</DropdownItem>
                                <DropdownItem href="" onClick={(event) => this.changeSeasonLabel(event)}>S-2018</DropdownItem>
                            </DropdownButton>
                        </span>
                        <span className="home-btn">
                            <Button title="Search" className="search-button" onClick={() => this.getAllMatches(this.state.league,this.state.season)}
                            variant="primary" type="submit">Search</Button>
                        </span>
                        <span className="tab" ></span>
                        <span className="home-btn searchBar" style={{display: 'flex', alignItems: 'flex-end'}}>
                            <Form.Row style={{ display: "flex" }}>
                                <Form.Group as={Col}>
                                    <InputGroup className="query-box"
                                        style={{ marginRight: "auto", border: "2px solid #039ea3", borderRadius: '4px' }}>
                                        <InputGroup.Prepend>
                                          <button style={{height: '6.5vh', fontSize: '4vh' }} onClick={() => this.searchQuery()}>
                                                <InputGroup.Text style={{color: 'Dodgerblue', border: 'none', background: 'none'}}>
                                                  <FontAwesomeIcon icon={faSearch} style={{height: '3vh'}}/>
                                                </InputGroup.Text>
                                          </button>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            id='search-query-text'
                                            type="text"
                                            placeholder="Search any key word"
                                            border="none"
                                            style={{height: '6.5vh'}}
                                            onKeyPress={this.handleKeyPressForQuery}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </span>
                    </div>
                    <div class="wrapper">
                    {/* <h1 class="title" data-text="Matches Board">Matches Board</h1> */}
                    Matches Board
                  </div>
                  {/* <div style={{height: '9vh', position: 'center', textAlign: 'center', fontSize: '6vh'}}>⚽⚽⚽</div> */}
                  <center>
                  <div class='ball' style={{align: 'middle', alignSelf: 'center', alignContent: 'center'}}>
                  <div style={{align: 'middle', alignSelf: 'center', alignContent: 'center'}}></div>
                  </div>
                  </center>
                </div>
                {/* <Login history={[]}/> */}
                {/* Send variables to MatchHomePanel by getMatches */}
                <MatchHomePanel data={this.exampleForMatchList()}/>
            </Styles>
        )
        
    }
}

const Styles = styled.div`
  .wrapper {
    font-size: 6rem;
    text-align: center;
    height:20vh;
    line-height: 10vh;
    color: #b8cfb8;
    font-family: 'Niconne', cursive;
    font-weight: 700;
    text-shadow: 5px 5px 0px #0d6b04, 
                10px 10px 0px #138c07, 
                15px 15px 0px #06c468, 
                20px 20px 0px #caf5c6, 
                25px 25px 0px #ffffff, 
                30px 30px 0px #ffffff, 
                35px 35px 0px #ffffff, 
                40px 40px 0px #ffffff, 
                45px 45px 0px #ffffff;
}


  /*--- THE BALL EFFECT ---*/
  @-webkit-keyframes move {
    100% {
      background-position: 92% 0;
    }
    /* my texture isn't perfect */
  }
  @keyframes move {
    100% {
      background-position: 92% 0;
    }
    /* my texture isn't perfect */
  }
  .ball {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-left: auto;
    margin-right: auto;
    position: center;
    perspective: 800px;
    -webkit-perspective: 800px;
  }
  .ball div {
    display: block;
    background: url("data:image/png;base64,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") 0 0 no-repeat;
    background-size: auto 100%;
    box-shadow: -10px -30px 40px -20px inset, 10px 10px 10px white inset, 0 8px 10px -10px, 0 1px 1px 0px #CCC inset;
    width: 70%;
    height: 70%;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    position: relative;
    border-radius: 100%;
    -webkit-animation: 2s move infinite linear;
            animation: 2s move infinite linear;
  }
  .ball::before {
    content: "";
    height: 18px;
    width: 33px;
    position: absolute;
    margin-left: auto;
    margin-right-auto;
    left: 24px;
    bottom: 14px;
    background: #555;
    border-radius: 30%;
    box-shadow: 0 0 20px 10px #000;
    -webkit-transform: rotateX(80deg);
            transform: rotateX(80deg);
  }

    .home-btn {
        padding: 2px;
        margin-right: 5px;
    }

    .search-button {
        background: -webkit-linear-gradient(45deg,black,grey);
        border: 2px solid white;
        border-radius: 8px;
    }
    .search-button:hover {
        background: -webkit-linear-gradient(45deg,grey,black,grey); 
    }

    input{
        border:2px 500 #7fa8eb;
        background-color: transparent;
      }
      
      input:focus,
      select:focus,
      textarea:focus,
      button:focus {
          outline: none;
      }
      
      .fa-user-circle-o{
        color: gray;
      }

      .home-btn.searchBar {
        position: relative;
        display: flex;
      }

      .tab {
        display: flex;
        padding: 0vh 34vh;
      }

      .query-box {
        background-color: none;
        border: 1px solid transparent;
        border-color: #099994;
        -webkit-box-shadow: 0 0 5px #099994;
           -moz-box-shadow: 0 0 5px #099994;
                box-shadow: 0 0 5px #099994;    
    }
      
`;