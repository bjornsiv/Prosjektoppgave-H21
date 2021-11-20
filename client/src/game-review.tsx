import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert, StarRating } from './widgets';
import { createHashHistory } from 'history';
import gameService from './game-service';
import reviewService from './review-service';
import { Review, Game } from './db-types';

const history = createHashHistory();

export default class GameReview extends Component<{ match: { params: { id: number } } }> {

    review: Review = {id: 0,
        game_id: 0,
        user_id: 1,
        title: '',
        description: '',
        score: 0,
        created_at: new Date()};
    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
    title: String = "Add a new review for ";
    currentStarRating: number = 0;
  
    render() {
        return (
            <>
            <Card title={this.title + this.game.title} >
              <Row>
                <Column width={2}>
                  <Form.Label>Title:</Form.Label>
                </Column>
                <Column>
                  <Form.Input
                    type="text"
                    value={this.review.title}
                    onChange={(event) => (this.review.title = event.currentTarget.value)}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Label>Description:</Form.Label>
                </Column>
                <Column>
                  <Form.Textarea
                    value={this.review.description}
                    onChange={(event) => {
                      this.review.description = event.currentTarget.value;
                    }}
                    rows={10}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={2}>score:</Column>
                <Column>
                  <StarRating
                    value={Number(this.review.score)}
                    edit={true}
                    size={48}
                  />
                </Column> 
              </Row>
            </Card>
            <Row>
              <Column>
                <Button.Dark
                  onClick={() =>{
                    this.review.user_id = 1;
                    this.review.game_id = this.game.id;
                    reviewService
                      .create(this.review)
                      .then(() => {
                        history.push('/gamedetails/' + this.game.id);
                      })}
                  }
                >
                  Save
                </Button.Dark>
              </Column>
            </Row>
          </>
            

        );
    }
    mounted(){
        gameService.get(this.props.match.params.id)
            .then((game) => (this.game = game))
            .catch((error) => Alert.danger('Error getting game: ' + error.message));
            this.review.game_id = this.props.match.params.id
            console.log(this.props.match.params.id);
    }
}
