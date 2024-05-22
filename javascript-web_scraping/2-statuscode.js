#!/usr/bin/node

// Import the request library
const request = require('request');

const url = process.argv[2];

// Check if the URL is provided
if (!url) {
  console.error('Please provide a valid URL');
  process.exit(1);
}

// Make a request to the URL and get the status code
request.get(url, (err, response) => {
  if (err) {
    // Print the error if one occurred
    console.error('Error:', err.message);
    return;
  }
  // Print the response status code if a response was received
  console.log(`code: ${response.statusCode}`);
});
