import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import gameService from '../src/game-service';
import {Game} from '../src/db-types';

const testGameSources: any[] = [
  { id: 1, title: 'gun fest 5000',                description: "guns fight",    release_date: "11-18-2021", genre:'First Person Shooter', platform: 'PC'},
  { id: 2, title: 'zombie killing in the future', description: "guns fight",    release_date: "11-18-2021", genre:'Real-Time Strategy',   platform: 'PC'},
  { id: 3, title: 'car simulator #CorsaLover',    description: "car fight",     release_date: "11-18-2021", genre:'Sports Game',          platform: 'PC'},
  { id: 4, title: 'train rider',                  description: "Just Trains",   release_date: "11-18-2021", genre:'Sports Game',          platform: 'PC'},
];

const testGames: Game[] = testGameSources.map((game) => { return new Game(game);});

axios.defaults.baseURL = 'http://localhost:3001/api/v1';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
  // Delete all tasks, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE games', (error) => {
    if (error) throw error;
    
    // Create testGames sequentially in order to set correct id, and call done() when finished
    gameService
      .create(testGames[0])
      .then(() => gameService.create(testGames[1])) // Create testTask[1] after testTask[0] has been created
      .then(() => gameService.create(testGames[2])) // Create testTask[2] after testTask[1] has been created
      .then(() => gameService.create(testGames[3])) // Create testTask[2] after testTask[1] has been created
      .then(() => done()); // Call done() after testTask[2] has been created
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Fetch games (GET)', () => {
  test('Fetch all games (200 OK)', (done) => {
   axios.get('/games').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data.map((game: any) => new Game(game))).toEqual(testGames);
      done();
    });
  });

  test('Fetch game (200 OK)', (done) => {
    axios.get('/games/1').then((response) => {
      expect(response.status).toEqual(200);
      expect(new Game(response.data)).toEqual(testGames[0]);
      done();
    });
  });

  test('Fetch game (404 Not Found)', (done) => {
    axios
      .get('/games/10')
      .then((_response) => done.fail(new Error()))
      .catch((error) => {
        expect(error.response.status).toEqual(404);
        done();
      });
  });

  test('Fetch game (500 Internal Server Error)', (done) => {
    axios
      .get('/games/cake')
      .then((_response) => done.fail(new Error()))
      .catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
  });
});

describe('Create new game (POST)', () => {
  test('Create new game (200 OK)', (done) => {
    axios.post('/games', testGames[2]).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual({ id: 5 });
      done();
    });
  });
  test('Create new game (500 Internal Server Error) - Missing data', (done) => {
    axios.post('/games', null).then((response) => {
      throw new Error("Expected error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });
  test('Create new game (400 Bad Request) - Missing title', (done) => {
    var game = new Game(testGameSources[3]);
    game.title = "";
    axios.post('/games', game).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Missing title');
      done();
    });
  });
  test('Create new game (400 Bad Request) - Missing description', (done) => {
    var game = new Game(testGameSources[3]);
    game.description = "";
    axios.post('/games', game).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Missing description');
      done();
    });
  });
  test('Create new game (400 Bad Request) - Undefined release date', (done) => {
    var game = new Game(testGameSources[3]);
    game.release_date = new Date("");
    axios.post('/games', game).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Undefined release date');
      done();
    });
  });
  test('Create new game (500 Internal Server Error)', (done) => {
    var game = new Game(testGameSources[3]);
    game.title = "a".repeat(512);
    axios.post('/games', game).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });
});

describe('Search for game (GET)', () => {
  test('Search for game (200 OK)', (done) => {
   axios.get('/games/search?find=fight&order=genre').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
  test('Search for game (200 OK) - No order', (done) => {
   axios.get('/games/search?find=fight').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
  test('Search for game (400 Bad Request)', (done) => {
    axios.get('/games/search').then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });
});

describe('Delete game (DELETE)', () => {
  test('Delete game (200 OK)', (done) => {
   axios.delete('/games/2').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

describe('Update game (PUT)', () => {
  test('Update game (200 OK)', (done) => {
    axios.put('/games', testGames[0]).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
  test('Update game (400 Bad Request)', (done) => {
    var game = new Game(testGameSources[3]);
    game.title = "";
    axios.put('/games', game).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });
  test('Update game (400 Bad Request)', (done) => {
    var game = new Game(testGameSources[3]);
    game.title = "a".repeat(512);
    axios.put('/games', game).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });
});
