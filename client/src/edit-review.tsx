import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
import { createHashHistory } from 'history';
import reviewService from './review-service';
import { Review } from './db-types';

const history = createHashHistory();

class EditReview extends Component<{ match: { params: { id: number } } }> {
  review: Review = new Review(
    {
      id: 0,
      game_id: 0,
      user_id: 1,
      title: 'title',
      description: 'description',
      score: 0,
      created_at: new Date()
    }
  );
  //  constructor(props: any)
  //  {
  //    super(props);
  //    this.state = {
  //      review: 
  //        new Review(
  //          {
  //            id: 0,
  //            game_id: 0,
  //            user_id: 1,
  //            title: 'title',
  //            description: 'description',
  //            score: 0,
  //            created_at: new Date()
  //          }
  //        )
  //      };
  //  }
  
    render() {
        return (
            <>
            <Card title={"Edit a review"} >
              <Row>
                <Column width={2}>
                  <Form.Label>Title:</Form.Label>
                </Column>
                <Column>
                  <Form.Input
                    type="text"
                    placeholder="Add title"
                    value={this.review.title}
                    onChange={(event) => this.review.title = event.currentTarget.value}
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
                    onChange={(event) => this.review.description = event.currentTarget.value}
                    rows={10}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={2}>score:</Column>
                <Column>
                  <Form.NumberInput
                    value={this.review.score}
                    min={0}
                    max={5}
                    onChange={(event) => this.review.score = Number(event.currentTarget.value)}
                  />
                </Column> 
              </Row>
            </Card>
          </>
        );
    }
    mounted(){
      reviewService.get(this.props.match.params.id)
        .then((review) => this.review = review)
        .catch((error) => Alert.danger('Error getting review: ' + error.message))
    }
      
}

export default EditReview;


/*

*/