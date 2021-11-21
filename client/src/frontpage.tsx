import React from 'react';
import { Component } from 'react-simplified';
import { NavBar, Button, Alert, Card, CardRow, Column, Row, SearchBar, AutoColumn, Form } from './widgets';
import { createHashHistory } from 'history';

import { Game, Review } from './db-types';
import gameService from './game-service';
import reviewService from './review-service';

const history = createHashHistory();

// Forside - den første siden man kommer inn på
export default class FrontPage extends Component {
  games: {game: Game, avgReview: number}[] = [];
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
  sortGames = () => {
    this.games.sort(
      (first: {game: Game, avgReview: number}, second: {game: Game, avgReview: number}) => {
        // The following line uses dynamic typing to create a common comparison operator for strings, dates, and numbers. 
        // Disable warning about [] operator not being appliccable to class.
        // @ts-ignore: Ignore error for duck typing
        const first_val = this.sortKey == "review" ? first.avgReview : first.game[this.sortKey];
        // @ts-ignore: Ignore error for duck typing
        const second_val = this.sortKey == "review" ? second.avgReview : second.game[this.sortKey];
        return Number(this.sortOrder) * this.compare(first_val, second_val);
      }
    );
  }
  
  render() {
    return (
      <>
        <div>
          <div>
            <Card title="Popular games right now">
              <br></br>
              <Row>
                <Column></Column>
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
                            this.sortGames();
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
                            this.sortGames();
                        }
                    }
                />
                </AutoColumn>
              </Row>
            </Card>
            {this.games.map((game: {game: Game, avgReview: number}) => (
              <CardRow key={game.game.id}>
                <Column>{game.game.title}</Column>
                <AutoColumn right={true}>
                    <Form.StarRating edit={false} value={game.avgReview} size={16} label="Average rating" onChange={undefined}/>
                </AutoColumn>
                <AutoColumn right={true}>
                  <Button.Dark onClick={() => history.push('/gamedetails/' + game.game.id)}>
                    More info
                  </Button.Dark>
                </AutoColumn>
              </CardRow>
            ))}
          </div>
        </div>
      </>
    );
  }
  mounted() {
    this.sortOptions = Object.keys(new Game())
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
    this.sortOptions.push({name: "Review", value: "review"});
      
    gameService
      .getAll()
      .then((games) => {
        this.games = [];
        games.map(
            (game) => {                
                reviewService
                .search(game.id)
                .then((reviews) => {
                    var avg = 0;
                    if (reviews.length > 0)
                    {
                        avg = reviews.reduce((previous: number, current: Review) => current.score + previous, 0) / reviews.length
                    }
                    this.games.push(
                        {
                            avgReview: avg,
                            game: game
                        }
                    );
                })
                .catch((error) => Alert.danger('Error getting reviews: ' + error.message));
            }
        )
      })
      .catch((error) => Alert.danger('You got an error: ' + error.message));
  }
}
