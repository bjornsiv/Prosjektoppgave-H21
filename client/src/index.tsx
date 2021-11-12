// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Column, Row } from './widgets';
import axios from 'axios';
import { GameReview } from './game-review';
import GameDetails  from './game-details';
import { gameservice, Game } from './services';


// Meny med link til andre sider - Finn ut hva som skal med her, legg evt. til senere
class Menu extends Component {
  render() {
      return (
          <NavBar brand="Menu">
            <NavBar.Link to="/">Home/Figur</NavBar.Link>
            <NavBar.Link to="/gamereview">gamereview</NavBar.Link> 
            <NavBar.Link to="/gamedetails">gamedetails</NavBar.Link>
          </NavBar>
                 /*<SearchBar placeholder="">Search for games</SearchBar>*/
      );
  }
}



// Forside - den første siden man kommer inn på 
class FrontPage extends Component {
  games:Game[] = [];
  
  render() {
      return (
        <div>
          <Card title="GameRatings.com">Rate top games</Card> 
          {this.games.map((data, key) => {
            <Row key={key}>
              <Column>{data.title}</Column>
              <Column>{data.description}</Column>
              <Column>{data.genre}</Column>
              <Column>{data.platform}</Column>
            </Row>
          })}
     </div>
   );
  }
  mounted(){
    gameservice.getAll()
    .then((games) => this.games.push(games))
    .catch((error) => Alert.danger('You got an error: ' + error.message));
    console.log(this.games);
  }
}

/* 
<div className="d-flex justify-content-start">
      <div className="p-2 col-example text-left">Flex item 1</div>
      <div className="p-2 col-example text-left">Flex item 2</div>
      <div className="p-2 col-example text-left">Flex item 3</div>

*/


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