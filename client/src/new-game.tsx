import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
import { createHashHistory } from 'history';
import { Game, gameservice } from './services';

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


class NewGame extends Component {
    game: Game = {id: 0, title: '', description: '', release_date: new Date(), genre: 'Real-Time Strategy', platform: ''};
    currentDateValue: string = '';
    newId: Number = 0;
    AvaliableGenres: string[] = [];
    AvaliablePlatform: string[] = []
    result: string = ''

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
                    <Column width={1}>
                        <Form.Label>Platform:</Form.Label>
                    </Column>
                    <Column width={4}>
                        <form className="form-group">
                            
                            {
                                this.AvaliablePlatform.map((platt, value) => {
                                return (
                                <>
                                    <Form.Label key={platt}>{platt}</Form.Label>
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
                                <br/>
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

                    <Button.Secondary 
                        onClick={() => {
                            this.game.release_date = new Date(this.currentDateValue);
                            this.game.platform.substring(0, this.game.platform.length - 2);
                            console.log(this.game.platform.length)
                         
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
                    </Button.Secondary >
                </Column>
            </Row>
            </Card>
            </>
        );}
    mounted(){
        gameservice.getPlatt()
            .then((data) => this.AvaliablePlatform = data)
            .catch((error) => Alert.danger('Error getting plattform: ' + error.message));
            console.log(this.AvaliablePlatform)
        gameservice.getEnum()
            .then((data) => (this.AvaliableGenres = data))
            .catch((error) => Alert.danger('Error getting genre: ' + error.message));
    }
}

export default NewGame;