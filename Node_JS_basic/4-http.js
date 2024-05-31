const http = require('http');

const app = http.createServer((req, res) => {
  // Making response with res.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Send response
  res.end('Hello Holberton School!');
});

// Port active
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
