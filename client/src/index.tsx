// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Column, Row, Button, CardRow, SearchBar } from './widgets';
import axios from 'axios';

import { gameservice, Game } from './services';
import { createHashHistory } from 'history';
import NewGame from './new-game'

import GameReview from './game-review';
import GameDetails  from './game-details';

const history = createHashHistory();

// Meny med link til andre sider - Finn ut hva som skal med her, legg evt. til senere
class Menu extends Component {
  render() {
      return (
          <NavBar brand="">
            <NavBar.Link to="/">(LOGO)</NavBar.Link>
            <NavBar.Link to="/gamereview">REVIEWS</NavBar.Link> 
            <NavBar.Link to="/gamedetails">GAME DETAILS</NavBar.Link>
            <NavBar.Link to="/newgame">ADD GAME</NavBar.Link>
          </NavBar>
                 /*<SearchBar placeholder="">Search for games</SearchBar>*/
      );
  }
}



// Forside - den første siden man kommer inn på 
class FrontPage extends Component {
  games:Game[] = [];
  
  render() {
      console.log(this.games);
      return (
        <>
        <div>
          <Card title="GameRatings"><br></br>Rate new and trending games - or your all time favorites!</Card> 
          <br></br>
          <br></br>
          <br></br>
    
            
          <div>
            <Card title="Popular games right now">
            <br></br>
            <Row>
              <Column>Game title</Column>
              <Column>Description</Column>
              <Column>Genre</Column>
              <Column>Platform</Column> 
              <Column width={6} right= {true}></Column>
            </Row>
            </Card>
          {this.games.map((game) => (
            <CardRow key={game.id}>
              <Column>{game.title}</Column>
              <Column>{game.description}</Column>
              <Column>{game.genre}</Column>
              <Column>{game.platform}</Column>
              <Column width={3} right= {true}>
                <Button.Dark onClick={() => history.push('/gamedetails/' + game.id)}>See Reviews</Button.Dark>
                <Button.Dark onClick={() => history.push('/editgame/' + game.id)}>Edit game</Button.Dark>
              </Column>
            </CardRow>
          ))}
          </div>
     </div>
     </>
   )
  }
  mounted(){
    gameservice.getAll()
    .then((games) => { this.games = games; } )
    .catch((error) => Alert.danger('You got an error: ' + error.message));
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
        <Route path="/gamedetails/:id(\d+)" component={GameDetails} />
        <Route path="/new-review/:id(\d+)" component={GameReview} />
        <Route path="/newgame" component={NewGame}/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );