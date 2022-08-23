const answerRouter = (server, fs) => {
  server.post('/answer', (request, response) => {
    fs.readFile('./data/old-answer.json', 'utf8', (error, data) => {
      if (error) {
        throw error;
      }

      let oldData = JSON.parse(data);
      let index = Object.keys(oldData).length + 1;

      oldData[index] = request.body;

      fs.writeFile('./data/old-answer.json', JSON.stringify(oldData, null, 2), 'utf8', (error) => {
        if (error) {
          throw error;
        }
      });
    });

    fs.writeFile('./data/answer.json', JSON.stringify(request.body, null, 2), 'utf8', (error) => {
      if (error) {
        throw error;
      }

      response.status(200).send('Done.');
    });
  });

  server.get('/answer', (request, response) => {
    fs.readFile('./data/answer.json', 'utf8', (error, data) => {
      if (error) {
        throw error;
      }

      response.send(JSON.parse(data));
    });
  });
}

module.exports = answerRouter;
