import axios from 'axios';
import pool from '../src/mysql-pool';
import app from '../src/app';
import reviewEvalService from '../src/review-eval-service';
import { ReviewEvaluation } from '../src/db-types';


const testEvals: ReviewEvaluation[] = [
  {id: 1, user_id: 7, review_id: 9},
  {id: 2, user_id: 8, review_id: 8},
  {id: 3, user_id: 9, review_id: 8},
  {id: 4, user_id: 8, review_id: 9}
]

axios.defaults.baseURL = 'http://localhost:3003/api/v1';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3003, () => done());
});

beforeEach((done) => {
  // Delete all tasks, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE review_evaluations', (error) => {
    if (error) throw error;

    // Create testReviews sequentially in order to set correct id, and call done() when finished
    reviewEvalService.create(testEvals[0].review_id, testEvals[0].user_id)
      .then(() => reviewEvalService.create(testEvals[1].review_id, testEvals[1].user_id))
      .then(() => reviewEvalService.create(testEvals[2].review_id, testEvals[2].user_id))
      .then(() => done());
  });
});

// Stop web server and close connection to MySQL server
afterAll((done) => {
  if (!webServer) throw new Error("Webserver was down unexpectedly");
  webServer.close(() => pool.end(() => done()));
});

describe('Fetch review evaluation (GET)', () => {
  test('Fetch review evaluations (200 OK)', (done) => {
    axios.get('/review-evals/8').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data[0]).toEqual(testEvals[1]);
      expect(response.data[1]).toEqual(testEvals[2]);
      expect(response.data.length).toEqual(2);
      done();
    });
  });

  test('Fetch review evaluations (200 OK) - Empty result', (done) => {
    axios
      .get('/review-evals/4').then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data.length).toEqual(0);
        done();
      });
  });
});

describe('Create new review evaluation (POST)', () => {
  test('Create new review evaluation (200 OK)', (done) => {
    axios.post(`/review-evals/${testEvals[3].review_id}/${testEvals[3].user_id}`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual({ id: 4 });
      done();
    })
  });
  test('Create new review (500 Internal Error) - User has already reviewed', (done) => {
    axios.post(`/review-evals/${testEvals[0].review_id}/${testEvals[0].user_id}`).then((_response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      expect(error.response.data.message).toEqual("User has already evaluated this review.");
      done();
    });
  });
  test('Create new review (500 Internal Error) - Invalid user Id', (done) => {
    axios.post('/review-evals/8/wrong').then((_response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });
  test('Create new review (500 Internal Error) - Invalid review Id', (done) => {
    axios.post('/review-evals/wrong/5').then((_response) => {
      throw new Error("Expected an error");
    })
    .catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });
});

describe('Delete review (DELETE)', () => {
  test('Delete review (200 OK)', (done) => {
    axios.delete('/review-evals/2').then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

describe('Check if review has been evaluated (GET)', () => {
  test('Check if review has been evaluated (200 OK) - true', (done) => {
    axios.get('/review-evals/hasEvaluated/8/5').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data.result).toEqual(false);
      done();
    });
  });
  test('Check if review has been evaluated (200 OK)  - true', (done) => {
    axios.get('/review-evals/hasEvaluated/8/9').then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data.result).toEqual(true);
      done();
    });
  });
});
