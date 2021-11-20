// Anna 
// Komponenter for siden 'GameDetails'. Her vises detaljer om et valgt spill. 

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, StarRating } from './widgets';
import { createHashHistory } from 'history';
import { Review, Game } from './db-types';
import gameService from './game-service';
import reviewService from './review-service';

const history = createHashHistory();

class GameDetails extends Component <{ match: { params: { id: number } } }> {
  reviews: Review[] = [];
  average: number = 0;
  game: Game = {id: 0, title: '', description: '', release_date: new Date(500000000000), genre: '', platform: ''};
  title: String = this.game.title;
  stringDate: string = '';
  
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
                    <Column>{this.stringDate}</Column>
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
                    <StarRating value={this.average} edit={false} size={26}/>

                  </Column>

                  <Column right={true}>
                  <Button.Dark onClick={() => history.push('/new-review/' + this.game.id)}>Add review</Button.Dark>
                  <Button.Dark onClick={() => history.push('/editgame/' + this.game.id)}>
                    Edit game
                  </Button.Dark>
                  </Column>
                </Card>

                <Card title="Game reviews">
                {this.reviews.map((review) => {
                      return (
                          <Card title={review.title} key={review.id}>
                            <Row>
                              <Row></Row>
                              <Column>
                                  <StarRating edit={false} value={review.score} size={16}/>

                              </Column>
                            </Row>
                            <Row>
                              {review.description}
                            </Row>
                            <Column right={true}>
                              <Button.Dark
                                onClick={() => {
                                  history.push('/editreview/' + review.id);
                                }}
                              >
                                Edit
                              </Button.Dark>
                              <Button.Danger
                                onClick={() => {
                                  reviewService.delete(review.id)
                                  history.push('/gamereview/' + review.id)
                                }}
                              >
                                Delete
                              </Button.Danger>
                            </Column>
                          </Card>
                      )
                  })}
                </Card>
             </div>
        );
    }



  mounted(){
      gameService.get(this.props.match.params.id)
          .then((game) => {
            this.game = game
            this.stringDate = this.game.release_date.getDay() + '.' + this.game.release_date.getMonth() + '.' + this.game.release_date.getFullYear();
          })
          .catch((error) => Alert.danger('Error getting game: ' + error.message));
      
      reviewService.search(this.props.match.params.id)
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
