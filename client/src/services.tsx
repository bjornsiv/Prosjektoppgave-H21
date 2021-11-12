import axios from 'axios'

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
  
export class GameService {
    get(id: number) {
        return axios.get<Game>('/gamedetails/' + id).then((response) => response.data);
    }
    getAll() {
        return axios.get<Game>('/').then((response) => response.data);
    }
    search(id:number) {
        return axios.get<Game>('/gamesearch').then((response) => response.data);
    }
    create(game: Game){
        return axios.post<Game>('/newgame', {
            game: game,
        }).then((response) => response.data.id);
    }
    delete(id:number) {
        return axios.delete<Game>('/gamedetails/' + id);
    }
    update(game: Game){
        return axios.put<Game>('/gamedetails/', {
            game: game,
        })
        .then((response) => response.data);
    }
} 

export class ReviewService {
    get(id: number) {
        return axios.get<Game>('/gamereviews/' + id).then((response) => response.data);
    }
    getAll() {
        return axios.get<Game>('/gamereviews').then((response) => response.data);
    }
    search() {
        return axios.get<Game>('/gamesearch').then((response) => response.data);
    }
    create(game: Game){
        return axios.post<Game>('/gamereviews/new', {
            game: game,
        }).then((response) => response.data.id);
    }
    delete(id:number) {
        return axios.delete<Game>('/gamereviews/' + id);
    }
    update(game: Game){
        return axios.put<Game>('/gamereviews/update/' + game.id, {
            game: game,
        })
        .then((response) => response.data);
    }
} 



/*

gamesearch
newgame
gamereview 
gamedetails

*/ 