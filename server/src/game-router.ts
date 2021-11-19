import express from 'express';
import gameService from './game-service';
import {Game} from './db-types';

const router = express.Router();

router.get('/', (_request, response) => {
  gameService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/:id', (request, response) => {
  const id = Number(request.params.id);
  gameService
    .get(id)
    .then((game) => (game ? response.send(game) : response.status(404).send('Game not found')))
    .catch((error) => response.status(500).send(error));
});

router.post('/', (request, response) => {
  const data = request.body;
  if (data.title.length == 0) {
    response.status(400).send({message:'Missing title'});
    return;
  } else if (data.description.length == 0) {
    response.status(400).send({message:'Missing description'});
    return;
  } else if (data.release_date == null) {
    response.status(400).send({message:'Undefined release date'});
    return;
  }
  gameService
    .create(new Game(data))
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
});

router.put('/', (request, response) => {
  gameService
    .update(
      new Game(request.body)
    )
    .then((_result) => response.send())
    .catch((error) => response.status(400).send(error));
});

router.delete('/:id', (request, response) => {
  gameService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
