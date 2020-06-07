import axios from 'axios'
import { render, wait } from '@testing-library/react';
import React from 'react';
import { Alert } from 'react-bootstrap';
import { ErrorMessage } from 'rsuite';
import { AlertHeading } from 'react-bootstrap/Alert';

// let url = 'http://localhost:8080/'
let url = 'http://132.72.65.123:8080/'

export const addLeagueRankPolicy = rank_policy_to_add =>{
    let param = "test";
    console.log(rank_policy_to_add);
    return axios
    .post(url + 'createLeagueRankPolicy?rfaID=' + rank_policy_to_add.rfa_id + '&policyName=' + rank_policy_to_add.policy_name
     +'&leagueID=' + rank_policy_to_add.chosen_league  +'&winPoints='+rank_policy_to_add.win_points  +'&drawPoints=' + rank_policy_to_add.draw_points +'&losePoints='+ rank_policy_to_add.lose_points)
    .then(res => {
        return res;
    }).catch(err => {
        // console.log('Error: ' + err.resp);
        throw err
        return {
            render() {
                return (
                <Alert variant={'warning'}>Rank policy ${rank_policy_to_add.policy_name} has NOT created - something went wrong</Alert>
                )
            }
        }
    })
}

export const addEventToMatch = event_to_add =>{
    let param = "test";
    console.log(event_to_add);
    return axios
    //TODO: - ADD REFEREE ID first parmeter
    .post(url + 'AddEventToMatch?refereeID='+ event_to_add.referee_id + '&matchID=' + event_to_add.match_id + '&eventType=' + event_to_add.event_type
    +'&gameMinute=' + event_to_add.game_minute + '&playerMakerID=' + event_to_add.player_number + '&description=' + event_to_add.description)
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log('Error: ' + err);
        throw err
    })
}

export const addNewTeam = team_to_add =>{
    console.log(team_to_add);
    return axios
    .post(url + 'createTeam?rfaID=' + team_to_add.rfa_id + '&teamName=' + team_to_add.team_name + '&players=' + team_to_add.players + 
    '&coachID=' + team_to_add.coach + '&leagueID=' + team_to_add.league + '&stadiumID='+ team_to_add.staduim) 
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log(err.response);
        throw err;
    })
}

export const addMatchAssignmentPolicy = policy_to_add =>{
    let param = "test";
    console.log(policy_to_add);
    // const st_time = new Date(rank_policy_to_add.st_time).getTime();
    // console.log(st_time);
    return axios
    .post(url + 'createMatchAssignmentPolicy?rfaID=' + policy_to_add.rfa_id + '&policyName=' + policy_to_add.policy_name
        +'&numberOfGames='+policy_to_add.number_of_games +'&description='+ policy_to_add.policy_description +'&leagueID='+ policy_to_add.chosen_league)
    .then(res => {
        console.log(res.data);
        console.log("success operation - add new match assignment policy");
        return res;
    })
    .catch(err => {
        throw err
    })
}

export const getRefereeMatches = referee_id => {
    return axios
    .post(url + 'viewAssignGames?refereeID=' + referee_id, { 
    })
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => {
        console.log('Error: ' + err.response.data.message);
        // AlertHeading="svsvds";
        throw err;
    })
}


export const getPlayer = player_id => {
    return axios
    .get (url + 'getPlayer?player_id=' + player_id)
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log ('Error ' + err);
        throw err
        return {
            render() {
                return (
                    <Alert variant={'warning'}>Player not found</Alert>
                )
            }
        }
    })
}


export const getAllUnAssignedPlayers = () => {
    return axios
    .get(url + 'getAllUnAssignedPlayers')
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log('Error: ' +err);
        throw err
        return {
            render() {
                return (
                    <Alert variant={'warning'}>Unsuccessfull operation</Alert>
                )
            }
        }
    })
}

