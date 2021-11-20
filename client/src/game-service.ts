import axios from 'axios';
import { Game } from './db-types';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

class GameService {
  get(id: number) {
    return axios.get<Game>('/games/' + id).then((response) => response.data);
  }
  getAll() {
    return axios.get<Game[]>('/games/').then((response) => response.data);
  }

  search(query: string) {
    query = `/games/search/?find=${query}`;
    return axios.get<Game[]>(query).then((response) => response.data);
  }
  
  create(game: Game) {
    return axios
      .post<Game>('/games/', game)
      .then((response) => response.data.id);
  }
  delete(id: number) {
    return axios.delete<Game>('/games/' + id);
  }

  update(game: Game) {
    return axios
      .put<Game>('/games/editgame/', game)
      .then((response) => response.data);
  }

  getGenres() {
    return axios.get<string[]>('/games/genres/').then((response) => response.data);
  }
  getPlatforms() {
    return axios.get<string[]>('/games/platform/').then((response) => response.data);
  }
}

const gameservice = new GameService();
export default gameservice;

/*

gamesearch
newgame
gamereview 
gamedetails

*/
