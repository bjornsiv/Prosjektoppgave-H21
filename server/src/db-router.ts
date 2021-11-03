import express from 'express';
import taskService from './db-service';

const router = express.Router();

router.get('/tasks', (_request, response) => {
  taskService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/tasks/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .get(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

router.post('/tasks', (request, response) => {
  const data = request.body;
  if (data && data.title.length != 0)
    taskService
      .create(data.title, data.description)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(500).send('Missing task title or description');
});

router.delete('/tasks/:id', (request, response) => {
  taskService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

router.put('/tasks/:id', (request, response) => {
  taskService
    .updateTask(
      Number(request.params.id),
      request.body.title,
      request.body.description,
      request.body.done
    )
    .then((_result) => response.send())
    .catch((error) => response.status(400).send(error));
});

export default router;
