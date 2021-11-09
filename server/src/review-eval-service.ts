import pool from './mysql-pool';
import {Review, ReviewEvaluation, User} from './db-types';


class ReviewEvalService {
  add(review: Review, user: User){
    return new Promise<number>((resolve, reject) => {
      this.has_evaluated(review, user)
        .then(
          (has_evaluted) => {
            if (has_evaluted)
            {
              reject("User has allready evaluated this review.");
            }

            pool.query(
              'INSERT INTO review_evaluations SET user_id=?, review_id=?',
              [review.id, user.id],
              (error, results) => {
                if (error) return reject(error);
      
                resolve(Number(results.insertId));
              }
            );
          }
        )
      }
    );
  }

  remove(id: number){
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELTE FROM review_evaluations WHERE id=?',
        [id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  get(review: Review){
    return new Promise<ReviewEvaluation[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM review_evaluations WHERE review_id=?',
        [review.id],
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      )
    });
  }

  has_evaluated(review: Review, user: User){
    return new Promise<boolean>((resolve, reject) => {
      pool.query(
        'SELECT * FROM review_evaluations WHERE review_id=? AND user_id=?',
        [review.id, user.id],
        (error, results) => {
          if (error) return reject(error);

          resolve(results.length > 0);
        }
      )
    });
  }
}


const reviewEvalService = new ReviewEvalService();
export default reviewEvalService; 



