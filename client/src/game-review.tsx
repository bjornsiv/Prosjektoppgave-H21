import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBar, Form, Alert, SearchBar, SignIn } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import { gameservice, reviewservice, Game, Review } from './services';

const history = createHashHistory();

export class GameReview extends Component<{ match: { params: { id: number } } }> {

    review: Review = {id: 0,
        game_id: 0,
        user_id: 1,
        title: '',
        description: '',
        score: 0,
        created_at: new Date()};
    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
    title: String = this.game.title;

    render() {
        return (
            <>
            <Card title="Add a new review">
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
              </Row>
            </Card>
            <Row>
              <Column>
                <Button.Secondary
                  onClick={() =>
                    reviewservice
                      .create(this.review)
                      .then(() => {
                        history.push('/gamedetails/' + this.game.id);
                      })
                  }
                >
                  Save
                </Button.Secondary>
              </Column>
            </Row>
          </>
            

        );
    }
    mounted(){
        gameservice.get(this.props.match.params.id)
            .then((game) => (this.game = game))
            .catch((error) => Alert.danger('Error getting game: ' + error.message));
    }
}


/*

<Column>
                  <Form.NumberInput
                    value={this.review.score}
                    //onChange={(event) => (this.review.score = event.currentTarget.value)}
                  />
                </Column>

*/ 