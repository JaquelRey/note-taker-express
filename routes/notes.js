//require express, uuid
//require helpers
const noted = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');
const dbf = require('../db/db')


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


    } else {
        res.json('That note wasn\'t quite right....')
    }
})


//bonus delete route 
// messed it up before because I was just returning the note to be removed,
// instead of returning a new array without the selected note
noted.delete("/:id", (req, res) => {

    let arr = []

    let getNotes = arr.concat(dbf)

    console.log(getNotes)

    const findNote = req.params.id
    
    let noteId = 0

    let note = getNotes[noteId]

    console.log(note)

    if (note.id === findNote ) {

        getNotes.slice(noteId, (noteId + 1))
        readAndDelete(getNotes, 'db/db.json')

        const validres = {
            status: 'success',
            body: `Note ID #${noteId} has been vanquished.`,
        }
        res.json(validres)

    } else if (findNote !== note.id && noteId === getNotes.length) {
        res.json(`Note ID #${noteId} wasn\'t found....`)
    }
    else {
        noteId++
    }

})

//export
module.exports = noted