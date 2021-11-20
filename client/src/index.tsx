// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Column, Row, Button, CardRow } from './widgets';
import axios from 'axios';
import GameReview from './game-review';
import GameDetails  from './game-details';
import {NewGame} from './new-game'
import { createHashHistory } from 'history';
import { Game } from './db-types';
import gameService from './game-service';

const history = createHashHistory();

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
export default class FrontPage extends Component {
  games:Game[] = [];
  
  render() {
      return (
        <>
        <div>
          <Card title="GameRatings.com">Rate top games <Button.Info onClick={() => history.push('/addgame/')}>Add game</Button.Info></Card> 
            
          <div>
            <Card title="">
            <Row>
              <Column>Title</Column>
              <Column>Description</Column>
              <Column>Genre</Column>
              <Column>Platform</Column> 
              <Column width={3} right= {true}></Column>
            </Row>
            </Card>
          {this.games.map((game) => (
            <CardRow key={game.id}>
              <Column>{game.title}</Column>
              <Column>{game.description}</Column>
              <Column>{game.genre}</Column>
              <Column>{game.platform}</Column>
              <Column width={3} right= {true}>
                <Button.Success onClick={() => history.push('/gamedetails/' + game.id)}>See Reviews</Button.Success>
                <Button.Success onClick={() => history.push('/editgame/' + game.id)}>Edit game</Button.Success>
              </Column>
            </CardRow>
          ))}
          </div>
     </div>
     </>
   )
  }
  mounted(){
    gameService.getAll()
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
        <Route path="/gamereview/:id(\d+)" component={GameReview} />
        <Route path="/newgame" component={NewGame}/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );