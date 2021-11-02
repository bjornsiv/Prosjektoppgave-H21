import express from 'express';
import router from './db-router'
const app = express();

app.use(express.json());

app.use('/api/v2', router);

export default app;
