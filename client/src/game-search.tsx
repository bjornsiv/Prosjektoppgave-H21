// Komponenter for siden 'GameSearch'

import * as React from 'react';
import { KeyboardEvent } from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button, NavBar, Form, Alert, SearchBar, SignIn } from './widgets';
import { GameService } from './services';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import { pool } from '.mysql.pool';

// class GameSearch extends Component {
//   games = [];
//
//   render() {
//     return <Card title="Search results:"></Card>;
//   }
// }

class GameSearch extends Component {
  get_search_results(query) {
    //API-kall
    return [];
  }
  render() {
    search_results = this.get_search_results('');
    return (
      //html-komponenter puttes her, bytt ut p.
      <div>
        {' '}
        {search.results.map((result) => (
          <p>{results}</p>
        ))}
      </div>
    );
  }
}

//
// class TaskService {
//   /**
//    * Get task with given id.
//    */
//   get(id: number) {
//     return new Promise<Task | undefined>((resolve, reject) => {
//       pool.query('SELECT * FROM Tasks WHERE id = ?', [id], (error, results) => {
//         if (error) return reject(error);
//
//         resolve(results[0]);
//       });
//     });
//   }

<>
  <InputGroup className="mb-3">
    <FormControl
      placeholder="Search for games, genres, platforms and more"
      aria-label="Searchbar"
      aria-describedby="basic-addon2"
    />
    <Button variant="outline-secondary" id="button-addon2">
      Button
    </Button>
  </InputGroup>
</>;
