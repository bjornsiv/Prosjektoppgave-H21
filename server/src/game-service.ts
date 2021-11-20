import pool from './mysql-pool';
import {Game} from './db-types';

/*
  Definer klasser for tabeller i database (spill og review) - Done
  Definer tom GameService-klasse 
  Definer tom ReviewService

  Se gjennom oppgave, og definere hvilke funksjoner som trengs hvor i service-klasser
  Implementer funksjoner.

  Arkitektur: 
  Lurt med en game service og en review service. Game og review services bør lime sammen de forksejllige databasene bak
  før man representerer for de forksjellige APIene. 
*/

class GameService {
  get(id: number) {
    return new Promise<Game| undefined>((resolve, reject) => {
      pool.query('SELECT * FROM games WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);
        if (results[0] == undefined)
        {
          return resolve(undefined);
        }

        resolve(new Game(results[0]));
      });
    });
  }

  getAll() {
    return new Promise<Game[]>((resolve, reject) => {
      pool.query('SELECT * FROM games', (error, results) => {
        if (error) return reject(error);

        resolve(results.map((game: any) => { return new Game(game) }));
      });
    });

  }
  
  getGenres(){
    return new Promise<string[]>((resolve, reject) => {
      pool.query(
        "SELECT column_type FROM information_schema.COLUMNS WHERE TABLE_NAME = 'games' AND COLUMN_NAME = 'genre';",
        (error, results) => {
          if(error) return reject(error);
          
          resolve(results[0].column_type.match(/'([^\']*)'/g).map((s: String) => s.replace(/'/g, "")));
        })
    })
  }
  
  getPlatforms(){
    return new Promise<string[]>((resolve, reject) => {
      pool.query(
        "SELECT column_type FROM information_schema.COLUMNS WHERE TABLE_NAME = 'games' AND COLUMN_NAME = 'platform';",
        (error, results) => {
          if(error) return reject(error);
          
          resolve(results[0].column_type.match(/'([^\']*)'/g).map((s: String) => s.replace(/'/g, "")));
        })
    })
  }

  search(searchString: string, order_by: string){ //order by kan sikert brueks her. "Gratis" søkerfunksjon
    return new Promise<Game[]>((resolve, reject) => {
      pool.query('SELECT * FROM games WHERE title LIKE ? OR description LIKE ? OR platform LIKE ? OR genre LIKE ? ORDER BY ?', [searchString, searchString, searchString, searchString, order_by], (error, results) => {
        if(error) return reject(error);

        resolve(results);
      });
    });
  }

  create(game: Game) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO games SET title=?, genre=?, description=?, platform=?, release_date=?',
        [game.title, game.genre, game.description, game.platform, game.release_date],
        (error, results) => {
          if (error) return reject(error);

          resolve(Number(results.insertId));
        }
      );
    });
  }

  update(game: Game) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE games SET title=?, genre=?, description=?, platform=?, release_date=? WHERE id=?',
        [game.title, game.genre, game.description, game.platform, game.release_date, game.id],
        (error, results) => {
          if (error) return reject(error);
          if (!results.affectedRows) reject(new Error('No row changed'));

          resolve();
        }
      );
    });
  }

  delete(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM games WHERE id = ?', [id], (error, results) => {
        if (error) return reject(error);

        resolve();
      });
    });
  }
}


//Dersom flere sevices, må huske å legge dem til her også. 
//Se på å splitte i flere filer. Feks: en per service. 
const gameService = new GameService();
export default gameService;




