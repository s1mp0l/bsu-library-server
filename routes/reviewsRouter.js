const Router = require('express')
const router = new Router()
const reviewsController = require('../controllers/reviewsController')

router.get('/:bookId', reviewsController.getByBookId)

module.exports = router