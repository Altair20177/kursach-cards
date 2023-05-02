const uuid = require("uuid");
const path = require("path");
const { News } = require("../models/models");
const ApiError = require("../error/ApiError");

class NewsController {
  async getAll(_, res) {
    res.json(await News.findAll());
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const news = await News.findByPk(id);
      if (!news) {
        throw new Error(`Новости с id ${id} не существует!`);
      }
      res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async create(req, res, next) {
    try {
      const { name, description } = req.body;
      let image = req.files?.image;
      if (!image) {
        image = req.body?.image;
      }
      const fileName = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));
      const instance = await News.create({
        name,
        description,
        image: fileName,
      });
      const savedInstance = await instance.save();
      res.json(savedInstance);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      let image = req.files?.image;
      if (!image) {
        image = req.body?.image;
      }
      if (typeof image === "string") {
        await News.update(
          { name, description },
          {
            where: {
              id,
            },
          }
        );
        res.json(await News.findByPk(id));
      }
      const existingNews = await News.findByPk(id);
      if (existingNews.image === image) {
        res.json(await News.findByPk(id));
      }
      const fileName = uuid.v4() + ".jpg";
      image.mv(path.resolve(__dirname, "..", "static", fileName));
      await News.update(
        { name, description, image: fileName },
        {
          where: {
            id,
          },
        }
      );
      res.json(await News.findByPk(id));
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await News.destroy({
        where: {
          id,
        },
      });
      res.json(id);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new NewsController();
