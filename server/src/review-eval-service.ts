import pool from './mysql-pool';
import {Review, ReviewEvaluation, User} from './db-types';


class ReviewEvalService {
  create(rId: number, uId: number){
    return new Promise<number>((resolve, reject) => {
      if (isNaN(rId)){
        reject("Review ID is not a number");
        return;
      }
      if (isNaN(uId)){
        reject("User ID is not a number");
        return;
      }

      this.has_evaluated(rId, uId)
        .then(
          (has_evaluted) => {
            if (has_evaluted)
            {
              reject("User has already evaluated this review.");
            }

            pool.query(
              'INSERT INTO review_evaluations SET review_id=?, user_id=?',
              [rId, uId],
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

  delete(id: number){
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM review_evaluations WHERE id=?',
        [id],
        (error, results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  get(reviewId: number){
    return new Promise<ReviewEvaluation[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM review_evaluations WHERE review_id=?',
        [reviewId],
        (error, results) => {
          if (error) return reject(error);

          resolve(results);
        }
      )
    });
  }

  has_evaluated(reviewId: number, userId: number){
    return new Promise<boolean>((resolve, reject) => {
      pool.query(
        'SELECT * FROM review_evaluations WHERE review_id=? AND user_id=?',
        [reviewId, userId],
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



