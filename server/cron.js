const chalk = require("chalk");
const cron = require("node-cron");
const mailerService = require("./service/MailerService");

const sendMailBeforeEventTask = cron.schedule(
  "*/5 * * * * *",
  async () => {
    console.log(chalk.blue("Идет отправка писем за 8 часов до события"));
    await mailerService.getUsersToNotify();
  },
  {
    scheduled: false,
  }
);

const removeExpiredEvents = cron.schedule(
  "*/5 * * * * *",
  async () => {
    console.log(chalk.red("Идет удаление прошедших ивентов!!!".toUpperCase()));
    await mailerService.removeExpiredCards();
  },
  {
    scheduled: false,
  }
);

const initSchedules = () => {
  sendMailBeforeEventTask.start();
  removeExpiredEvents.start();
};

const stopSchedules = () => {
  sendMailBeforeEventTask.stop();
  removeExpiredEvents.stop();
};

module.exports = {
  initSchedules,
  stopSchedules,
};
