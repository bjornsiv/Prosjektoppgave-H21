import * as React from 'react';
import mockGameService from '../__mocks__/mock-game-service';
import renderer from 'react-test-renderer';
import NewGame from '../src/game-details';

jest.mock('../src/game-service', () => {
  return new mockGameService();
});

describe('New game component tests', () => {
  test('New game renders correctly with snapshot', () => {
    const tree = renderer
      .create(<NewGame match={{ params: { id: 1 } }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});