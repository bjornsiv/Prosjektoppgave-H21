// Anna 
// Komponenter for siden 'GameDetails'. Her vises detaljer om et valgt spill. 

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBarLink, NavBar, Form, Alert, SearchBar, SignIn, StarRating } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import { gameservice, reviewservice, Game, Review } from './services';



class GameDetails extends Component <{ match: { params: { id: number } } }> {
  reviews: Review[] = [];
  average: number = 0;
  game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
  title: String = this.game.title;

    render() {
        if (!this.game) return null;

        return (
            <div>
                <Card title="Game details">
                  <Row>
                    <Column width={2}>Game title:</Column>
                    <Column>{this.game.title}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Release date:</Column>
                    <Column>{this.game.release_date}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Genre:</Column>
                    <Column>{this.game.genre}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Platforms:</Column>
                    <Column>{this.game.platform}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Description:</Column>
                    <Column>{this.game.description}</Column>
                  </Row>
                </Card>

                <Card title="Average rating:">
                  <Column>
                    <StarRating score={this.average}/>
                  </Column>

                  <Column>
                  <Button.Secondary onClick={() => history.push('/game-review/' + this.game.id)}>Add review</Button.Secondary>
                  </Column>
                </Card>

                <Card title="Game reviews">
                {this.review.map((data, key) => {
                      return (
                          <Card title={data.title} key={key}>
                            <Row>
                              <Column>
                                  {data.title}
                              </Column>
                              <Column>
                                  <StarRating score={data.score}></StarRating>
                              </Column>
                            </Row>
                            <Row>
                              {data.description}
                            </Row>
                          </Card>
                      )
                  })}
                </Card>
             </div>
        );
    }



  mounted(){
      gameservice.get(this.props.match.params.id)
          .then((game) => (this.game = game))
          .catch((error) => Alert.danger('Error getting game: ' + error.message));

      reviewservice.getAll(this.game.id)
          .then((reviews) => {
              this.reviews = reviews;
              this.average = this.reviews.reduce((previous: number, current: Review) => {
                return current.score + previous;
              }, 0) / this.reviews.length;
          })
          .catch((error) => Alert.danger('Error getting reviews: ' + error.message))
  }
}

export default GameDetails;
