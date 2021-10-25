import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert } from './widgets';
import axios from 'axios';


class Menu extends Component {
  render() {
    return (
      <NavBar brand="Code runner">
        <NavBar.Link to="/run">Codder</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">This is Code runner</Card>;
  }
}



const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
      </div>
    </HashRouter>,
    root
  );
