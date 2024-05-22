#!/usr/bin/node

// Import the request library
const request = require('request');

const apiUrl = process.argv[2]; // The URL to fetch the data from
const characterId = '18'; // The character ID to search for

// Check if the URL is provided
if (!apiUrl) {
  console.error('Please provide a valid URL');
  process.exit(1);
}

// Check if the character ID is provided
if (!characterId) {
  console.error('Please provide a character ID');
  process.exit(1);
}

// Check if the URL is provided
request(apiUrl, (err, response) => {
  if (err) {
    // Print the error if one occurred
    console.error('Error:', err.message);
    return;
  }

  // Check if the response status code is not 200
  if (response.statusCode !== 200) {
    // Print an error message if the status code is not 200
    console.error('Failed to fetch data:', response.statusCode);
    return;
  }

  // Parse the JSON response
  try {
    const movies = JSON.parse(response.body).results;
    // Initialize a count variable to store the number of times the character appears
    let count = 0;

    // Loop through the movies and count the number of times the character appears
    movies.forEach((movie) => {
      // Check if the character ID is in the list of characters for the movie
      movie.characters.forEach((character) => {
        if (character.includes(characterId)) {
          // Increment the count if the character ID is found
          count += 1;
        }
      });
    });

    // Print the number of times the character appears
    console.log(count);
  } catch (parseError) {
    // Print an error if the JSON parsing fails
    console.error('Error parsing JSON:', parseError);
  }
});
