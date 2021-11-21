// Anna
// Komponenter for siden 'GameDetails'. Her vises detaljer om et valgt spill.

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Alert, Form, AutoColumn } from './widgets';
import { createHashHistory } from 'history';
import { Review, Game, ReviewEvaluation } from './db-types';
import gameService from './game-service';
import reviewService from './review-service'; 
import reviewEvalService from './review-eval-service';

const history = createHashHistory();

type ReviewData = { review: Review; evaluations: ReviewEvaluation[] };

class GameDetails extends Component<{ match: { params: { id: number } } }> {
  reviews: ReviewData[] = [];
  average: number = 0;
  game: Game = new Game();
  title: String = this.game.title;
  stringDate: string = '';
  sortOptions: { name: string; value: string }[] = [];
  sortOrder: string = '1';
  sortKey: string = 'title';

  compare = (first: any, second: any) => {
    if (typeof(first) === 'string') {
      return first.localeCompare(second);
    }
    else{
      if (first < second) {
        return 1;
      }
      if (first > second) {
        return -1;
      }
      return 0;
    }
  };
  sortReviews = () => {
    this.reviews.sort((first: ReviewData, second: ReviewData) => {
      // The following line uses dynamic typing to create a common comparison operator for strings, dates, and numbers.
      // Disable warning about [] operator not being appliccable to class.
      // @ts-ignore: Ignore error for duck typing
      const first_val = this.sortKey == 'evaluation' ? first.evaluations.length : first.review[this.sortKey];
      // @ts-ignore: Ignore error for duck typing
      const second_val = this.sortKey == 'evaluation' ? second.evaluations.length : second.review[this.sortKey];

      return Number(this.sortOrder) * this.compare(first_val, second_val);
    });
  };

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
            <Column>{this.game.platform.replace(/,/g, ', ')}</Column>
          </Row>
          <Row>
            <Column width={2}>Description:</Column>
            <Column>{this.game.description}</Column>
          </Row>
        </Card>
        <Card title="Average rating:">
          <Column>
            <Form.StarRating
              edit={false}
              value={this.average}
              size={26}
              label="Average rating"
              onChange={undefined}
            />
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
            <AutoColumn right={true}>
              <Form.Label>Order by:</Form.Label>
            </AutoColumn>
            <AutoColumn right={true}>
              <Form.SelectDropDown
                value={this.sortKey}
                valueList={this.sortOptions}
                onChange={(event) => {
                  this.sortKey = event.currentTarget.value;
                  this.sortReviews();
                }}
              />
            </AutoColumn>
            <AutoColumn right={true}>
              <Form.SelectDropDown
                value={this.sortOrder}
                valueList={[
                  { name: 'Ascending', value: '1' },
                  { name: 'Descending', value: '-1' },
                ]}
                onChange={(event) => {
                  this.sortOrder = event.currentTarget.value;
                  this.sortReviews();
                }}
              />
            </AutoColumn>
          </Row>
          <Row>
            {this.reviews.map((reviewData) => {
              return (
                <Card title={reviewData.review.title} key={reviewData.review.id}>
                  <Row>
                    <Column />
                    <Column right={true}>
                      <Form.StarRating
                        edit={false}
                        label="Game rating"
                        value={reviewData.review.score}
                        size={undefined}
                        onChange={undefined}
                      />
                    </Column>
                  </Row>
                  <Row>{reviewData.review.description}</Row>
                  <Row>
                    <AutoColumn>
                      <Form.EvalButtons 
                        size={16}
                        value={reviewData.evaluations.length}
                        label="Review evaluation"
                        onClickUp={
                          () => {
                            reviewEvalService
                              .post(reviewData.review.id, 1).catch((error) => Alert.warning("User has already evaluated this review."))
                              .then(() => reviewEvalService.get(reviewData.review.id))
                              .then((evals) => (reviewData.evaluations = evals));
                          }
                        }
                        onClickDown={
                          () => {
                            reviewEvalService
                              .get(reviewData.review.id)
                              .then((evals) => reviewEvalService.delete(evals[0].id).catch((_error) => {}))
                               .then(() => reviewEvalService.get(reviewData.review.id))
                              .then((evals) => (reviewData.evaluations = evals));
                          }
                        }
                      />
                    </AutoColumn>
                    <Column right={true}>
                      <Button.Dark
                        onClick={() => {
                          history.push('/editreview/' + reviewData.review.id);
                        }}
                      >
                        Edit
                      </Button.Dark>
                    </Column>
                  </Row>
                </Card>
              );
            })}
          </Row>
        </Card>
      </div>
    );
  }

  mounted() {
    
    this.sortOptions = [{name: "Most useful", value: "evaluation"}];
    this.sortOptions.push(
      ...Object.keys(new Review())
      .filter((id) => !id.includes('id'))
      .map((id) => {return { name: id.replace('_', ' '), value: id };})
      .map(
        (property) => {
          return {
            name: property.name.charAt(0).toUpperCase() + property.name.slice(1),
            value: property.value,
          };
        }
      )
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
        this.reviews = [];
        this.average =
          reviews.reduce((previous: number, current: Review) => {
            return current.score + previous;
          }, 0) / this.reviews.length;
        reviews.map((review) => {
          reviewEvalService.get(review.id).then((evaluations) => {
            this.reviews.push({
              review: review,
              evaluations: evaluations,
            });
            // When we have pushed the last review, sort the list according to settings.
            if (this.reviews.length == reviews.length) {
              this.sortReviews();
            }
          });
        });
      })
      .catch((error) => Alert.danger('Error getting reviews: ' + error.message));
  }
}

export default GameDetails;
