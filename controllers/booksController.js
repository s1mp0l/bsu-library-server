const {Book, Category, Image} = require("../models/models");
const uuid = require('uuid')
const path = require('path')
const ApiError = require("../error/ApiError");

class BooksController {
    async create(req, res, next) {
        try {
            const {
                title,
                authors,
                issueYear,
                rating,
                about,
                status,
                categoryId
            } = req.body
            const {img} = req.files
            let filename = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            const book = await Book.create({
                title,
                authors,
                issueYear,
                rating,
                about,
                status,
                categoryId
            })

            const image = await Image.create({
                path: filename,
                alt: title,
                bookId: book.id
            })

            return res.json(book)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {sortBy, searchInput, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        let options = {
            limit, offset
        };

        if (sortBy) {
            options = {...options,
                order: sortBy
            }
        }
        if (searchInput) {
            options = {...options,
                where: {title: searchInput}
            }
        }

        const books = await Book.findAndCountAll(options)

        return res.json(books)
    }

    async getByCategoryPath(req, res) {
        const {categoryPath} = req.params
        const category = await Category.findOne({
            where: { path: categoryPath }
        })
        if (!category) return res.json([])
        const books = await Book.findAll({
            where: { categoryId: category.id }
        })
        return res.json(books)
    }

    async getWithHighRating(req, res) {
        const books = await Book.findAll({
            where: { rating: 5 }
        })
        return res.json(books)
    }
}

module.exports = new BooksController()