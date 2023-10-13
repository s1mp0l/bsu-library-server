const Router = require('express')
const router = new Router()
const imagesController = require('../controllers/imagesController')

router.get('/:bookId', imagesController.getByBookId)

module.exports = router