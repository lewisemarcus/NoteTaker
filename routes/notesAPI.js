const { noteGet, notePost, noteDelete } = require('../handlers/handlers')

const express = require('express')
const router = express.Router()

//POST request to update webpage
router.post('/', notePost)

//Deletes each note.
router.delete('/:id', noteDelete)

router.get('/', noteGet)

module.exports = router