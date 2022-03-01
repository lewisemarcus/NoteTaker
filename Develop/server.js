const express = require('express')
const path = require('path')
const dataBase = require('./db/db.json')

const PORT = process.env.port || 3001

const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    res.json(dataBase);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

