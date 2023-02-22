const Demande = require("../models/demande.model.js");

exports.insertDemande = async (req, res) => {
  // Create a Demande object
  let demande = new Demande({
    ...req.body,
  });

  // Save Demande in the database
  demande.save((err, inserted) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      console.log(inserted);
      res.json(inserted);
    }
  });
};

exports.updateDemande = async (req, res) => {
  var id = req.params.id;
  console.log(id, req.body);
  Demande.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.deleteDemande = async (req, res) => {
  var id = req.params.id;
  Demande.findOneAndDelete({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.getDemande = async (req, res) => {
  var id = req.params.id;
  Demande.findOne({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
