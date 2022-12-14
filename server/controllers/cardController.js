const { Card, Category } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CardController {
  async create(req, res, next) {
    try {
      const {
        cardName,
        dateTimeStart,
        dateTimeFinish,
        description,
        eventAddress,
        webSite,
        categoryId,
        organizationId,
        toAccept,
      } = req.body;
      const { photo1, photo2, photo3 } = req.files;

      console.log("card", cardName);

      let fileName1 = uuid.v4() + ".jpg";
      let fileName2 = uuid.v4() + ".jpg";
      let fileName3 = uuid.v4() + ".jpg";

      photo1.mv(path.resolve(__dirname, "..", "static", fileName1));
      photo2.mv(path.resolve(__dirname, "..", "static", fileName2));
      photo3.mv(path.resolve(__dirname, "..", "static", fileName3));

      const card = await Card.create({
        cardName,
        dateTimeStart,
        dateTimeFinish,
        description,
        eventAddress,
        webSite,
        categoryId,
        organizationId,
        photo1: fileName1,
        photo2: fileName2,
        photo3: fileName3,
        toAccept,
      });
      return res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllByCategoryId(req, res, next) {
    const { categoryName } = req.body;
    if (!categoryName) {
      return next(ApiError.internal("Название категории невалидно!"));
    }
    const category = await Category.findOne({ where: { categoryName } });
    if (!category) {
      return next(ApiError.internal("Такой категории не существует!"));
    }
    const cards = await Card.findAll({
      where: { categoryId: category.id, toAccept: false },
    });
    return res.json(cards);
  }

  async getAllByOrganizationId(req, res) {
    const { organizationId } = req.body;
    const cards = await Card.findAll({
      where: { organizationId, toAccept: false },
    });
    return res.json(cards);
  }

  async getCardsToAccept(req, res) {
    const cards = await Card.findAll({
      where: { toAccept: true },
    });
    return res.json(cards);
  }
}

module.exports = new CardController();
