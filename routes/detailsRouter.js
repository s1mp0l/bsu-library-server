const Router = require('express')
const router = new Router()
const detailsController = require('../controllers/detailsController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.get('/:bookId', detailsController.getByBookId)
router.post('/', checkRole('ADMIN'), detailsController.create)

module.exports = router