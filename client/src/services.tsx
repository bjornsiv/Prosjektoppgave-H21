import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Game = {
    id: number;
    title: string;
    description: string;
    release_date: Date;
    genre: string;         // Should be enum i data base fordi kan lag drop down i front end. Begrenser valg for brukeren! 
                          // Databasen er satt opp slik at kun er en sjanger pr.spill. 
    platform: string;      // Should be enum i data base fordi kan lag drop down i front end. Begrenser valg for brukeren! 
                          // I tillegg burde det være et array for å kunne lagre FLERE platformer for et spill. SQL Z i databasen. 
  }
  
  export type Review = {
    id: number;
    game_id: number;
    user_id: number;
    title: string;
    description: string;
    score: number;
    created_at: Date;
  }
  
  export type ReviewEvaluation = {
    id: number;
    review_id: number;
    user_id: number;
  }
  
  export type Release = {
    id: number;
    game_id: number;
    platform_id: number;
    date: Date;
  } 
  
  export type User = {
    id: number;
    nickname: string;
    created_at: Date;
  }
  
class GameService {
    get(id: number) {
        return axios.get<Game>('/games/' + id).then((response) => response.data);
    }
    getAll() {
        return axios.get<Game[]>('/games/').then((response) => response.data);
    }
    //search(id:number) {
    //    return axios.get<Game>('/games').then((response) => response.data);
    //}
    create(game: Game){
        return axios.post<Game>('/games/newgame/', {
            game: game,
        }).then((response) => response.data.id);
    }
    delete(id:number) {
        return axios.delete<Game>('/games/' + id);
    }
    update(game: Game){
        return axios.put<Game>('/games/editgame/', {
            game: game,
        })
        .then((response) => response.data.id);
    }
    getEnum() {
        return axios.get<string[]>('/games/newgame/genre/').then((response) => response.data);
    }
    getPlatt() {
        return axios.get<string[]>('/games/newgame/platt/').then((response) => response.data);
    }
} 


class ReviewService {
  get(id: number) {
    return axios.get<Review>('/reviews/' + id).then((response) => response.data);
  }
  getAll(gId: number) {
    return axios.get<Review[]>('/reviews/gamereviews/' + gId).then((response) => response.data);
  }
  search() {
    return axios.get<Review>('/reviews/gamesearch').then((response) => response.data);
  }
  create(review: Review) {
    return axios
      .post<Review>('/reviews/', {
        review: review,
      })
      .then((response) => response.data.id);
  }
  delete(id: number) {
    return axios.delete<Game>('/reviews/' + id);
  }
  update(review: Review) {
    return axios
      .put<Review>('/reviews', {
        review: review,
      })
      .then((response) => response.data);
  }
}

//NOT YET IMPLEMENTED
class ReviewEvalService {
  get(id: number) {
    return axios.get<Review>('/reviews/' + id).then((response) => response.data);
  }
  getAll(gId: number) {
    return axios.get<Review[]>('/reviews/gamereviews/' + gId).then((response) => response.data);
  }
  search() {
    return axios.get<Review>('/reviews/gamesearch').then((response) => response.data);
  }
  create(review: Review) {
    return axios
      .post<Review>('/reviews/', {
        review: review,
      })
      .then((response) => response.data.id);
  }
  delete(id: number) {
    return axios.delete<Game>('/reviews/' + id);
  }
  update(review: Review) {
    return axios
      .put<Review>('/reviews', {
        review: review,
      })
      .then((response) => response.data);
  }
}

const reviewEvalService = new ReviewEvalService();
const gameservice = new GameService();
const reviewservice = new ReviewService();
export { reviewservice, gameservice, reviewEvalService };

/*

gamesearch
newgame
gamereview
gamedetails

*/
