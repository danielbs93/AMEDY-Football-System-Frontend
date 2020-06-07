import React from 'react'; 
import { Route, Switch, Router } from 'react-router-dom';                       // Need this for the pages routing
import { About } from './components/pages/About';                               // About component

import { Home } from './components/pages/Home';                                 // Home component
import { Referee } from './components/pages/Referee';                           // Referee component
import { RefereeMatches } from './components/pages/RefereeMatches';   
import { RFA } from './components/pages/RFA';                                    // RFA component
import { Fan } from './components/pages/Fan';                                    // Fan component
import { AddLeagueRankPolicyForm } from './components/pages/AddLeagueRankPolicyForm';
import { AddNewMatchAssignmentPolicyForm } from './components/pages/AddNewMatchAssignmentPolicyForm';
import { AddEventToMatch } from './components/pages/AddEventToMatch';
import { AddEventForm } from './components/pages/AddEventForm';
import { UpdateEventPage } from './components/pages/UpdateEventPage';
import { UpdateEventForm } from './components/pages/UpdateEventForm';
import { Login } from './components/Login';
import { AddNewTeam } from './components/pages/AddNewTeam';
import { AddNewPlayerForm } from './components/pages/AddNewPlayerForm';

import { NoMatch } from './components/pages/NoMatch';                           // NoMatch component
import { Layout } from './components/layout/Layout';                            // Layout component
import { NavigationBar } from './components/NavigationBar';                     // Navbar component
import { Jumbotron } from './components/Jumbotron';                             // Jumbotron component
import { Menu } from './components/pages/Menu';                                 // Menu component
import { Register } from './components/pages/Register';                         // Register component
import { Footer } from './components/Footer';
import history from './history';

import 'bootstrap/dist/css/bootstrap.min.css';




class App extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <NavigationBar calssName='navBar'/>
        <Jumbotron/>
        <Layout>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/menu" component={Menu}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/about" component={About}/>

              <Route exact path="/referee" component={Referee}/>
              <Route exact path="/referee/RefereeMatches/AddEventToMatch" component={AddEventToMatch}/>
              <Route exact path="/referee/AddEventForm" component={AddEventForm}/>
              <Route exact path="/referee/RefereeMatches" component={RefereeMatches}/>
              <Route exact path="/referee/UpdateEventPage" component={UpdateEventPage}/>
              <Route exact path="/referee/UpdateEventForm" component={UpdateEventForm}/>
              <Route exact path="/rfa" component={RFA}/>
              <Route exact path="/fan" component={Fan}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/rfa/AddLeagueRankPolicyForm" component={AddLeagueRankPolicyForm}/>
              <Route exact path="/rfa/AddNewMatchAssignmentPolicyForm" component={AddNewMatchAssignmentPolicyForm}/>
              <Route exact path="/rfa/AddNewTeam" component={AddNewTeam}/>
              <Route exact path="/rfa/AddNewPlayerForm" component={AddNewPlayerForm}/>
              <Route exact path="/Login" component={Login}/>

              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Layout>
        <br></br>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;

