const { Card, Category, Organization, User } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const { transporter } = require("../mailer");

class CardController {
  async create(req, res, next) {
    try {
      let {
        cardName,
        dateTimeStart,
        dateTimeFinish,
        description,
        eventAddress,
        webSite,
        categoryId,
        organizationId,
        toAccept,
        price,
        isFree,
      } = req.body;
      if (!req.files) {
        const card = await Card.create({
          cardName,
          dateTimeStart,
          dateTimeFinish,
          description,
          eventAddress,
          webSite,
          categoryId,
          organizationId,
          toAccept,
          price,
          isFree,
        });
        return res.json(card);
      }
      const { photo1, photo2, photo3 } = req.files;
      let fileName1 = uuid.v4() + ".jpg";
      let fileName2 = uuid.v4() + ".jpg";
      let fileName3 = uuid.v4() + ".jpg";

      photo1?.mv(path.resolve(__dirname, "..", "static", fileName1));
      photo2?.mv(path.resolve(__dirname, "..", "static", fileName2));
      photo3?.mv(path.resolve(__dirname, "..", "static", fileName3));

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
        price,
      });
      return res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllByCategoryId(req, res, next) {
    const { categoryId } = req.params;
    if (!categoryId) {
      return next(ApiError.internal("Название категории невалидно!"));
    }
    const category = await Category.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      return next(ApiError.internal("Такой категории не существует!"));
    }
    const cards = await Card.findAll({
      where: { categoryId: category.id, toAccept: false },
    });
    return res.json(cards);
  }

  async getAllByOrganizationId(req, res) {
    const { id } = req.params;
    const cards = await Card.findAll({
      where: { organizationId: id, toAccept: false },
    });
    return res.json(cards);
  }

  async getCardById(req, res, next) {
    try {
      const { id } = req.params;
      const card = await Card.findByPk(id);
      res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      if (!req.files) {
        const card = await Card.update(
          {
            ...req.body,
            toAccept: true,
          },
          {
            where: { id },
            raw: true,
          }
        );
        res.json(card);
      }
      const { photo1, photo2, photo3 } = req.files;
      let fileName1 = uuid.v4() + ".jpg";
      let fileName2 = uuid.v4() + ".jpg";
      let fileName3 = uuid.v4() + ".jpg";
      photo1?.mv(path.resolve(__dirname, "..", "static", fileName1));
      photo2?.mv(path.resolve(__dirname, "..", "static", fileName2));
      photo3?.mv(path.resolve(__dirname, "..", "static", fileName3));
      const card = await Card.update(
        {
          ...req.body,
          photo1: fileName1,
          photo2: fileName2,
          photo3: fileName3,
          toAccept: true,
        },
        {
          where: { id },
          raw: true,
        }
      );
      res.json(card);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getCardsToAccept(req, res, next) {
    try {
      const cards = await Card.findAll({
        where: {
          toAccept: true,
        },
      });
      return res.json(cards);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async acceptCard(req, res) {
    const { cardId } = req.params;
    const card = await Card.update(
      {
        toAccept: false,
      },
      {
        where: { id: cardId },
        raw: true,
      }
    );
    const findCard = await Card.findByPk(cardId, { raw: true });
    const organization = await Organization.findByPk(findCard.organizationId, {
      raw: true,
    });
    const user = await User.findByPk(organization.userId, {
      raw: true,
    });
    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Оформление карточки",
        html: "<p>Ваша карточка была одобрена администратором</p>",
      },
      (error, response) => {
        console.log(error, response);
      }
    );
    return res.json(card);
  }

  async rejectCard(req, res) {
    const { cardId } = req.params;
    const findCard = await Card.findByPk(cardId, { raw: true });
    const organization = await Organization.findByPk(findCard.organizationId, {
      raw: true,
    });
    const user = await User.findByPk(organization.userId);
    transporter.sendMail(
      {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Оформление карточки",
        html: `<p>Ваша карточка c названием ${findCard.cardName} была отклонена администратором.</p>`,
      },
      (error, response) => {
        console.log(error, response);
      }
    );
    const cardToDelete = await Card.destroy({
      where: { id: cardId },
    });
    return res.json(cardToDelete);
  }

  async createFromExcel(req, res) {
    const { document } = req.files;
    const uploadFilePath = path.resolve(__dirname, "../static", document.name);
    await document?.mv(uploadFilePath);
    const bufferData = xlsx.readFile(uploadFilePath);
    const ws = bufferData.Sheets[bufferData.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(ws);
    rows.forEach(async (row) => {
      const card = await Card.create(row);
      await card.save();
    });
    res.json({ message: "Все карточки были добавлены!" });
  }
}

module.exports = new CardController();
