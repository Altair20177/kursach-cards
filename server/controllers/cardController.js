const { Card } = require("../models/models");
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
      } = req.body;
      const { photo1, photo2, photo3 } = req.files;

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
      });
      return res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const cards = await Card.findAll();
    return res.json(cards);
  }
}

module.exports = new CardController();
