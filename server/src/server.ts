import app from './app';
import express from 'express';
import path from 'path';
import http from 'http';

app.use(express.static(path.join(__dirname, '/../../client/public')));

const chatServer = http.createServer(app);

const port = 3000;


chatServer.listen(chatPort, () => {
  console.info(`Server running on port ${port}`);
});