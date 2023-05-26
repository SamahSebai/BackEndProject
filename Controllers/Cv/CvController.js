const Cv = require("../../Models/Cv");

exports.CreateCv = async (req, res) => {
  try {
    const Result = await Cv.create(req.body);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchCv = async (req, res) => {
  try {
    const Result = await Cv.find({});

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.FetchCvById = async (req, res) => {
  try {
    const CvId = req.params.idCv;
    const Result = await Cv.find({});
    const x = await Cv.findById(CvId).populate("compte");
    res.send(x.compte);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.FetchCvByStudentId = async (req, res) => {
  try {
    const compte_id = req.params.id_st;
    const Result = await Cv.findOne({ compte: compte_id }).populate("compte");

    const user = await User.findById(compte_id);
    res.send({ cv: Result, user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.UpdateCv = async (req, res) => {
  try {
    const _id = req.params.idCv;
    const Result = await Cv.findByIdAndUpdate(
      { _id },
      { ...req.body },
      { new: true }
    );
    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteCv = async (req, res) => {
  try {
    const Result = await Cv.findByIdAndDelete(req.params.idCv);

    res.status(200).send("Cv deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};
