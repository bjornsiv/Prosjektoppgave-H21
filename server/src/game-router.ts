import express from 'express';
import gameService from './game-service';
import {Game} from './db-types';

const router = express.Router();

router.get('/search/', (request, response) => {
  let find: any = request.query.find;
  if (find == null)
  {
    response.status(400).send("Missing search string")
    return;
  }
  gameService
    .search(find)
    .then((games) => response.send(games))
    .catch((error) => response.status(500).send(error));
});

router.get('/', (_request, response) => {
  gameService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/genres/', (_request, response) => {
  gameService
    .getGenres()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/platform/', (_request, response) => {
  gameService
    .getPlatforms()
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

router.put('/editgame/', (request, response) => {
  const data = request.body;
  if (! data)  {
    response.status(500).send('Missing data');
    return;
  } else if (data.title.length == 0) {
    response.status(500).send('Missing title');
    return;
  } else if (data.description.length == 0) {
    response.status(500).send('Missing description');
    return;
  }
  data.release_date = new Date(data.release_date);
  
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
