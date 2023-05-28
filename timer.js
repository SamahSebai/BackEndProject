var cron = require("node-cron");
const {
  SendMailStudentsWork,
  SendMailStudentsPortefolio,
  SendMailStudentsDiplome,
} = require("./Controllers/Etudiant/EtudiantController");

// # ┌──────────── minute
// # │ ┌────────── hour
// # │ │ ┌──────── day of month
// # │ │ │ ┌────── month
// # │ │ │ │ ┌──── day of week
// # │ │ │ │ │
// # │ │ │ │ │
// # * * * * *
// "1,30 * * * * *"

const WorkUpdateSixMonths = () => {
  var task = cron.schedule(
    "6 * * * *",
    async () => {
      console.log("UPDATE YOUR WORK");
      await SendMailStudentsWork();
    },
    {
      scheduled: false,
    }
  );
  task.start();
};

const MailPortefolio = () => {
  var task1 = cron.schedule("7 * * * *", () => {
    console.log("mise à jour du portefolio");
    SendMailStudentsPortefolio();
  });
  var task2 = cron.schedule("8 * * * *", () => {
    console.log("UPDATE YOUR portfolio");
    SendMailStudentsPortefolio();
  });
  task1.start();
  task2.start();
};

const MailDiplome = () => {
  var task = cron.schedule("9 * * * *", () => {
    console.log("mise a jour du diplome");
    SendMailStudentsDiplome();
  });
  task.start();
};

const Timer = () => {
  console.log("sending mail");
  WorkUpdateSixMonths();
  MailPortefolio();
  MailDiplome();
};

module.exports = {
  Timer,
};
