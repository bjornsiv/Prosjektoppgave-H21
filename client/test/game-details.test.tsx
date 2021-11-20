import * as React from 'react';
import mockGameService from './mock-game-service';
import renderer from 'react-test-renderer';
import GameDetails from '../src/game-details';

jest.mock('../src/game-service', () => {
  return new mockGameService();
});

describe('Game details component tests', () => {
  test('GameDetails renders correctly with snapshot', () => {
    const tree = renderer
      .create(<GameDetails match={{ params: { id: 1 } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});