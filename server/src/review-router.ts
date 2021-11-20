import express from 'express';
import reviewService from './review-service';
import { Review } from './db-types';

const router = express.Router();

router.get('/:gId', (request, response) => {
  const gId = Number(request.params.gId)
  reviewService
    .getAll(gId)
    .then((reviews) => response.send(reviews))
    .catch((error) => response.status(500).send(error));
});

router.post('/', (request, response) => {
  const data = request.body;
  if (data.title.length == 0) {
    response.status(400).send({message:'Missing Title'});
    return;
  } else if (data.description.length == 0) {
    response.status(400).send({message:'Missing description'});
    return;
  } else if (data.score > 5 || data.score < 0) {
    response.status(400).send({message:'Illegal score'});
    return;
  } else if (data.created_at == null) {
    response.status(400).send({message:'Undefined creation date'});
    return;
  }
  reviewService
    .create(new Review(data))
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
});

router.put('/', (request, response) => {
  reviewService
    .update(new Review(request.body))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

router.delete('/:id', (request, response) => {
  reviewService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
