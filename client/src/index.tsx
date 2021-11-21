// I denne filen ligger stiene for sidevisning, meny og forside
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Column, Row, Button, CardRow, SearchBar } from './widgets';
import { createHashHistory } from 'history';

import NewGame from './new-game';
import EditGame from './edit-game';
import GameReview from './new-review';
import GameDetails from './game-details';
import GameSearch from './game-search';
import EditReview from './edit-review';
import FrontPage from './frontpage';

const history = createHashHistory();

// Meny med link til andre sider - Finn ut hva som skal med her, legg evt. til senere
class Menu extends Component {
  searchQuery: string = '';

  render() {
    return (
      <>
        <NavBar brand="">
          <NavBar.Link to="/">
            <img src="https://www.favicon.cc/logo3d/229133.png"></img>
          </NavBar.Link>
        </NavBar>
        <Card title="GameRatings">
          <Column right={true} width={100}>
            <SearchBar
              value={this.searchQuery}
              onClick={(_event, value) => history.push('/gamesearch/' + value)}
            />
          </Column>
          <Column right={true}>
            <NavBar.Link to="/newgame">Add game</NavBar.Link>
          </Column>
          <Column right={true}>
            <NavBar.Link to="/">Home</NavBar.Link>
          </Column>
          <Column>Rate new and trending games - or your all time favorites!</Column>
        </Card>
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
        <Route path="/gamesearch/:query" component={GameSearch} />
        <Route path="/gamedetails/:id(\d+)" component={GameDetails} />
        <Route path="/new-review/:id(\d+)" component={GameReview} />
        <Route path="/newgame" component={NewGame} />
        <Route path="/editgame/:id(\d+)" component={EditGame} />
        <Route path="/editreview/:id(\d+)" component={EditReview} />
      </div>
    </HashRouter>,
    document.getElementById('root')
  );
