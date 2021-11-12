// Importerer nødvendige biblioteker, komponenter og avhengigheter
import * as React from 'react';
import { KeyboardEvent } from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBar, Form, Alert, SearchBar, SignIn } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/*
KOMPONENTER / KLASSER
- Menu (NavLink)
- FrontPage (Card, NavBar, SearchBar)
- GameSearch (Card, SearchBar, SearchResults)
- GameDetails (Card, Row, Column, ***add game***)
- GameReview (Form.Label, Form.Input, Form.Textarea, Rating)
- NewGame --> kopi av GameDetails + form for å opprette
*/




// Side for søkeresultat
class GameSearch extends Component {
    games = [];

    render() {
        return (
            <Card title="Game results"></Card>
        );
    }
}

// Side for detaljer om hvert spill
class GameDetails extends Component {
    game = null;

    render() {
        if (!this.game) return null;

        return (
            <div>
                <Card title="Game details">
                  <Row>
                    <Column width={2}>Game title:</Column>
                    <Column>{this.game.title}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Release date:</Column>
                    <Column>{this.game.releasedate}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Genre:</Column>
                    <Column>{this.game.genre}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Plattforms:</Column>
                    <Column>{this.game.plattforms}</Column>
                  </Row>
                  <Row>
                    <Column width={2}>Description:</Column>
                    <Column>{this.game.description}</Column>
                  </Row>

                  {/* Legg til reviews, add reviews*/}
                  
                  

                </Card>
            </div>
        );
    }

}

// Side for å opprette anmeldelse av spill
class GameReview extends Component {

}


// Side for å opprette nytt spill
class NewGame extends Component {
    
}


