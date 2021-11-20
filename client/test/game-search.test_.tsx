import * as React from 'react';
import GameService from './mock-game-service';
import renderer from 'react-test-renderer';
import GameSearch from '../src/game-search';

jest.mock('../src/services', () => {
  return new GameService();
});

describe('Game search component tests', () => {
  test('GameReview search correctly with snapshot', () => {
    const tree = renderer
      .create(<GameSearch match={{ params: { id: 1 } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});