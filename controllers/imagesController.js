const ApiError = require("../error/ApiError");
const {Image} = require("../models/models");

class ImagesController {
  async getByBookId(req, res, next) {
    try {
      const {bookId} = req.params
      const images = await Image.findAll({
        where: { bookId: bookId }
      })
      return res.json(images)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ImagesController()