import axios from 'axios'
import { Game, Review, ReviewEvaluation } from './db-types';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

class ReviewEvalService {
    get(id: number) {
        return axios.get<ReviewEvaluation[]>('/review-evals/' + id).then((response) => response.data);
    }
    post(reviewId: number, userId: number){
        return axios.post<{id:number}>(`/review-evals/${reviewId}/${userId}`).then((response) => response.data.id);
    }
    delete(id:number) {
        return axios.delete<Game>('/review-evals/' + id);
    }
} 

const reviewEvalService = new ReviewEvalService;
export default reviewEvalService;


/*

gamesearch
newgame
gamereview 
gamedetails

*/ 