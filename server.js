const express = require('express')

const { home, notes, noteGet, notePost, noteDelete, server, PORT } = require('./handlers')

const app = express()

//Setup app to handle data parsing in json format.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

//POST request to update webpage
app.post('/api/notes', notePost)

//Deletes each note.
app.delete('/api/notes/:id', noteDelete)

app.get('/notes', notes)

app.get('/api/notes', noteGet)

app.get('*', home)

app.listen(PORT, server)