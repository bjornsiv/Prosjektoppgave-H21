// Komponenter for siden 'GameSearch' 

import * as React from 'react';
import { KeyboardEvent } from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBar, Form, Alert, SearchBar, SignIn } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';


class GameSearch extends Component {
    games = [];

    render() {
        return (
            <Card title="Search results:"></Card>

        );
    }
}
