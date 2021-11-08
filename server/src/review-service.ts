import pool from './mysql-pool';
import {Game, Review, ReviewEvaluation, User} from './db-types';


class ReviewService {

  get(id: number) {
    return new Promise<Review | undefined>((resolve, reject) => {
      pool.query('SELECT * FROM reviews WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);

        resolve(results[0]);
      });
    });
  }

  getAll() {
    return new Promise<Review[]>((resolve, reject) => {
      pool.query('SELECT * FROM reviews', (error, results) => {
        if (error) return reject(error);

        resolve(results);
      });
    });
  }

  create(review: Review, game: Game, user: User) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO reviews SET game_id=?, user_id=?, title=?, description=?, score=?',
        [game.id, user.id, review.title, review.description, review.score],
        (error, results) => {
          if (error) return reject(error);

          resolve(Number(results.insertId));
        }
      );
    });
  }

  search() {
   // order by kan sikkert brukes her 
   return new Promise<Review[]>((resolve, reject) => {
    pool.query('SELECT * FROM reviews WHERE title LIKE ? AND description LIKE ? AND score LIKE ? AND game_id LIKE ? ORDER BY ?', (error, results) => {
      if(error) return reject(error);

      resolve(results);
    });
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



