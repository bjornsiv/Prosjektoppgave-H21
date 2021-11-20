import * as React from 'react';
import { KeyboardEvent } from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBarLink, NavBar, Form, Alert } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import gameService from './game-service';
import { Game } from './db-types';

const history = createHashHistory();


/* 

FORSLAG/IDÉER
- Genre: Endre fra Form.Input til at man kan velge fra en liste med besteme genres og platforms?
- Legge til sjekk slik at man ikke kan legge til spill som allerede eksisterer?

- FIKS FEIL MED Release date: onChange={(event) => (this.game.release_date...)

*/


export class NewGame extends Component {

    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
    title: String = this.game.title;
   

    render() {
        return (
            <>
            <Card title="Add new game">
                <Row>
                    <Column width={1}>
                        <Form.Label>Title:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Input 
                            type="text"
                            value={this.game.title}
                            onChange={(event) => (this.game.title = event.currentTarget.value)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column width={1}>
                        <Form.Label>Released:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Input 
                            type="date"
                            value="1950-01-01"
                            onChange={(event) => (this.game.release_date = new Date(event.currentTarget.value))}/>
                    </Column>
                </Row>
                <Row>
                    <Column width={1}>
                        <Form.Label>Genre:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Input 
                            type="text"
                            value={this.game.genre}
                            onChange={(event) => (this.game.genre = event.currentTarget.value)}/>
                    </Column>
                </Row>
                <Row>
                    <Column width={1}>
                        <Form.Label>Platform:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Input 
                            type="text"
                            value={this.game.platform}
                            onChange={(event) => (this.game.platform = event.currentTarget.value)}/>
                    </Column>
                </Row>
                <Row>
                    <Column width={1}>
                        <Form.Label>Description:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Textarea 
                            value={this.game.description}
                            onChange={(event) => (this.game.description = event.currentTarget.value)}/>
                    </Column>
                </Row>
            <Row>
                <Column>
                    <Button.Light 
                        onClick={() =>
                            gameService
                            .create(this.game)
                            .then((id: number) => {
                                history.push('/gamedetails/' + id);
                            })
                        }
                        >
                    Add game
                    </Button.Light>
                </Column>
            </Row>
            </Card>
            </>
        );
    }
}
