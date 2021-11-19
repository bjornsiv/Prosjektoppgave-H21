import express from 'express';
import reviewEvalService from './review-eval-service';

const router = express.Router();

router.post('/:rId/:uId/', (request, response) => {
  reviewEvalService
    .create(Number(request.params.rId), Number(request.params.uId))
    .then((result) => (response.send({id:result})))
    .catch((error) => response.status(500).send({message: error}));
});

router.delete('/:id', (request, response) => {
  reviewEvalService
    .delete(Number(request.params.id))
    .then((_result) => (response.send()))
    .catch((error) => response.status(500).send({message: error}));
});

router.get('/:rId', (request, response) => {
  reviewEvalService
    .get(Number(request.params.rId))
    .then((evals) => response.send(evals))
    .catch((error) => response.status(500).send({message: error}));
});

router.get('/hasEvaluated/:rId/:uId', (request, response) => {
  reviewEvalService
    .has_evaluated(Number(request.params.rId), Number(request.params.uId))
    .then((result) => response.send({result: result}))
    .catch((error) => response.status(500).send({message: error}));
});

export default router;
