// Komponenter for siden 'GameSearch'

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, CardRow} from './widgets';
import { gameservice, Game } from './services';
import { createHashHistory } from 'history';


const history = createHashHistory();


class GameSearch extends Component <{ match: { params: { query: string } } }>{
  games: Game[] = [];
  render() {
    return (
      <>

      <div>
            <Card title="Search Reaults">
            <br></br>
            <Row>
              <Column>Game title</Column>
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
                <Button.Dark onClick={() => history.push('/gamedetails/' + game.id)}>See Reviews</Button.Dark>
                <Button.Dark onClick={() => history.push('/editgame/' + game.id)}>Edit game</Button.Dark>
              </Column>
            </CardRow>
          ))}
          </div>
      </>
    );
  }
  mounted(){
    gameservice.search(this.props.match.params.query)
          .then((game) => { this.games = game; } )
          .catch((error) => Alert.danger('Error getting game: ' + error.message));
  }
}

export default GameSearch;