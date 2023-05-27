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
      res.status(201).send({ message: "Inscrit avec succés!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occurred" });
  }
};
