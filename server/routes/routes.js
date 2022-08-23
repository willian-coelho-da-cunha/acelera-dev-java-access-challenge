const answerRouter = require('./answer-router');

const serverRouter = (server, fs) => {
  server.get('/', (request, response) => {
    response.send('Welcome to the api-server.');
  });

  answerRouter(server, fs);
}

module.exports = serverRouter;
