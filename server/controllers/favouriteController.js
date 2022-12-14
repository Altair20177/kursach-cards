const { Favourite, Card } = require("../models/models");
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

  async getAllByUserId(req, res) {
    const { userId } = req.params;
    const cards = await Favourite.findAll({ where: { userId } });
    const favouritesCards = await Promise.all(
      cards.map((card) => Card.findOne({ where: { id: card.cardId } }))
    );

    return res.json(favouritesCards);
  }

  async deleteCardFromFavourites(req, res) {
    const { userId, cardId } = req.params;
    console.log('user', userId);
    console.log('card', cardId);
    const card = await Favourite.destroy({ where: { cardId, userId } });

    return res.json(card);
  }
}

module.exports = new FavouriteController();
