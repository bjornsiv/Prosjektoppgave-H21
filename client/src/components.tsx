
// Tror vi kan slette denne filen?

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






// Side for å opprette anmeldelse av spill
class GameReview extends Component {

}


// Side for å opprette nytt spill
class NewGame extends Component {
    
}


