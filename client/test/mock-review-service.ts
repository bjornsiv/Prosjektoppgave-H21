import { Review } from '../src/db-types';

const testReviewsSource: any[] = [
  {id: 1, game_id: 9, user_id: 7, title: 'Snooze-fest',         description: 'Plipp',                 score: 3, created_at: '11-18-2021'},
  {id: 2, game_id: 8, user_id: 8, title: 'Badass futurism',     description: 'So many sky scrapers!', score: 4, created_at: '11-18-2021'},
  {id: 3, game_id: 8, user_id: 9, title: 'Lazer guns go zoop',  description: 'Wow!',                  score: 5, created_at: '11-18-2021'},
  {id: 4, game_id: 9, user_id: 8, title: 'Amazing',             description: 'Lot\'s of features',    score: 2, created_at: '11-18-2021'}
]

export default class mockReviewService {
  getAll() {
    return Promise.resolve<Review[]>(
      testReviewsSource.map((review) => {
        return new Review(review);
      })
    );
  }

  get(id: Number) {
    return new Promise<Review>((resolve, reject) => {
      this.getAll().then((reviews) => {
        var review = reviews.find((review) => review.id == id);
        if (review) {
          resolve(review);
        } else {
          reject('Could not find Review');
        }
      });
    });
  }

  update(review: Review) {
    return Promise.resolve();
  }

  create() {
    return Promise.resolve(5); // Same as: return new Promise((resolve) => resolve(4));
  }
}
