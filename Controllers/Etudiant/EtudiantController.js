const Etudiant = require("../../Models/Compte");
const sendmail = require("../../mailing/mailer");
const bcrypt = require("bcryptjs");
const Excel = require("exceljs");

exports.FetchEtudiant = async (req, res) => {
  try {
    const Result = await Etudiant.find({ role: "Etudiant" });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchEtudiantById = async (req, res) => {
  try {
    const Result = await Etudiant.findById(req.params.idEtudiant);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchEtudiantPublic = async (req, res) => {
  try {
    const Result = await Etudiant.find({ visibilite: true });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateEtudiant = async (req, res) => {
  console.log(req.params);
  try {
    // const salt = bcrypt.genSaltSync(10);
    // req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);
    const Result = await Etudiant.findByIdAndUpdate(
      req.params.idEtudiant,
      req.body
    );

    const Resultupdate = await Etudiant.findById(req.params.idEtudiant);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateEtudiantVisibility = async (req, res) => {
  try {
    const Result = await Etudiant.findByIdAndUpdate(
      req.params.idEtudiant,
      req.body
    );

    const Resultupdate = await Etudiant.findById(req.params.idEtudiant);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteEtudiant = async (req, res) => {
  try {
    const Result = await Etudiant.findByIdAndDelete(req.params.idEtudiant);

    res.status(200).send("Etudiant deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};

exports.uploadMultiple = async (req, res) => {
  try {
    // console.log("file", req.file)
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(
        parse({
          Comment: "#",
          relax_column_count: true,
          columns: true,
          delimiter: ";",
        })
      )
      .on("data", (data) => {
        results.push(data);
      })
      .on("error", (err) => {
        res.status(500).send({ Message: "Server Error", Error: error.message });
      })
      .on("end", async () => {
        results.pop();
        console.log("popped", results);
        results.forEach(async (student) => {
          student.password = randomString(
            12,
            "abcdefghijklmnopqrstuvwxyz0123456789"
          );
          // try {
          //   await sendAcount(student)
          // } catch (error) {
          //   console.log("##########:", error);
          //   res.status(500).send({ Message: "Server Error", Error: error.message });
          // }
        });
        const createdEtudiant = await Etudiant.create(results);
        return res.status(200).json({
          Message: "Etudiant(s) uploaded successfully",
          data: createdEtudiant,
        });
      });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

exports.SendMailStudentsPortefolio = async (req, res) => {
  try {
    const Students = await Etudiant.find({ role: "Etudiant" });
    for (let i = 0; i < Students.length; i++) {
      const student = Students[i];
      await sendmail.Mail_Sender(
        student.email,
        `<h1>A propos de votre portefolio!</h1> 
      <p> Bonjour  ${student.firstName} ${student.lastName},c'est la fin de semestre!! <br><br>
      N'oubliez pas de mettre à jour vos compétences acquises tout au long du semestre et du portefolio!</p>
      qui va contenir les liens vers les travaux effectués, tout ceci va enrichir votre cv.<br><br>
      N'hésitez pas à nous contacter si c'est nécessaire<br>
      Cordialement .<br>
      Administration de l'isamm<br>
      `,
        "Mise à jour du portefolio et compétences"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.SendMailStudentsWork = async (req, res) => {
  try {
    const Students = await Etudiant.find({ role: "Etudiant" });
    for (let i = 0; i < Students.length; i++) {
      const student = Students[i];
      await sendmail.Mail_Sender(
        student.email,
        `<h1>A propos de votre travail</h1> 
      <p> Bonjour  ${student.firstName} ${student.lastName},six mois sont déja passés<br><br>
      Voici le lien de l'application <a href:http://localhost:4000/profile>Click here</a></p>
      pour modifier votre travail
      <br><br>
      N'hésitez pas à nous contacter si c'est nécessaire<br>
      Cordialement .<br>
      Administration de l'isamm<br>
      `,
        "Mise à jour du portefolio et compétences"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.SendMailStudentsDiplome = async (req, res) => {
  try {
    const Students = await Etudiant.find({ role: "Etudiant", diplome: false });
    for (let i = 0; i < Students.length; i++) {
      const student = Students[i];
      await sendmail.Mail_Sender(
        student.email,
        `<h1>La date d'obtention du diplome</h1> 
      <p> Bonjour  ${student.firstName} ${student.lastName},vous n'avez pas encore spécifié la date de d'obtention du diplome <br><br>
      Voici le lien de l'application <a href="http://localhost:4000/profile">Click here</a></p>
      spécifier la date de diplome obtenu <br><br>
      N'hésitez pas à nous contacter si c'est nécessaire<br>
      Cordialement .<br>
      Administration de l'isamm<br>
      `,
        "Mise à jour du portefolio et compétences"
      );
    }
  } catch (error) {
    console.log(error);
  }
};
