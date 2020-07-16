const { requireAuth } = require("../middleware/auth.middleware");

const express = require('express')

const controller = require('../controller/product.controller')
const router = express.Router()

router.get('/', controller.index)

router.get('/search', controller.searchProducts)
module.exports = router