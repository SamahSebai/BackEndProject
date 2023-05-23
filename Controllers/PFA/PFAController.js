const PFA = require("../../Models/PFA");

exports.CreatePFA = async (req, res) => {
  try {
    const pickedBody = req.body;
    pickedBody.statue = "pending";
    const Result = await PFA.create(req.body);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFA = async (req, res) => {
  try {
    const Result = await PFA.find({});

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFAById = async (req, res) => {
  try {
    const Result = await PFA.findById(req.params.idPFA);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdatePFA = async (req, res) => {
  try {
    const Result = await PFA.findByIdAndUpdate(req.params.idPFA, req.body);

    const Resultupdate = await PFA.findById(req.params.idPFA);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeletePFA = async (req, res) => {
  try {
    const Result = await PFA.findByIdAndDelete(req.params.idPFA);

    res.status(200).send("PFA deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};

exports.FetchPFAByIdEns = async (req, res) => {
  try {
    const Result = await PFA.find({
      createdBy: req.params.idEns,
    });
    res.json(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.FetchPFAStudents = async (req, res) => {
  try {
    const Result = await PFA.find({
      statue: "accepted",
    });
    res.json(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};