export const getAllUnAssignedCoaches = () => {
    return axios
    .get(url + 'getAllUnAssignedCoaches')
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log('Error: ' +err);
        throw err
        return {
            render() {
                return (
                    <Alert variant={'warning'}>Unsuccessfull operation</Alert>
                )
            }
        }
    })
}

export const getAllStadiums = () => {
    return axios
    .get(url + 'getAllStadiums')
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log('Error: ' +err);
        throw err
        return {
            render() {
                return (
                    <Alert variant={'warning'}>Unsuccessfull operation</Alert>
                )
            }
        }
    })
}

export const getTeam = team_name => {
    return axios
    .get(url + 'getTeam?team_name=' + team_name)
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log ('Error ' + err);
        throw err
        return {
            render() {
                return (
                <Alert variant={'warning'}>Team ${team_name} not found</Alert>
                )
            }
        }
    })
}

export const addNewPlayer = player => {
    return axios
    .post (url + 'addNewPlayer', {
        name: player.name,
        playerType: player.player_type,
        birthDate: player.birth_date,
    })
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log('Error ' +err);
        throw err
        return {
            render() {
                return (
                <Alert variant={'warning'}>Player ${player.name} has NOT created - something went wrong</Alert>
                )
            }
        }
    })
}

export const addNewCoach = coach => {
    return axios
    .post (url + 'addNewPlayer', {
        name: coach.name,
        profile_role: 'Coach', 
        role: coach.role,
        qualification: coach.qualification
    })
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch (err => {
        console.log('Error ' + err);
        throw err
        return {
            render() {
                return (
                <Alert variant={'warning'}>Coach ${coach.name} has NOT created - something went wrong</Alert>
                )
            }
        }
    })
}

export const addNewStadium = stadium_name => {
    return axios
    .post (url + 'addNewStadium?stadium_name=' + stadium_name)
    .then (res => {
        console.log (res.data);
        return res;
    })
    .catch (err => {
        console.log ('Error ' + err);
        throw err
        return {
            render() {
                return (
                <Alert variant={'warning'}>stadium ${stadium_name} has NOT created - something went wrong</Alert>
                )
            }
        }
    })
}


export const getAllMatches = (league, season) => {
    return axios
    .get(url + 'getAllMatches', {
    })
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

export const getAllRankPolicies = (league) => {
    return axios
    .get(url + 'getAllRankPolicy', { 
    })
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

export const getAllLeagues = () => {
    return axios
    .get(url + 'getAllLeagues', {
    })
    .then(res => {
        return res
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

export const updateEventToMatch = (referee_id, oldEvent_id, newEvent) => {
    return axios
    .post (url + 'updateEventToMatch?refereeID=' + referee_id + '&oldEventID=' + oldEvent_id + '&eventType=' + newEvent.event_type + '&gameMinute='
    + newEvent.game_minute + '&playerMakerID=' + newEvent.player_number + '&description=' + newEvent.description + '&matchID=' + newEvent.match_id)
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch(err => {
        console.log('Error ' + err);
        throw err
    })
}

export const getMatchEvents = match_id => {
    return axios
    .get(url + 'getAllMatchEvents?matchID=' + match_id)
    .then (res => {
        console.log(res.data);
        return res;
    })
    .catch(err => {
        console.log('Error ' + err);
        throw err
    })
} 

export const getMatchDetails = match_id => {
    return axios
    .post(url + 'getMatch?match_id=' + match_id)
    .then(res => {
        console.log(res.data);
        return res;
    })
    .catch(err => {
        console.log('Error: ' + err)
        throw err
    })
}

export const login = user => {
    console.log(user)
    return axios
    .post(url + 'signin?username=' + user.username +'&password=' + user.password)
    .then(res => {
        localStorage.setItem('profiles', res.data)
        return res.data
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

export const register = new_user => {
    return axios
    .post(url + 'register', { 
        first_name: new_user.first_name,
        last_name: new_user.last_name, 
        email: new_user.email,
        password: new_user.password
    })
    .then(res => {
        return res;
    })
    .catch(err => {
        console.log('Error: ' + err)
        throw err
    })
}

