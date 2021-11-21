import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import reviewService from '../src/review-service';
import { Review } from '../src/db-types';


const testReviewsSource: any[] = [
  {id: 1, game_id: 9, user_id: 7, title: 'Snooze-fest',         description: 'Plipp',                 score: 3, created_at: '11-18-2021'},
  {id: 2, game_id: 8, user_id: 8, title: 'Badass futurism',     description: 'So many sky scrapers!', score: 4, created_at: '11-18-2021'},
  {id: 3, game_id: 8, user_id: 9, title: 'Lazer guns go zoop',  description: 'Wow!',                  score: 5, created_at: '11-18-2021'},
  {id: 4, game_id: 9, user_id: 8, title: 'Amazing',             description: 'Lot\'s of features',    score: 2, created_at: '11-18-2021'}
]

const testReviews: Review[] = testReviewsSource.map((review) => { return new Review(review);});

axios.defaults.baseURL = 'http://localhost:3002/api/v1';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3002, () => done());
});

beforeEach((done) => {
  // Delete all tasks, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE reviews', (error) => {
    if (error) throw error;

    // Create testReviews sequentially in order to set correct id, and call done() when finished
    reviewService
      .create(testReviews[0])
      .then(() => reviewService.create(testReviews[1])) // Create testTask[1] after testTask[0] has been created
      .then(() => reviewService.create(testReviews[2])) // Create testTask[2] after testTask[1] has been created
      .then(() => done()); // Call done() after testTask[2] has been created
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) throw new Error("Webserver was down unexpectedly");
  webServer.close(() => pool.end(() => done()));
});

describe('Search review (GET)', () => {
  test('Search reviews (200 OK)', (done) => {
    var ref1:any = testReviewsSource[1];
    var ref2:any = testReviewsSource[2];

    delete ref1.created_at;
    delete ref2.created_at;

    axios.get('/reviews/search/8').then((response) => {
      expect(response.status).toEqual(200);
      expect(new Review(response.data[0])).toMatchObject(ref1);
      expect(new Review(response.data[1])).toMatchObject(ref2);
      expect(response.data.length).toEqual(2);
      done();
    });
  });

  test('Search review (200 OK) - no results', (done) => {
    axios
      .get('/reviews/search/4')
      .then((response)  => {
        expect(response.status).toEqual(200);
        expect(response.data.length).toEqual(0);
        done();
      });
  });
});

describe('Get review (GET)', () => {
  test('Get review (200 OK)', (done) => {
    var ref:any = testReviewsSource[1];
    delete ref.created_at;

    axios.get('/reviews/' + ref.id).then((response) => {
      expect(response.status).toEqual(200);
      expect(new Review(response.data)).toMatchObject(ref);
      done();
    });
  });

  test('Get review (404 Not Found)', (done) => {
    axios
      .get('/reviews/8')
      .then((_response) => {throw new Error(`Expected failure, got ${_response}`)})
      .catch((error) => {
        expect(error.message).toEqual('Request failed with status code 404');
        done();
      });
  });
});

describe('Create new review (POST)', () => {
  test('Create new review (200 OK)', (done) => {
    axios.post('/reviews', testReviews[2]).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual({ id: 4 });
      done();
    })
  });
  test('Create new review (500 Internal Error) - Missing data', (done) => {
    axios.post('/reviews', null).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });
  test('Create new review (500 Internal Error) - Internal SQL error', (done) => {
    var review = new Review(testReviewsSource[3]);
    review.title = "a".repeat(512);
    axios.post('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      expect(error.response.data.code).toEqual('ER_DATA_TOO_LONG');
      done();
    });
  });
  test('Create new review (400 Bad Request) - Missing title', (done) => {
    var review = new Review(testReviewsSource[3]);
    review.title = "";
    axios.post('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Missing Title');
      done();
    });
  });
  test('Create new review (400 Bad Request) - Missing description', (done) => {
    var review = new Review(testReviewsSource[3]);
    review.description = "";
    axios.post('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Missing description');
      done();
    });
  });
  test('Create new review (400 Bad Request) - Illegal score - High', (done) => {
    var review = new Review(testReviewsSource[3]);
    review.score = 6;
    axios.post('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Illegal score');
      done();
    });
  });
  test('Create new review (400 Bad Request) - Illegal score - Low', (done) => {
    var review = new Review(testReviewsSource[3]);
    review.score = -1;
    axios.post('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Illegal score');
      done();
    });
  });
  test('Create new review (400 Bad Request) - Undefined creation date', (done) => {
    var review = new Review(testReviewsSource[3]);
    review.created_at = new Date("");
    axios.post('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.message).toEqual('Undefined creation date');
      done();
    });
  });
});

describe('Delete review (DELETE)', () => {
  test('Delete review (200 OK)', (done) => {
    axios.delete('/reviews/2').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

describe('Update review (POST)', () => {
  test('Update review (200 OK)', (done) => {
    axios.put('/reviews', testReviews[0]).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
  test('Update review (500 Internal Error) - Internal SQL error', (done) => {
    var review = new Review(testReviewsSource[0]);
    review.title = "a".repeat(512);
    axios.put('/reviews', review).then((response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      expect(error.response.data.code).toEqual('ER_DATA_TOO_LONG');
      done();
    });
  });
});
