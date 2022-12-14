const { RequestToAdmin, Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class RequestController {
  async create(req, res, next) {
    try {
      const { organizationName, address, phone, userId, categoryName } =
        req.body;

      const category = await Category.findOne({ where: { categoryName } });

      const request = await RequestToAdmin.create({
        organizationName,
        address,
        phone,
        userId,
        categoryId: category.id,
      });

      return res.json(request);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const request = await RequestToAdmin.findOne({
      where: { id },
    });
    return res.json(request);
  }

  async getAll(req, res) {
    const requests = await RequestToAdmin.findAll();
    return res.json(requests);
  }
}

module.exports = new RequestController();
