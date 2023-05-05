const { Op } = require("sequelize");
const ApiError = require("../error/ApiError");
const { transporter } = require("../mailer");
const { User, Card, Organization } = require("../models/models");
const { Sequelize } = require("../db");
const chalk = require("chalk");

class MailerService {
  async getUsersToNotify() {
    try {
      const cards = await Card.findAll({
        where: {
          dateTimeStart: {
            [Op.lte]: Sequelize.literal("NOW() + INTERVAL '8 hours'"),
          },
          toAccept: false,
        },
        attributes: [
          "organizationId",
          "dateTimeStart",
          "cardName",
          "eventAddress",
        ],
        raw: true,
      });
      if (!cards.length) {
        return;
      }
      const organizationIds = [...cards].map((card) => card.organizationId);
      let organizations = await Organization.findAll({
        where: {
          id: [...new Set(organizationIds)],
        },
        attributes: ["id", "userId"],
        raw: true,
      });
      const usersId = new Set([...organizations].map((org) => org.userId));
      console.log(usersId);
      const users = await User.findAll({
        where: {
          id: [...usersId],
        },
        attributes: ["id", "email"],
        raw: true,
      });
      organizations = [...organizations].map((organization) => {
        return {
          ...organization,
          cards: [...cards].filter(
            (card) => card.organizationId === organization.id
          ),
          user: [...users].find((user) => user.id === organization.userId),
        };
      });
      organizations.forEach((organization) => {
        organization.cards.forEach((card) => {
          transporter.sendMail(
            {
              from: process.env.EMAIL,
              to: organization.user.email,
              subject: "Скоро важное мероприятие!",
              html: `<p>Скоро состоится мероприятие под названием ${
                card.cardName
              }. Ждем вас ${new Date(
                card.dateTimeStart
              ).toLocaleDateString()} по адресу ${card.eventAddress}</p>`,
            },
            (error, response) => {
              console.log(error, response);
            }
          );
        });
      });
    } catch (err) {
      console.log(chalk.red("mailer has returned error: ", err));
    }
  }
}

module.exports = new MailerService();
