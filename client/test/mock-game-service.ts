import { Game } from '../src/db-types';

const testGameSources: any[] = [
  {
    id: 1,
    title: 'gun fest 5000',
    description: 'guns fight',
    release_date: '11-18-2021',
    genre: 'First Person Shooter',
    platform: 'PC',
  },
  {
    id: 2,
    title: 'zombie killing in the future',
    description: 'guns fight',
    release_date: '11-18-2021',
    genre: 'Real-Time Strategy',
    platform: 'PC',
  },
  {
    id: 3,
    title: 'car simulator #CorsaLover',
    description: 'car fight',
    release_date: '11-18-2021',
    genre: 'Sports Game',
    platform: 'PC',
  },
  {
    id: 4,
    title: 'train rider',
    description: 'Just Trains',
    release_date: '11-18-2021',
    genre: 'Sports Game',
    platform: 'PC',
  },
];

export default class mockGameService {
  getAll() {
    return Promise.resolve<Game[]>(
      testGameSources.map((game) => {
        return new Game(game);
      })
    );
  }

  get(id: Number) {
    return new Promise<Game>((resolve, reject) => {
      this.getAll().then((games) => {
        var game = games.find((game) => game.id == id);
        if (game) {
          resolve(game);
        } else {
          reject('Could not find Game');
        }
      });
    });
  }

  update(game: Game) {
    return Promise.resolve();
  }

  create() {
    return Promise.resolve(5); // Same as: return new Promise((resolve) => resolve(4));
  }
}
