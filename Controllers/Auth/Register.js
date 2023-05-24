const Accounts = require("../../Models/Compte");
const CvModule = require("../../Models/Cv");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const Found = await Accounts.findOne({ email: req.body.email });
    if (Found !== null) {
      res.status(400).send({ message: "E-mail déjà utilisé!" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);
      console.log(req.body);
      await Accounts.create(req.body);
      res.status(201).send({ message: "Inscrit avec succés!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occured" });
  }
};

const initcv = (student_id) => {
  return {
    compte: student_id,
    description: "",
    linkedInUrl: "",
    githubUrl: "",
    type_cv: 1,
    experiences: [
      {
        titre: "",
        description: "",
        technologies: "",
        nom_societe: "",
        type_exp: "STAGE D'ETE",
        emplacement: "",
        dateDebut: new Date(),
        dateFin: new Date(),
      },
    ],
    Education: [
      {
        titre_univ: "",
        titre_diplome: "",
        mention: "Passable",
        description: "",
        dateDebut: new Date(),
        dateFin: new Date(),
      },
    ],
    certifications: [
      {
        titre_certif: "",
        source_certif: "",
        description: "",
        emplacement: "",
        dateDebut: new Date(),
        dateFin: new Date(),
      },
    ],
    languages: [{ lang: "", level: "" }],
    hard_skills: [""],
    soft_skills: [""],
    hobbys: [""],
  };
};
