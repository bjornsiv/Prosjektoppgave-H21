import axios from 'axios'
import { Game, Review } from './db-types';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

class ReviewService {
    get(id: number) {
        return axios.get<Review>('/reviews/' + id).then((response) => new Review(response.data));
    }
    search(gId: number) {
        return axios.get<Review[]>('/reviews/search/' + gId).then((response) => response.data.map((review) => new Review(review)));
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