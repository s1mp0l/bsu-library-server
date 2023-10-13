const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoriesController {
    async create(req, res, next) {
        const {name, path} = req.body
        if (!name) {
            return next(ApiError.badRequest('Не задано имя категории'))
        }
        if (!path) {
            return next(ApiError.badRequest('Не задан путь категории'))
        }
        const category = await Category.create({name, path})
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getByPath(req, res, next) {
        const {categoryPath} = req.params
        const category = await Category.findOne({
            where: { path: categoryPath }
        })
        return res.json(category)
    }
}

module.exports = new CategoriesController()