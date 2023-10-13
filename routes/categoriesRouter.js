const Router = require('express')
const router = new Router()
const categoriesController = require('../controllers/categoriesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/:categoryPath', categoriesController.getByPath)
router.get('/', categoriesController.getAll)
router.post('/', checkRole('ADMIN'), categoriesController.create)

module.exports = router