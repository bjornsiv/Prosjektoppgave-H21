import pool from './mysql-pool';
import {Review} from './db-types';

//Vi må ha med at vi kan markere en anbefaling som relevant etter at den er registrert
//skal være mulig å redigeere og slette en anmeldelse 

class ReviewService {

  /*
  UNUSED, couldn't think of any use-case for this API.
  
  get(id: number) {
    return new Promise<Review | undefined>((resolve, reject) => {
      pool.query('SELECT * FROM reviews WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (results[0] == undefined)
        {
          return resolve(undefined);
        }

        resolve(results.map((review: any) => {new Review(review)}));
      });
    });
  }*/

  getAll(gId: number) {
    return new Promise<Review[]>((resolve, reject) => {
      pool.query('SELECT * FROM reviews WHERE game_id=?', [gId], (error, results) => {
        if (error) return reject(error);

        resolve(results.map((review: any) => { return new Review(review) }));
      });
    });
  }

  create(review: Review) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO reviews SET game_id=?, user_id=?, title=?, description=?, score=?',
        [review.game_id, review.user_id, review.title, review.description, review.score],
        (error, results) => {
          if (error) return reject(error);

          resolve(Number(results.insertId));
        }
      );
    });
  }

  update(review: Review) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE reviews SET title=?, description=?, score=? WHERE id=?',
        [review.title, review.description, review.score, review.id],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No row changed'));

          resolve();
        }
      );
    });
  }

  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM reviews WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);

        resolve();
      });
    });
  }
}


const reviewService = new ReviewService();
export default reviewService; 



