const chalk = require("chalk");
const cron = require("node-cron");
const mailerService = require("./service/MailerService");

const sendMailBeforeEventTask = cron.schedule("*/30 * * * * *", async () => {
  console.log(
    chalk.blue(
      "Идет отправка писем за 8 часов до события",
      await mailerService.getUsersToNotify()
    )
  );
});

module.exports = {
  sendMailBeforeEventTask,
};
