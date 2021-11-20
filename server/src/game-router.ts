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
router.get('/newgame/genre/', (_request, response) => {
  gameService
    .getEnum()
    .then((data) => (data ? response.send(data) : response.status(404).send('Genre not found')))
    .catch((error) => response.status(500).send(error.message));
})

router.get('/newgame/platt/', (_request, response) => {
  gameService
    .getPlatt()
    .then((data) => (data ? response.send(data) : response.status(404).send('Platform not found')))
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

  data.game.release_date = new Date(data.game.release_date);

  gameService
    .create(data.game)
    .then((id) => response.send({ id: id }))
    .catch((error) => response.status(500).send(error));
});

//Søker etter relevante spill
router.post('/gamesearch/:query', (request, response) => {
  console.log(request.body.query)
  gameService
    .search(request.body.query)
    .then((rows) => response.send( rows ))
    .catch((error) => response.status(500).send(error));
});

router.put('/editgame/', (request, response) => {
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

  data.game.release_date = new Date(data.game.release_date);
  
  gameService
    .update(
      data.game
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
