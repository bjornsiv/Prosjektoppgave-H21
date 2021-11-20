import * as React from 'react';
import renderer from 'react-test-renderer';
import GameSearch from '../src/game-search';
import mockGameService from './mock-game-service';

jest.mock('../src/game-service', () => {
  return new mockGameService();
});

describe('Game search component tests', () => {
  test('GameReview search correctly with snapshot', () => {
    const tree = renderer
      .create(<GameSearch match={{ params: { query: "fight" } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});