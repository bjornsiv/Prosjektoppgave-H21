import express from 'express';
import reviewService from './review-service';

const router = express.Router();

router.get('/gamereviews/:gId', (request, response) => {
  const gId = Number(request.params.gId)
  reviewService
    .getAll(gId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/gamereviews/:id', (request, response) => {
  const id = Number(request.params.id);
  reviewService
    .get(id)
    .then((review) => (review ? response.send(review) : response.status(404).send('Review not found')))
    .catch((error) => response.status(500).send(error));
});

router.post('/gamereviews/new/:gId', (request, response) => {
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
});

router.put('/gamereviews', (request, response) => {
  reviewService
    .update(
      request.body
    )
    .then((_result) => response.send())
    .catch((error) => response.status(400).send(error));
});

router.delete('/gamereviews/:id', (request, response) => {
  reviewService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
