//this file was made by copying an example from class, with modification to add functionality for this project

const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  if (Array.isArray(content)) {
    console.log("Writing array over DB")
    writeToFile(file, content);
    return;
  }
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Writing object to DB")
      let parsedData = JSON.parse(data);
      console.log(parsedData)
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//first time around I attempted to do this by use of a new function on the fs side
//then i realized that my issues were on the routing side. only passing readandappend 

module.exports = { readFromFile, readAndAppend };
