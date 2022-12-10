const { Favourite } = require("../models/models");
const ApiError = require("../error/ApiError");

class FavouriteController {
  async create(req, res, next) {
    try {
      const { timeNotification, userId, cardId } = req.body;

      const favourite = await Favourite.create({
        timeNotification,
        userId,
        cardId,
      });

      return res.json(favourite);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const favourites = await Favourite.findAll();
    return res.json(favourites);
  }
}

module.exports = new FavouriteController();
