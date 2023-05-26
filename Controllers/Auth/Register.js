const Accounts = require("../../Models/Compte");
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
      const newAcc = await new Accounts(req.body);
      const savedacc = await newAcc.save();
      if (savedacc.role === "Etudiant" || savedacc.role === "ALumni") {
        const emptyCv = initcv(savedacc._id);
        const newCv = await new CvModule(emptyCv);
        const savedCv = await newCv.save();
      }
      console.log(req.body);
      await Accounts.create(req.body);
      res.status(201).send({ message: "Inscrit avec succés!" });
    }
    console.log(req.body);
    const alumni = await Accounts.create(req.body);
    res.status(201).send(alumni);
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
    const salt = bcrypt.genSaltSync(10);
    req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);  
    console.log(req.body);
    const alumni = await Accounts.create(req.body);
    res.status(201).send(alumni);
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occurred" });
  }
};
