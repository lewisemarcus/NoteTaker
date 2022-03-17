const express = require('express')

const app = express()

const notesRouter = require('./routes/notes')
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/notesAPI')

//Setup app to handle data parsing in json format.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('handlers/public'))

app.use('/api/notes', apiRouter)

app.use('/notes', notesRouter)

app.use('*', indexRouter)

module.exports = app