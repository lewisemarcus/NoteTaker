const { home } = require('../handlers/handlers')

const express = require('express')
const router = express.Router()

router.get('/', home)

module.exports = router