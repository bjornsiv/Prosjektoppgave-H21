import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
import { createHashHistory } from 'history';
import { Game, gameservice } from './services';
/*
import DatePicker from 'sassy-datepicker';

{visible ? (
    <DatePicker 
        onChange={this.handleChange}
        minDate={new Date(1980, 10, 16)} 
    />
    ): null}


const [visible, setVisible] = React.useState(false);
const [date, setDate] = React.useState(new Date());
*/
const history = createHashHistory();
/* 

FORSLAG/IDÉER
- Genre: Endre fra Form.Input til at man kan velge fra en liste med besteme genres og platforms?
- Legge til sjekk slik at man ikke kan legge til spill som allerede eksisterer?

- FIKS FEIL MED Release date: onChange={(event) => (this.game.release_date...)

*/

class NewGame extends Component {

    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
    currentDateValue: string = '';
    newId: Number = 0;
    AvaliableGenra: string[] = []

    render() {
        return (
            <>
            <Card title="Add new game">
                <br></br> <br></br> <br></br>
                <Row>
                    <Column width={2}>
                        <Form.Label>Game title:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Input 
                            type="text"
                            placeholder="Add title"
                            value={this.game.title}
                            onChange={(event) => (this.game.title = event.currentTarget.value)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Label>Release date:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Date
                            onChange={(event) => (this.currentDateValue = event.currentTarget.value)}
                            value = {this.currentDateValue}
                            placeholder = 'Release Date'
                        >

                        </Form.Date>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Label>Genre:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Genra 
                            valueList = {this.AvaliableGenra}
                            value={this.game.genre}
                            onChange={(event) => (this.game.genre = event.currentTarget.value)}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Label>Platform:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Input 
                            type="text"
                            placeholder="Available on..."
                            value={this.game.platform}
                            onChange={(event) => (this.game.platform = event.currentTarget.value)}/>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Label>Description:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <Form.Textarea 
                            placeholder="Describe the game"
                            value={this.game.description}
                            onChange={(event) => (this.game.description = event.currentTarget.value)}/>
                            <br></br><br></br><br></br>
                    </Column>
                </Row>
            <Row>
                <Column>

                    <Button.Dark 
                        onClick={() => {
                            this.game.release_date = new Date(this.currentDateValue);
                            console.log(this.game)
                                 
                            gameservice
                            .create(this.game)
                            .then((game) => {
                                this.newId = game;
                                history.push('/gamedetails/' + this.newId);
                            }).catch((error) => Alert.danger('Error ' + error.message))
                        }
                    }
                        >
                    Add game
                    </Button.Dark >
                </Column>
            </Row>
            </Card>
            </>
        );
    }
    mounted(){
        gameservice.getEnum()
          .then((data) => (this.AvaliableGenra = data))
          .catch((error) => Alert.danger('Error getting genre: ' + error.message));
    }
}

export default NewGame;