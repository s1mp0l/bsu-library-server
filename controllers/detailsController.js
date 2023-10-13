const ApiError = require("../error/ApiError");
const {BookDetails, Category} = require("../models/models");

class DetailsController {
    async create(req, res) {
        const {
            publisher,
            year,
            pages,
            cover,
            format,
            genre,
            weight,
            isbn,
            manufacturer,
            bookId
        } = req.body

        const details = await BookDetails.create({
            publisher,
            year,
            pages,
            cover,
            format,
            genre,
            weight,
            isbn,
            manufacturer,
            bookId
        })

        return res.json(details)
    }

    async getByBookId(req, res, next) {
        try {
            const {bookId} = req.params
            const detail = await BookDetails.findOne({
                where: { bookId: bookId }
            })
            return res.json(detail)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DetailsController()