//require express, uuid
//require helpers
const noted = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');


//get route for all saved notes (read db json file)
noted.get('/', (req, res) =>
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)))
)

//post route to create new note
noted.post('/', (req, res) => {
    const { title, text } = req.body
    //items in req.body
    //if req is valid,
    //create new note object
    if (title && text) {
        const note = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(note, 'db/db.json')
        //(read and) append to db json using fs
        //success response
        const validres = {
            status: 'success',
            body: note,
        };
        res.json(validres)
        //else error

        //delete route to remove a note by id
    } else {
        res.json('That note wasn\'t quite right....')
    }
})


//bonus delete route 
noted.delete("/:id", (req, res) => {
    let notes = readFromFile("./db/db.json", "utf8")
    const noteId = req.params.id

    const getNote = notes.indexOf(note => {
        return note.id === noteId;
    })

    if (getNote) {
        readAndDelete(getNote, 'db/db.json')
        //(read and) append to db json using fs
        //success response
        const validres = {
            status: 'success',
            body: `Note ID #${noteId} has been vanquished.`,
        };
        res.json(validres)

    } else {
        res.json('Couldn\'t find a note with a matching id...')
    }
})

//export
module.exports = noted