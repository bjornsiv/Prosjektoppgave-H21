// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
import axios from 'axios';
import { GameReview } from './game-review';
import GameDetails  from './game-details';


// Meny med link til andre sider - Finn ut hva som skal med her, legg evt. til senere
class Menu extends Component {
  render() {
      return (
          <NavBar brand="Menu">
            <NavBar.Link to="/">Home</NavBar.Link>
            <NavBar.Link to="/gamereview">Reviews</NavBar.Link> 
            <NavBar.Link to="/"></NavBar.Link>
          </NavBar>
      );
  }
}



// Forside - den første siden man kommer inn på 
class FrontPage extends Component {
  render() {
      return (
          <Card title="GameRatings.com">Rate top games</Card> 
          /*<SearchBar placeholder="">Search for games</SearchBar>*/
      );
  }
}



// Definerer stiene til de ulike sidevisningene
const root = document.getElementById('root');
if (root)

ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={FrontPage} />
        <Route path="/gamesearch" />
        <Route path="/gamedetails" component={GameDetails} />
        <Route path="/gamereview" component={GameReview} />
        <Route path="/newgame" />
      </div>
    </HashRouter>,
    document.getElementById('root')
  );