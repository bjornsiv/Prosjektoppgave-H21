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

    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: new Map<string, boolean>()};
    currentDateValue: string = '';
    newId: Number = 0;
    AvaliableGenres: string[] = [];

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
                        <Form.Date
                            onChange={(event) => (this.currentDateValue = event.currentTarget.value)}
                            value = {this.currentDateValue}
                            placeholder = 'Release Date'
                        >

                        </Form.Date>
                    </Column>
                </Row>
                <Row>
                    <Column width={1}>
                        <Form.Label>Genre:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <form>
                            <Form.Genra 
                                valueList = {this.AvaliableGenres}
                                value={this.game.genre}
                                onChange={(event) => (this.game.genre = event.currentTarget.value)}
                            />
                        </form>
                    </Column>
                </Row>
                <Row>
                    <Column width={1}>
                        <Form.Label>Platform:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <form>
                            
                            {
                                Array.from( this.game.platform ).map(([platform, value]) => {
                                return (
                                <>
                                    <Form.Label>{platform}</Form.Label>
                                    <Form.Checkbox
                                        checked={value}
                                        key={platform}
                                        onChange={(event) => {
                                            this.game.platform.set(platform, event.currentTarget.value == "true");
                                        }
                                        }
                                    />
                                </>
                                );
                            })}
                        </form>
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
                    </Button.Light>
                </Column>
            </Row>
            </Card>
            </>
        );}
    mounted(){
        gameservice.getPlatt()
            .then((data) => (data.map((name) => this.game.platform.set(name, false))))
            .catch((error) => Alert.danger('Error getting plattform: ' + error.message));
        gameservice.getEnum()
            .then((data) => (this.AvaliableGenres = data))
            .catch((error) => Alert.danger('Error getting genre: ' + error.message));
    }
}

export default NewGame;