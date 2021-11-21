import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
import { createHashHistory } from 'history';
import gameService from './game-service';
import reviewService from './review-service';
import { Review, Game } from './db-types';

const history = createHashHistory();

export default class GameReview extends Component<{ match: { params: { id: number } } }> {

    review: Review = new Review({id: 0,
        game_id: 0,
        user_id: 1,
        title: '',
        description: '',
        score: 0,
        created_at: new Date()});
    game: Game = new Game({id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''});
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
                <Column width={2}>Score:</Column>
                <Column>
                  <Form.StarRating
                    value={this.review.score}
                    edit={true}
                    label="Game rating"
                    size={28}
                    onChange={(event, value) => {
                      this.review.score = value;
                    }}
                  />
                </Column> 
              </Row>
            </Card>
            <Row>
              <Column>
                <Button.Dark
                  onClick={() =>{
                    if(this.review.score > 5){
                      Alert.info('Pick a Score between 0-5')
                    }
                    reviewService
                      .create(this.review)
                      .then(() => {
                        history.push('/gamedetails/' + this.game.id);
                      })}
                  }
                >
                  Publish
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
            this.review.game_id = this.props.match.params.id;
            this.review.user_id = 1;
            console.log(this.props.match.params.id);
    }
}
