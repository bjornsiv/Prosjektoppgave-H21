import * as React from 'react';
import { KeyboardEvent } from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBar, Form, Alert, SearchBar, SignIn } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import { gameservice, reviewservice, Game, Review } from './services';

const history = createHashHistory();

export class GameReview extends Component<{ match: { params: { id: number } } }> {

    review: Review[] = [];
    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
    title: String = this.game.title;

    render() {
        return (
            <div>
                <Card title="Reviews"></Card>
                    {this.review.map((data, key) => {
                        return (
                            <Card title={data.title} key={key}>
                                <Column>
                                    <Row>{data.description}</Row>
                                    <Row>{data.score}</Row>
                                    <Row>{data.created_at}</Row>
                                </Column>
                            </Card>
                        )
                    })}
            </div>
            

        );
    }
    mounted(){
        gameservice.get(this.props.match.params.id)
            .then((game) => (this.game = game))
            .catch((error) => Alert.danger('Error getting game: ' + error.message));
        reviewservice.getAll(this.game.id)
            .then((reviews) => {
                this.review.push(reviews)
            })
            .catch((error) => Alert.danger('Error getting reviews: ' + error.message))

    }
}
