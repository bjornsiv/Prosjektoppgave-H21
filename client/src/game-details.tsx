// Anna 
// Komponenter for siden 'GameDetails'. Her vises detaljer om et valgt spill. 

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, StarRating } from './widgets';
import { createHashHistory } from 'history';
import { gameservice, reviewservice, Game, Review } from './services';

const history = createHashHistory();

class GameDetails extends Component <{ match: { params: { id: number } } }> {
  reviews: Review[] = [];
  average: number = 0;
  game: Game = {id: 0, title: '', description: '', release_date: new Date(500000000000), genre: '', platform: new Map<string, boolean>()};
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
                    <Column>{this.game.release_date?.toString()}</Column>
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
                    <StarRating value={this.average} edit={false}/>

                  </Column>

                  <Column>
                  <Button.Dark onClick={() => history.push('/game-review/' + this.game.id)}>Add review</Button.Dark>
                  </Column>
                </Card>

                <Card title="Game reviews">
                {this.reviews.map((review) => {
                      return (
                          <Card title={review.title} key={review.id}>
                            <Row>
                              <Row></Row>
                              <Column>
                                  <StarRating edit={false} value={review.score}/>

                              </Column>
                            </Row>
                            <Row>
                              {review.description}
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

      reviewservice.getAll(this.props.match.params.id)
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
