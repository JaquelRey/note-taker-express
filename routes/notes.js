//require express, uuid
//require helpers
const noted = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readWriteAppend, readFromFile } = require('../helpers/fsUtils');


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
        console.log(`----------------------------------------------`)
        console.log(`Note: "${note.title}" will be be written to the data!`)
        console.table(note)
        console.log(`----------------------------------------------`)
        readWriteAppend(note, 'db/db.json')
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


// bonus: delete route 

// wasn't working before because I was returning the note to be removed,
// instead of returning a array without the selected note

// ...console logging to keep track of what's going on...
noted.delete("/:id", (req, res) => {
    //get the notes array
    readFromFile('db/db.json').then((data) => {
        //grabbing current note object array
        let getNotes = JSON.parse(data.toString())

        console.log(`----------------------------------------------`)
        //id of the note to be removed
        const findNote = req.params.id
        console.log(`Looking for a note with the id  ${findNote}`)
        console.log(`----------------------------------------------`)

        for (let index = 0; index < getNotes.length; index++) {
            const note = getNotes[index];
            //if a note with a matching id is found...
            if (note.id === findNote) {
                console.log(`----------------------------------------------`)
                console.log(`Found it! Note: ${note.title} Index: ${index}`)
                console.table(note)
                console.log(`----------------------------------------------`)
                //remove it from the array
                getNotes.splice(index, 1)
                console.log(`Note removed from data!`)
                console.log(`Current data:`)
                console.table(getNotes, ['title', 'id'])
                console.log(`----------------------------------------------`)
                //and then write new array to the file
                console.log(`Sending new data to file....`)
                readWriteAppend(getNotes, 'db/db.json')
                console.log(`----------------------------------------------`)

                const validres = {
                    status: 'success',
                    body: getNotes,
                };
                res.json(validres)
                break
            }
            if (index === getNotes.length && note.id != findNote) {
                console.log(`----------------------------------------------`)
                console.log(`A note with the id  ${findNote} wasn\'t found....`)
                console.log(`----------------------------------------------`)
                res.json(`A note with the id  ${findNote} wasn\'t found....`)
            }
        }
    })
})

//export router
module.exports = noted