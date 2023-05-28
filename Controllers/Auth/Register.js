const Accounts = require("../../Models/Compte.js");
const nodemailer = require("nodemailer");
const Cv = require("../../Models/Cv.js");
const bcrypt = require("bcryptjs");

const initcv = (student_id) => {
  return {
    compte: student_id,
    description: "",
    linkedInUrl: "",
    githubUrl: "",
    experiences: [],
    Education: [],
    certifications: [],
    languages: [],
    hard_skills: [],
    soft_skills: [],
    hobbys: [],
  };
};
exports.register = async (req, res) => {
  try {
    const Found = await Accounts.findOne({ email: req.body.email });
    if (Found !== null) {
      res.status(400).send({ message: "E-mail déjà utilisé!" });
    } else {
      const newAcc = new Accounts(req.body);
      const createdaccount = await newAcc.save();
      const emptyCv = initcv(createdaccount._id);
      const newCv = new Cv(emptyCv);
      const createdCv = await newCv.save();
      console.log(req.body);
      res.status(201).send({ message: "Inscrit avec succés!", id: newAcc._id });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occurred" });
  }
};

exports.registerAlumni = async (req, res) => {
  try {
    const found = await Accounts.findOne({ email: req.body.email });
    if (found !== null) {
      return res.status(400).send({ message: "E-mail déjà utilisé!" });
    }
    // const salt = bcrypt.genSaltSync(10);
    // req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body);
    const alumni = await Accounts.create(req.body);
    res.status(201).send(alumni);
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occurred" });
  }
};
