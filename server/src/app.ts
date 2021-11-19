import express from 'express';
import reviews from './review-router';
import reviewEvals from './review-eval-router';
import games from './game-router';
const app = express();

app.use(express.json());

app.use('/api/v1/review-evals', reviewEvals);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/games', games); 

export default app;


//app.ts hoster server
