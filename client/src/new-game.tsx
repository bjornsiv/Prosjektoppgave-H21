import * as React from 'react';
import { KeyboardEvent } from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBarLink, NavBar, Form } from './widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import { gameservice, reviewservice, Game } from './services';



export class NewGame extends Component<{}> {
    render() {
        return (
            <Card title="Add new game">
                <Row>
                    
                </Row>
            
            </Card>
           
        );
    }


mounted() {
}
}