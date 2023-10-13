const Router = require('express')
const router = new Router()
const booksController = require('../controllers/booksController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', booksController.getAll)
router.get('/best', booksController.getWithHighRating)
router.get('/:categoryPath', booksController.getByCategoryPath)
router.post('/', checkRole('ADMIN'), booksController.create)

module.exports = router