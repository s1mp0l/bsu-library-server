const ApiError = require("../error/ApiError");
const {Review} = require("../models/models");

class ImagesController {
  async getByBookId(req, res, next) {
    try {
      const {bookId} = req.params
      const images = await Review.findAll({
        where: { bookId: bookId }
      })
      return res.json(images)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ImagesController()