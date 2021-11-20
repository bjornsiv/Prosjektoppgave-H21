import axios from 'axios'
import { Game, Review } from './db-types';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

class ReviewService {
    get(id: number) {
        return axios.get<Review>('/reviews/single/' + id).then((response) => response.data);
    }
    getAll(gId: number) {
        return axios.get<Review[]>('/reviews/' + gId).then((response) => response.data);
    }
    search() {
        return axios.get<Review>('/reviews/gamesearch').then((response) => response.data);
    }
    create(review: Review){
        return axios.post<Review>('/reviews/', review).then((response) => response.data.id);
    }
    delete(id:number) {
        return axios.delete<Game>('/reviews/' + id);
    }
    update(review: Review){
        return axios.put<Review>('/reviews/', review)
        .then((response) => response.data);
    }
} 

const reviewservice = new ReviewService;
export default reviewservice;


/*

gamesearch
newgame
gamereview 
gamedetails

*/ 