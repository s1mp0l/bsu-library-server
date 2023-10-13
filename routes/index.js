const Router = require('express')
const router = new Router()

const booksRouter = require('./booksRouter')
const detailsRouter = require('./detailsRouter')
const userRouter = require('./userRouter')
const categoriesRouter = require('./categoriesRouter')
const imagesRouter = require('./imagesRouter')
const reviewsRouter = require('./reviewsRouter')

router.use('/books', booksRouter)
router.use('/categories', categoriesRouter)
router.use('/book', detailsRouter)
router.use('/user', userRouter)
router.use('/image', imagesRouter)
router.use('/reviews', reviewsRouter)

module.exports = router