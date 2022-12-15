const {
  RequestToAdmin,
  Category,
  User,
  Organization,
} = require("../models/models");
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

    const categories = await Promise.all(
      requests.map((request) =>
        Category.findOne({ where: { id: request.categoryId } })
      )
    );

    const users = await Promise.all(
      requests.map((request) => User.findOne({ where: { id: request.userId } }))
    );

    const newArr = [];

    requests.forEach((request, index) => {
      newArr.push({
        id: request.id,
        organizationName: request.organizationName,
        address: request.address,
        userEmail: users[index].email,
        category: categories[index].categoryName,
      });
    });

    return res.json(newArr);
  }

  async acceptRequest(req, res) {
    const { id } = req.params;
    const request = await RequestToAdmin.findOne({
      where: { id },
    });

    await User.update(
      {
        userRole: "admin",
      },
      {
        where: { id: request.userId },
      }
    );

    const organization = await Organization.create({
      name: request.organizationName,
      categoryId: request.categoryId,
      phone: request.phone,
      organizationAddress: request.address,
      userId: request.userId,
    });

    await RequestToAdmin.destroy({
      where: { id },
    });

    return res.json(organization);
  }

  async rejectRequest(req, res) {
    const { id } = req.params;

    const request = await RequestToAdmin.destroy({
      where: { id },
    });

    return res.json(request);
  }
}

module.exports = new RequestController();
