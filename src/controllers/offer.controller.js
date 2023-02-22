const Offer = require("../models/offer.model.js");

exports.insertOffer = async (req, res) => {
  // Create a Offer object
  let offer = new Offer({
    ...req.body,
  });

  // Save Offer in the database
  offer.save((err, inserted) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      console.log(inserted);
      res.json(inserted);
    }
  });
};

exports.updateOffer = async (req, res) => {
  var id = req.params.id;
  Offer.findByIdAndUpdate(id, req.body, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.deleteOffer = async (req, res) => {
  var id = req.params.id;
  Offer.findOneAndDelete({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.getOffer = async (req, res) => {
  var id = req.params.id;
  Offer.findOne({ _id: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
