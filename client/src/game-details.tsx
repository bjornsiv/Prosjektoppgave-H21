// Anna
// Komponenter for siden 'GameDetails'. Her vises detaljer om et valgt spill.

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, Form, AutoColumn } from './widgets';
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
  sortOrder:string = '1';
  sortKey:string = 'title';

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
        // The following line uses dynamic typing to create a common comparison operator for strings, dates, and numbers. 
        // Disable warning about [] operator not being appliccable to class.
        // @ts-ignore: Ignore error for duck typing
        return Number(this.sortOrder) * this.compare(first[this.sortKey], second[this.sortKey]);
      }
    );
  }

  render() {
    if (!this.game) return null;
    return (
      <div>
        <Card title={this.game.title}>
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
            <Form.StarRating edit={false} value={this.average} size={26} label="Average rating" onChange={undefined}/>
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
            <Column>
              <p className="card-title">Game reviews</p>
            </Column>
            <AutoColumn right={true} >
                <Form.Label>Order by:</Form.Label>
            </AutoColumn>
            <AutoColumn right={true}>
              <Form.SelectDropDown
                value={this.sortKey}
                valueList={this.sortOptions}
                onChange={
                  (event) => {
                    this.sortKey = event.currentTarget.value;
                    this.sortReviews();
                  }
                }
              />
            </AutoColumn>
            <AutoColumn right={true}>
              <Form.SelectDropDown
                value={this.sortOrder}
                valueList={[{name: "Ascending", value: "1"}, {name: "Descending", value: "-1"}]}
                onChange={
                  (event) => {
                    this.sortOrder = event.currentTarget.value;
                    this.sortReviews();
                  }
                }
              />
            </AutoColumn>
          </Row>
          <Row>
            {this.reviews.map((review) => {
              return (
                <Card title={review.title} key={review.id}>
                  <Row>
                    <Column/>
                    <Column right={true}>
                      <Form.StarRating edit={false} label="Game rating" value={review.score} size={undefined} onChange={undefined}/>
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
                        history.go(0);
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
