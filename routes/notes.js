const { notes } = require('../handlers/handlers')

const express = require('express')
const router = express.Router()

router.get('/', notes)

module.exports = router