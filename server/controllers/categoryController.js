const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
  async create(req, res) {
    const { categoryName } = req.body;
    const category = await Category.create({ categoryName });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }

  async getOne(req, res) {
    const { categoryName } = req.params;
    const category = await Category.findOne({ where: { categoryName } });
    return res.json(category);
  }
}

module.exports = new CategoryController();
