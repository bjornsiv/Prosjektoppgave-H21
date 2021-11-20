import React from 'react';
import { Component } from 'react-simplified';
import { NavBar, Button, Alert, Card, CardRow, Column, Row, SearchBar } from './widgets';
import { createHashHistory } from 'history';

import { Game } from './db-types';
import gameService from './game-service';

const history = createHashHistory();

// Forside - den første siden man kommer inn på
export default class FrontPage extends Component {
    constructor(props: any)
    {
        super(props);
        this.state = {
            games: []
        }
    }
  


  render() {
    return (
      <>
        <div>
          

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
            {this.state.games.map((game: Game) => (
              <CardRow key={game.id}>
                <Column>{game.title}</Column>
                <Column>{game.description}</Column>
                <Column>{game.genre}</Column>
                <Column>{game.platform}</Column>
                <Column width={3} right={true}>
                  <Button.Dark onClick={() => history.push('/gamedetails/' + game.id)}>
                    See Reviews
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
      .then((games) => {
        this.setState({games: games});
      })
      .catch((error) => Alert.danger('You got an error: ' + error.message));
  }
}
