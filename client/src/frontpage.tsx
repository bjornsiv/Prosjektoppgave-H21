import React, { Component } from 'react';
import { NavBar, Button, Alert, Card, CardRow, Column, Row, SearchBar } from './widgets';
import { createHashHistory } from 'history';

import { Game } from './db-types';
import gameService from './game-service';

const history = createHashHistory();

// Forside - den første siden man kommer inn på
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

export default FrontPage;