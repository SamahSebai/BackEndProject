const Accounts = require("../../Models/Compte");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const user = await Accounts.findOne({ email: req.body.email });
    console.log(user);
    if (user != null && req.body.password === user.password) {
      const data = {
        useremail: user.email,
        userId: user._id,
      };
      var token = jwt.sign(data, "secret", { expiresIn: "1d" });
      res
        .status(200)
        .send({
          message: "connecté avec succés!",
          token: token,
          id: data.userId,
        });
    } else {
      res
        .status(400)
        .send({ message: " Verifier votre email ou mot de passe!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "An error occured" });
  }
};
