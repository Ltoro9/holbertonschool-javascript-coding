const express = require('express');
// Import the Express module
const args = process.argv.slice(2);
const countStudents = require('./3-read_file_async');

const database = args[0];

const app = express();
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define /students endpoint
app.get('/students', async (req, res) => {
  // Get the database argument
  const msg = 'This is the list of our students\n';

  // Check if the database argument is not passed
  try {
    const students = await countStudents(database);
    // Send the response
    res.send(`${msg}${students.join('\n')}`);
    // If error occurs
  } catch (error) {
    // Send the response
    res.send(`${msg}${error.message}`);
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
