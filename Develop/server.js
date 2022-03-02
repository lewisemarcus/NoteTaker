const express = require('express')
const path = require('path')
const dataBase = require('./db/db.json')
const crypto = require("crypto")
const fs = require('fs')
const livereload = require('livereload')
const connectLiveReload = require("connect-livereload")

const liveReloadServer = livereload.createServer()
liveReloadServer.server.once('connection', (err) => {
    setTimeout(() => {
        liveReloadServer.refresh('/notes')
    }, 100)
})

const PORT = process.env.port || 3001

const app = express()

app.use(connectLiveReload())

//Setup app to handle data parsing in json format.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

//POST request to update webpage
app.post('/api/notes', (req, res) => {
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
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) console.error(err)
            else {

                //Data refers to data in db.json, parsedNotes is an array-like object.
                const parsedNotes = JSON.parse(data)

                parsedNotes.push(newNote)

                const notesString = JSON.stringify(parsedNotes, null, 4)

                //Write string to a JSON file for usage in pulling data from get requests.
                fs.writeFile(`./db/db.json`, notesString, (err) => {
                    if (err) {
                        fs.writeFile(`./db/db.json`, `[
                        {
                            "title":"Test Title",
                            "text":"Test text"
                        }
                    ]
                    `)
                    console.error(err)
                    }
                    else console.log(`Review for ${newNote.title} has been written to JSON file`)
                })
            }
        })

        //Creates response object containing the note json file and returns success as status.
        const response = {
            status: 'success',
            body: newNote
        }

        console.log(response)
        res.status(201).json(response)
    }
    else {
        res.status(500).json('Error in posting note')
    }
})
app.get('/api/notes', (req, res) => {
    res.json(dataBase);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params
    res.json(dataBase);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

