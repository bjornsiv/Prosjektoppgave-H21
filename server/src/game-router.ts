import express from 'express';
import gameService from './game-service';

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

//Hente sjanger navnene fra db
router.get('/newgame/', (_request, response) => {
  gameService
    .getEnum()
    .then((data) => (data ? response.send(data) : response.status(404).send('Genre not found')))
    .catch((error) => response.status(500).send(error.message));
})

router.post('/newgame/', (request, response) => {
  const data = request.body;
  if (! data)  {
    response.status(500).send('Missing data');
    return;
  } else if (data.game.title.length == 0) {
    response.status(500).send('Missing title');
    return;
  } else if (data.game.description.length == 0) {
    response.status(500).send('Missing description');
    return;
  }

  gameService
    .create(data.game)
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
});

router.put('/', (request, response) => {
  gameService
    .update(
      request.body
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
