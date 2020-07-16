const express = require('express')
const multer  = require('multer')

const controller = require('../controller/user.controller')
const validate = require('../validate/user.validate')

const upload = multer({ dest: 'publics/uploads/' })

const router = express.Router()

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)

router.get('/:id', controller.view)

router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate)

module.exports = router