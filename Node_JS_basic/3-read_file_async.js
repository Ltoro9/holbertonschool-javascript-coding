const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  let data;
  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    reject(Error('Cannot load the database'));
    return;
  }

  const lines = data.split('\n');
  const students = lines.map((line) => line.split(','));

  students.shift(); // remove headers
  const fieldsAndStudents = {};

  for (const student of students) {
    // Check if student has enough elements
    if (student.length >= 4) {
      const studentName = student[0];
      const field = student[3].replace('\r', '');
      // Create field(if not exist) and append names as a list
      if (fieldsAndStudents[`${field}`]) {
        fieldsAndStudents[`${field}`].push(studentName);
      } else {
        fieldsAndStudents[`${field}`] = [studentName];
      }
    }
  }
  let totalStudents = 0;
  for (const namesList of Object.values(fieldsAndStudents)) {
    totalStudents += namesList.length;
  }
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, names] of Object.entries(fieldsAndStudents)) {
    console.log(
      `Number of students in ${field}: ${names.length}. List: ${names.join(
        ', ',
      )}`,
    );
  }
  resolve('ok');
});
module.exports = countStudents;
