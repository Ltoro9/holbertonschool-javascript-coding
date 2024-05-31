const http = require('http');
// Import the HTTP module
const args = process.argv.slice(2); // Get the arguments
const countStudents = require('./3-read_file_async');
// Import the countStudents function
const database = args[0]; // Get the database argument

// Create an HTTP server
const app = http.createServer(async (req, res) => {
  // Set the response status code and header
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // Get the URL
  const { url } = req;

  // Check the URL
  if (url === '/') {
    // Send the response
    res.write('Hello Holberton School!');
    // If the database argument is not provided
  } else if (url === '/students') {
    // Send the response
    res.write('This is the list of our students\n');
    // Try to count the students
    try {
      const students = await countStudents(database);
      res.end(`${students.join('\n')}`);
      // If an error occurs
    } catch (error) {
      // Send the error message
      res.end(error.message);
    }
  }
  // Send not fond status code if the URL is not valid
  res.statusCode = 404;
  // End the connection
  res.end();
});

// Set server's port
app.listen(1245, () => {
  // Log the server's port
  console.log('Server is listening on port 1245');
});

// Export the app variable
module.exports = app;
