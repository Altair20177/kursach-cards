const { Organization, Card } = require("../models/models");
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
        workTime,
      } = req.body;
      const { photo1, photo2, photo3, photo4, photo5 } = req.files;

      let fileName1 = uuid.v4() + ".jpg";
      let fileName2 = uuid.v4() + ".jpg";
      let fileName3 = uuid.v4() + ".jpg";
      let fileName4 = uuid.v4() + ".jpg";
      let fileName5 = uuid.v4() + ".jpg";

      photo1?.mv(path.resolve(__dirname, "..", "static", fileName1));
      photo2?.mv(path.resolve(__dirname, "..", "static", fileName2));
      photo3?.mv(path.resolve(__dirname, "..", "static", fileName3));
      photo4?.mv(path.resolve(__dirname, "..", "static", fileName4));
      photo5?.mv(path.resolve(__dirname, "..", "static", fileName5));

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
        workTime,
      });
      await organization.save();
      return res.json(organization);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(_, res) {
    const organizations = await Organization.findAll();
    return res.json(organizations);
  }

  async getOne(req, res) {
    const { organization } = req.params;
    const organizationToSend = await Organization.findOne({
      where: { webSite: `${organization}.by` },
    });
    return res.json(organizationToSend);
  }

  async getCardsFromOrganization(req, res) {
    const { userId } = req.params;
    const organization = await Organization.findOne({ where: { userId } });

    const cards = await Card.findAll({
      where: { organizationId: organization?.id, toAccept: false },
    });

    return res.json(cards);
  }

  async getOrganizationByAdminId(req, res) {
    const { userId } = req.params;
    const organization = await Organization.findOne({ where: { userId } });

    return res.json(organization);
  }

  async updateOrganization(req, res) {
    const { id } = req.params;
    const {
      name,
      categoryId,
      description,
      phone,
      organizationAddress,
      webSite,
      workTime,
      workTimeEnd,
    } = req.body;
    if (!req.files) {
      await Organization.update(
        {
          name,
          categoryId,
          description,
          phone,
          organizationAddress,
          webSite,
          workTime,
          workTimeEnd,
        },
        {
          where: { id },
        }
      );
      return res.json(id);
    }
    const { photo1, photo2, photo3, photo4, photo5 } = req.files;

    let fileName1 = uuid.v4() + ".jpg";
    let fileName2 = uuid.v4() + ".jpg";
    let fileName3 = uuid.v4() + ".jpg";
    let fileName4 = uuid.v4() + ".jpg";
    let fileName5 = uuid.v4() + ".jpg";

    photo1?.mv(path.resolve(__dirname, "..", "static", fileName1));
    photo2?.mv(path.resolve(__dirname, "..", "static", fileName2));
    photo3?.mv(path.resolve(__dirname, "..", "static", fileName3));
    photo4?.mv(path.resolve(__dirname, "..", "static", fileName4));
    photo5?.mv(path.resolve(__dirname, "..", "static", fileName5));

    const organization = await Organization.update(
      {
        name,
        categoryId,
        description,
        phone,
        organizationAddress,
        webSite,
        workTime,
        workTimeEnd,
        photo1: fileName1,
        photo2: fileName2,
        photo3: fileName3,
        photo4: fileName4,
        photo5: fileName5,
      },
      {
        where: { id },
      }
    );

    return res.json(organization);
  }
}

module.exports = new OrganizationController();
