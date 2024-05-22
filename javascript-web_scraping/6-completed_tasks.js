#!/usr/bin/node

// Import the request module
const request = require('request');

// Get the API URL from the command line args
const apiUrl = process.argv[2];

// Check if the API URL is provided
if (!apiUrl) {
  console.error('Please provide a valid API URL');
}

// Make a request to the API
request(apiUrl, { json: true }, (err, response, body) => {
  if (err) {
    // Print the error message if an error occurred
    console.error(err.message);
  }

  if (response.statusCode !== 200) {
    // Print an error message if the status code is not 200
    console.error('Failed to fetch data:', response.statusCode);
  }

  // Initialize an obj to store the number of completed tasks for each user
  const completedTasks = {};

  body.forEach((task) => {
    // Check if the task is completed
    if (task.completed) {
      // Increment the count of completed tasks for the user
      completedTasks[task.userId] = (completedTasks[task.userId] || 0) + 1;
    }
  });
  // Print the number of completed tasks for each user
  console.log(completedTasks);
});
