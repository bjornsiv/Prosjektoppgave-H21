import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
import { createHashHistory } from 'history';
import reviewService from './review-service';
import { Review } from './db-types';

const history = createHashHistory();

class EditReview extends Component<{ match: { params: { id: number } } }> {
   
    constructor(props: any)
    {
      super(props);
      this.state = {id: 0,
          game_id: 0,
          user_id: 1,
          title: 'title',
          description: 'description',
          score: 0,
          created_at: new Date()};
    }
  
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
                    value={this.state.title}
                    onChange={(event) => this.setState({title: event.currentTarget.value})}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={2}>
                  <Form.Label>Description:</Form.Label>
                </Column>
                <Column>
                  <Form.Textarea
                    value={this.state.description}
                    onChange={(event) => this.setState({description: event.currentTarget.value})}
                    rows={10}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={2}>score:</Column>
                <Column>
                  <Form.NumberInput
                    value={this.state.score}
                    min={0}
                    max={5}
                    onChange={(event) => this.setState({score: event.currentTarget.value})}
                  />
                </Column> 
              </Row>
            </Card>
            <Row>
              <Column>
                <Button.Dark
                  onClick={() =>{
                    if(this.state.score > 5){
                      Alert.info('Pick a Score between 0-5')
                    }
                    reviewService
                      .update(new Review(this.state))
                      .then(() => {
                        history.push('/gamedetails/' + this.state.game_id);
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
      reviewService.get(this.props.match.params.id)
        .then((review) => this.setState(review))
        .catch((error) => Alert.danger('Error getting review: ' + error.message))
    }
      
}

export default EditReview;