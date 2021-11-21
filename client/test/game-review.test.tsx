import * as React from 'react';
import mockReviewService from '../__mocks__/mock-review-service';
import mockGameService from '../__mocks__/mock-game-service';
import renderer from 'react-test-renderer';
import GameReview from '../src/new-review';

jest.mock('../src/game-service', () => {
  return new mockGameService();
});
jest.mock('../src/review-service', () => {
  return new mockReviewService();
});

describe('Game review component tests', () => {
  test('GameReview renders correctly with snapshot', () => {
    const tree = renderer
      .create(<GameReview match={{ params: { id: 1 } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});