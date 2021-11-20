import * as React from 'react';
import mockReviewService from './mock-review-service';
import mockGameService from './mock-game-service';
import renderer from 'react-test-renderer';
import FrontPage from '../src/index';

jest.mock('../src/game-service', () => {
  return new mockGameService();
});
jest.mock('../src/review-service', () => {
  return new mockReviewService();
});

describe('Game review component tests', () => {
  test('GameReview renders correctly with snapshot', () => {
    const tree = renderer
      .create(<FrontPage/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});