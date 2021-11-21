import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, Form, Alert } from './widgets';
import { createHashHistory } from 'history';
import { Game } from './db-types';
import gameService from './game-service';

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

function date_to_calendar(date: Date) {
  const leading = (value: number, places: number) => String(value).padStart(places, '0');
  return `${date.getFullYear()}-${leading(date.getMonth(), 2)}-${leading(date.getDay(), 2)}`;
}

class EditGame extends Component<{ match: { params: { id: number } } }> {
  game: Game = {
    id: 0,
    title: '',
    description: '',
    release_date: new Date(),
    genre: 'Real-Time Strategy',
    platform: '',
  };

  release_date: string = '';
  AvaliableGenres: { name: string; value: string }[] = [];
  platforms: { name: string; supported: boolean }[] = [];

  render() {
    return (
      <>
        <Card title="Edit existing game: ">
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
                onChange={(event) => {
                  this.release_date = event.currentTarget.value;
                  this.game.release_date = new Date(this.release_date);
                }}
                value={this.release_date}
                placeholder="Release Date"
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Genre:</Form.Label>
            </Column>
            <Column width={4}>
              <form>
                <Form.SelectDropDown
                  valueList={this.AvaliableGenres}
                  value={this.game.genre}
                  onChange={(event) => {
                    this.game.genre = event.currentTarget.value;
                  }}
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
                {this.platforms.map((platform) => (
                  <>
                    <Form.Checkbox
                      key={platform.name}
                      value={platform.supported}
                      name={platform.name}
                      onChange={(event) => {
                        platform.supported = event.currentTarget.checked;
                        this.game.platform = this.platforms
                          .filter((platform) => platform.supported)
                          .map((platform) => platform.name)
                          .join(',');

                        console.log(
                          'Value: ' + event.currentTarget.value,
                          ', Checked: ' + event.currentTarget.checked,
                          'Game Value: ' + this.game.platform
                        );
                      }}
                    />
                    <Form.Label key={platform.name + '-name'}>{platform.name}</Form.Label>
                    <br />
                  </>
                ))}
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
                onChange={(event) => (this.game.description = event.currentTarget.value)}
              />
              <br></br>
              <br></br>
              <br></br>
            </Column>
          </Row>
          <Row>
            <Column>
              <Button.Dark
                onClick={() => {
                  gameService
                    .update(this.game)
                    .then(() => {
                      history.push('/gamedetails/' + this.game.id);
                    })
                    .catch((error) => Alert.danger('Error ' + error.message));
                }}
              >
                Add changes
              </Button.Dark>
              <Button.Danger
                onClick={() => {
                  gameService
                    .delete(this.props.match.params.id)
                    .then(() => {
                      history.push('/');
                    })
                    .catch((error) => Alert.danger('Error ' + error.message));
                }}
              >
                Delete game
              </Button.Danger>
            </Column>
          </Row>
        </Card>
      </>
    );
  }
  mounted() {
    gameService
      .get(this.props.match.params.id)
      .then((game) => {
        this.game = game;
        this.release_date = date_to_calendar(this.game.release_date);
      })
      .catch((error) => Alert.danger('Error getting game: ' + error.message));

    gameService
      .getPlatforms()
      .then((data) => {
        data.map((name) =>
          this.platforms.push({ name: name, supported: this.game.platform.includes(name) })
        );
        console.log(this.platforms);
      })
      .catch((error) => Alert.danger('Error getting plattform: ' + error.message));
    gameService
      .getGenres()
      .then(
        (data) =>
          (this.AvaliableGenres = data.map((genre) => {
            return { name: genre, value: genre };
          }))
      )
      .catch((error) => Alert.danger('Error getting genre: ' + error.message));
  }
}

export default EditGame;
