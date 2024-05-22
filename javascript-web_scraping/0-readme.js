#!/usr/bin/node

const fs = require('fs');

const filePath = process.argv[2];

// If no file path is provided, print an error message and exit with a non-zero status code
if (!filePath) {
  console.error('Error: ENOENT: no such file or directory');
  process.exit(1);
}

fs.readFile(filePath, 'utf-8', (err, data) => {
  // If an error occurred, print it and exit with a non-zero status code
  if (err) {
    console.error(err);
    return;
  }
  // Print the data if no error occurred
  console.log(data);
});
