const { Organization } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class OrganizationController {
  async create(req, res, next) {
    try {
      const {
        name,
        categoryId,
        description,
        phone,
        organizationAddress,
        webSite,
      } = req.body;
      const { photo1, photo2, photo3, photo4, photo5 } = req.files;

      let fileName1 = uuid.v4() + ".jpg";
      let fileName2 = uuid.v4() + ".jpg";
      let fileName3 = uuid.v4() + ".jpg";
      let fileName4 = uuid.v4() + ".jpg";
      let fileName5 = uuid.v4() + ".jpg";

      photo1.mv(path.resolve(__dirname, "..", "static", fileName1));
      photo2.mv(path.resolve(__dirname, "..", "static", fileName2));
      photo3.mv(path.resolve(__dirname, "..", "static", fileName3));
      photo4.mv(path.resolve(__dirname, "..", "static", fileName4));
      photo5.mv(path.resolve(__dirname, "..", "static", fileName5));

      const organization = await Organization.create({
        name,
        categoryId,
        description,
        phone,
        organizationAddress,
        webSite,
        photo1: fileName1,
        photo2: fileName2,
        photo3: fileName3,
        photo4: fileName4,
        photo5: fileName5,
      });
      return res.json(organization);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { organization } = req.params;
    const organizationToSend = await Organization.findOne({
      where: { webSite: `${organization}.by` },
    });
    return res.json(organizationToSend);
  }
}

module.exports = new OrganizationController();
