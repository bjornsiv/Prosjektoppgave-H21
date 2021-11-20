// Anna
// Komponenter for siden 'GameDetails'. Her vises detaljer om et valgt spill.

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, StarRating, Form } from './widgets';
import { createHashHistory } from 'history';
import { Review, Game } from './db-types';
import gameService from './game-service';
import reviewService from './review-service';

const history = createHashHistory();

class GameDetails extends Component<{ match: { params: { id: number } } }> {
  reviews: Review[] = [];
  average: number = 0;
  game: Game = new Game();
  title: String = this.game.title;
  stringDate: string = '';
  sortOptions: {name: string, value: string}[] = [];

  state = { sortOrder: '1', sortKey: 'title'};

  compare = ( first: any, second: any ) => {
    if ( first < second ){
      return 1;
    }
    if ( first > second ){
      return -1;
    }
    return 0;
  }
  sortReviews = () => {
    this.reviews.sort(
      (first: Review, second: Review) => {
        return Number(this.state.sortOrder) * this.compare(first[this.state.sortKey], second[this.state.sortKey]);
      }
    );
  }

  render() {
    if (!this.game) return null;
    this.sortReviews();
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
            <StarRating value={this.average} edit={false} size={26} />
          </Column>

          <Column right={true}>
            <Button.Dark onClick={() => history.push('/new-review/' + this.game.id)}>
              Add review
            </Button.Dark>
            <Button.Dark onClick={() => history.push('/editgame/' + this.game.id)}>
              Edit game
            </Button.Dark>
          </Column>
        </Card>

        <Card title="">
          <Row>
            <Column  width={4} >
              <p className="card-title">Game reviews</p>
            </Column>
            <Column width={4} right={true}>
                <Form.Label>Order by:</Form.Label>
            </Column>
            <Column right={true}>
              <Form.SelectDropDown
                value={this.state.sortKey}
                valueList={this.sortOptions}
                onChange={
                  (event) => {
                    this.setState({sortKey: event.currentTarget.value});
                  }
                }
              />
            </Column>
            <Column right={true}>
              <Form.SelectDropDown
                value={this.state.sortOrder}
                valueList={[{name: "Ascending", value: "1"}, {name: "Descending", value: "-1"}]}
                onChange={
                  (event) => {
                    this.setState({sortOrder:  event.currentTarget.value});
                  }
                }
              />
            </Column>
          </Row>
          <Row>
            {this.reviews.map((review) => {
              return (
                <Card title={review.title} key={review.id}>
                  <Row>
                    <Row/>
                    <Column>
                      <StarRating edit={false} value={review.score} size={16} />
                    </Column>
                  </Row>
                  <Row>{review.description}</Row>
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
                        reviewService.delete(review.id);
                        history.push('/gamereview/' + review.id);
                      }}
                    >
                      Delete
                    </Button.Danger>
                  </Column>
                </Card>
              );
            })}
          </Row>
        </Card>
      </div>
    );
  }

  mounted() {
    this.sortOptions = Object.keys(new Review())
      .filter((id) => !id.includes("id"))
      .map((id) => { return {name: id.replace("_", " "), value: id }})
      .map(
        (property) => { 
          return {
            name: property.name.charAt(0).toUpperCase() + property.name.slice(1),
            value: property.value
          }
        }
      );

    gameService
      .get(this.props.match.params.id)
      .then((game) => {
        this.game = game;
        this.stringDate =
          this.game.release_date.getDay() +
          '.' +
          this.game.release_date.getMonth() +
          '.' +
          this.game.release_date.getFullYear();
      })
      .catch((error) => Alert.danger('Error getting game: ' + error.message));

    reviewService
      .search(this.props.match.params.id)
      .then((reviews) => {
        this.reviews = reviews;
        this.average =
          this.reviews.reduce((previous: number, current: Review) => {
            return current.score + previous;
          }, 0) / this.reviews.length;
      })
      .catch((error) => Alert.danger('Error getting reviews: ' + error.message));
  }
}

export default GameDetails;
