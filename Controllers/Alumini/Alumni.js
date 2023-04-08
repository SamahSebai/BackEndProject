const Alumni = require("../../Models/Compte");

exports.FetchAlumni = async (req, res) => {
  try {
    const Result = await Alumni.find({ role: "ALumni" });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};


exports.FetchAll = async (req, res) => {
  try {
    const Result = await Alumni.find();

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchAlumniById = async (req, res) => {
  try {
    const Result = await Alumni.findById(req.params.idAlumni);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateAlumni = async (req, res) => {
  console.log(req.params);
  try {
    // const salt = bcrypt.genSaltSync(10);
    // req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);
    const Result = await Alumni.findByIdAndUpdate(
      req.params.idAlumni,
      req.body
    );

    const Resultupdate = await Alumni.findById(req.params.idAlumni);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteAlumni = async (req, res) => {
  try {
    const Result = await Alumni.findByIdAndDelete(req.params.idAlumni);

    res.status(200).send("Alumni deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};
