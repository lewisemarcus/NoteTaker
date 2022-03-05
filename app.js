const express = require('express')

const app = express()
const notesRouter = require('./routes/notes')
const indexRouter = require('./routes/index')

const { noteGet, notePost, noteDelete } = require('./handlers/handlers')

//Setup app to handle data parsing in json format.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

//POST request to update webpage
app.post('/api/notes', notePost)

//Deletes each note.
app.delete('/api/notes/:id', noteDelete)

app.get('/api/notes', noteGet)

app.use('/notes', notesRouter)
app.use('*', indexRouter)

module.exports = app