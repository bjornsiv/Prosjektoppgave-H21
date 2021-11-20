// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Column, Row, Button, CardRow, SearchBar } from './widgets';

import { createHashHistory } from 'history';
import NewGame from './new-game';
import EditGame from './edit-game';
import GameReview from './game-review';
import GameDetails  from './game-details';
import GameSearch from './game-search';
// import FrontPage from './frontpage';

import { Game } from './db-types';
import gameService from './game-service';
const history = createHashHistory();

class FrontPage extends Component {
  games: Game[] = [];
  searchQuery: string = '';

  manageSearch() {
    history.push('/gamesearch/' + this.searchQuery);
  }

  render() {
    return (
      <>
        <div>
          <Card title="GameRatings">
            <Column right={true} width={100}>
              <SearchBar
                value={this.searchQuery}
                onClick={() => this.manageSearch()}
                onChange={(event) => {this.searchQuery = event.currentTarget.value}}
              ></SearchBar>
              <NavBar.Link to="/newgame">ADD GAME</NavBar.Link>
            </Column>
            Rate new and trending games - or your all time favorites!
          </Card>

          <div>
            <Card title="Popular games right now">
              <br></br>
              <Row>
                <Column>Game title</Column>
                <Column>Description</Column>
                <Column>Genre</Column>
                <Column>Platform</Column>
                <Column width={3} right={true}></Column>
              </Row>
            </Card>
            {this.games.map((game) => (
              <CardRow key={game.id}>
                <Column>{game.title}</Column>
                <Column>{game.description}</Column>
                <Column>{game.genre}</Column>
                <Column>{game.platform}</Column>
                <Column width={3} right={true}>
                  <Button.Dark onClick={() => history.push('/gamedetails/' + game.id)}>
                    See Reviews
                  </Button.Dark>
                  <Button.Dark onClick={() => history.push('/editgame/' + game.id)}>
                    Edit game
                  </Button.Dark>
                </Column>
              </CardRow>
            ))}
          </div>
        </div>
      </>
    );
  }
  mounted() {
    gameService
      .getAll()
      .then((game) => {
        this.games = game;
      })
      .catch((error) => Alert.danger('You got an error: ' + error.message));
  }
}


// Meny med link til andre sider - Finn ut hva som skal med her, legg evt. til senere
class Menu extends Component {
  
  render() {
      return (
          <>
            <NavBar brand="">
              <NavBar.Link to="/"><img src="https://www.favicon.cc/logo3d/229133.png"></img></NavBar.Link>
            </NavBar>
          </>
                 /*<SearchBar placeholder="">Search for games</SearchBar>*/
      );
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
        <Route path="/gamesearch/:query" component={GameSearch}/>
        <Route path="/gamedetails/:id(\d+)" component={GameDetails} />
        <Route path="/new-review/:id(\d+)" component={GameReview} />
        <Route path="/newgame" component={NewGame}/>
        <Route path="/editgame/:id(\d+)" component={EditGame}/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );