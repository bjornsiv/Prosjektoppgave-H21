import express from 'express';
import reviewEvalService from './review-eval-service';

const router = express.Router();

router.get('/:gId', (request, response) => {
  const gId = Number(request.params.gId)
  reviewEvalService
    .getAll(gId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/:id', (request, response) => {
  const id = Number(request.params.id);
  reviewEvalService
    .get(id)
    .then((review) => (review ? response.send(review) : response.status(404).send('Review not found')))
    .catch((error) => response.status(500).send(error));
});

/* Do we need this? 
denne var vel fir å poste et nytt spill og den sa at alt dette måtte 
være inkludert for å sjekke at man fikk riktig input til å opprette nytt spill

router.post('/:gId', (request, response) => {
  const data = request.body;
  const id = Number(request.params.gId);
  if (! data)  {
    response.status(500).send('Missing data');
    return;
  } else if (data.name.length == 0) {
    response.status(500).send('Missing Name');
    return;
  } else if (data.description.length == 0) {
    response.status(500).send('Missing description');
    return;
  } else if (data.score > 5 || data.score < 0) {
    response.status(500).send('Illegal score');
    return;
  }
  reviewService
    .create(data, id)
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
}); */ 

router.put('/', (request, response) => {
  reviewEvalService
    .update(
      request.body
    )
    .then((_result) => response.send())
    .catch((error) => response.status(400).send(error));
});

router.delete('/:id', (request, response) => {
  reviewEvalService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
