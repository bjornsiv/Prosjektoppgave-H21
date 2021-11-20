// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Column, Row, Button, CardRow, SearchBar } from './widgets';

import NewGame from './new-game';
import EditGame from './edit-game';
import GameReview from './game-review';
import GameDetails  from './game-details';
import GameSearch from './game-search';
import FrontPage from './frontpage';

// Meny med link til andre sider - Finn ut hva som skal med her, legg evt. til senere
class Menu extends Component {
  
  render() {
      return (
          <>
            <NavBar brand="">
              <NavBar.Link to="/"><img src="https://www.favicon.cc/logo3d/229133.png"></img></NavBar.Link>
            </NavBar>
          </>
                 /*<SearchBar placeholder="">Search for games</SearchBar>*/
      );
  }
}

/* 
<div className="d-flex justify-content-start">
      <div className="p-2 col-example text-left">Flex item 1</div>
      <div className="p-2 col-example text-left">Flex item 2</div>
      <div className="p-2 col-example text-left">Flex item 3</div>

*/


// Definerer stiene til de ulike sidevisningene
const root = document.getElementById('root');
if (root)

ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={FrontPage} />
        <Route path="/gamesearch/:query" component={GameSearch}/>
        <Route path="/gamedetails/:id(\d+)" component={GameDetails} />
        <Route path="/new-review/:id(\d+)" component={GameReview} />
        <Route path="/newgame" component={NewGame}/>
        <Route path="/editgame/:id(\d+)" component={EditGame}/>
      </div>
    </HashRouter>,
    document.getElementById('root')
  );