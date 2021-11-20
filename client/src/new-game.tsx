import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
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

//const checked = React.useState(true);
//const setChecked = React.useState(true);
//  
//const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//    setChecked(event.target.checked);
//};

export default class NewGame extends Component {

    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: '', platform: ''};
    title: String = this.game.title;
    AvaliableGenres: string[] = [];
    AvaliablePlatform: string[] = []
   

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
                            onChange={(event) => (this.game.release_date = new Date(event.currentTarget.value))}
                            value = {this.game.release_date}
                            placeholder = 'Release Date'
                        />
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Label>Genre:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <form>
                            <Form.Genra 
                                valueList = {this.AvaliableGenres}
                                value={this.game.genre}
                                onChange={(event) => {
                                    this.game.genre = event.currentTarget.value
                                    console.log('Value: ' + event.currentTarget.value, 'Game Value: ' + this.game.genre);
                                }
                            }
                            />
                        </form>
                    </Column>
                </Row>
                <Row>
                    <Column width={2}>
                        <Form.Label>Platform:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <form className="form-group">
                            
                            {
                                this.AvaliablePlatform.map((platt, value) => {
                                return (
                                <>
                                    
                                    <Form.Checkbox
                                        key={value}
                                        value={platt}
                                        name={platt}
                                        onChange={(event) => {
                                            if(this.game.platform == ''){
                                                this.game.platform += event.currentTarget.value;
                                            }else{
                                                this.game.platform += ',' + event.currentTarget.value;
                                            }
                                            
                                            console.log('Value: ' + event.currentTarget.value, ', Checked: ' + event.currentTarget.checked, 'Game Value: ' + this.game.platform);
                                        }
                                    }
                                    />
                                    <Form.Label key={platt}>{platt}</Form.Label>
                                <br/>
                                </>
                                );
                            })}
                        </form>
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
                            gameService
                            .create(this.game)
                            .then((id: number) => {
                                history.push('/gamedetails/' + id);
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
        gameService.getPlatforms()
            .then((data) => this.AvaliablePlatform = data)
            .catch((error) => Alert.danger('Error getting plattform: ' + error.message));
            console.log(this.AvaliablePlatform)
        gameService.getGenres()
            .then((data) => (this.AvaliableGenres = data))
            .catch((error) => Alert.danger('Error getting genre: ' + error.message));
    }
}
