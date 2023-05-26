const Event = require("../../Models/Event");
const SaisonUnv = require("../../Models/SaisonUnv");

exports.CreateEvent = async (req, res) => {
  try {
    console.log(req.body);
    const Result = await Event.create(req.body);
    const Result2 = Result.save();
    res.send(Result2);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.FetchEvent = async (req, res) => {
  try {
    let filter = {};
    const { id } = req.query;
    if (id) {
      const saison = await SaisonUnv.findById(id);
      if (saison) {
        const { DateDebut, Datefin } = saison;
        filter = {
          Date: {
            $gte: new Date(DateDebut),
            $lt: new Date(Datefin),
          },
        };
      }
    }
    const Result = await Event.find(filter);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchEventById = async (req, res) => {
  try {
    const Result = await Event.findById(req.params.idEvent);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateEvent = async (req, res) => {
  try {
    const Result = await Event.findByIdAndUpdate(req.params.idEvent, req.body);

    const Resultupdate = await Event.findById(req.params.idEvent);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteEvent = async (req, res) => {
  try {
    const Result = await Event.findByIdAndDelete(req.params.idEvent);

    res.status(200).send("Event deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};
