//this file was made by copying an example from class. (except the delete helper)

const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
//first time around I attempted to do this by splice, which was backwards thinking
//instead of returning the chosen index, I need to return a NEW array... filter

//then i realized that the read and append method works fine

const readAndDelete = (newNotes, file) => {
  const newerNotes = JSON.stringify(newNotes)
  writeToFile(file, newerNotes);
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete};
