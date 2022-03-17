const fs = require('fs')
const path = require('path')
const dataBase = require('../db/db.json')
const crypto = require("crypto")


const PORT = process.env.PORT || 3001

exports.PORT = PORT

exports.home = (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))

exports.notes = (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html'))

exports.noteGet = (req, res) => res.status(201).json(dataBase)

exports.server = () => console.log(`Example app listening at http://localhost:${PORT}`)

exports.noteDelete = (req, res) => {
    let note
    const idDatabase = []
    //Log id and Log that a DELETE request was received
    console.info(`${req.method} request received to delete a note with id: ${req.params.id}`)
    for(let each of dataBase) {
        idDatabase.push(each.id)
    }
    for (let each of dataBase) {

        if(idDatabase.indexOf(req.params.id) == -1) {
            const response = {
                status: 'delete error',
                body: note
            }
            res.status(500).json(response)
        }
        else if (each.id == req.params.id) {
            dataBase.splice(dataBase.indexOf(each), 1)
            note = each

            //Write string to a JSON file for usage in pulling data from get requests.
            fs.writeFile(`./db/db.json`, JSON.stringify(dataBase, null, 4), (err) => err ? console.error(err) : console.info('database updated'))

            const response = {
                status: 'delete success',
                body: note
            }

            //Return 'delete success' status and deleted note as response in json format.
            console.info(response)
            res.status(201).json(response)
        }
    }
}

exports.notePost = async (req, res) => {

    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`)

    //Uses crpyto pacakge from node to create a random id value to assign to each note.
    const id = crypto.randomBytes(16).toString("hex");

    //Destructuring user input from note page.
    const { title, text } = req.body

    //Checks if user input exists, then creates new note object.
    if (title && text) {
        const newNote = {
            title,
            text,
            id
        }

        //Obatin existing notes.
        fs.readFile('./db/db.json', 'utf8', (err) => {
            if (err)
                console.error(err)
            else {
                dataBase.push(newNote)
                const notesString = JSON.stringify(dataBase, null, 4)

                //Write string to a JSON file for usage in pulling data from get requests.
                fs.writeFile(`./db/db.json`, notesString, (err) => err ? console.error(err) : console.info(`Note ${newNote.title} has been written to JSON file`))
            }
        })

        //Creates response object containing the note json file and returns success as status.
        const response = {
            status: 'success',
            body: newNote
        }

        //Return new note and 'success' as response in json format.
        console.info(response)
        await res.status(201).json(response)
    }
    else {
        res.status(500).json('Error in posting note')
    }
}