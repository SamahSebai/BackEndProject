const Notifications = require("../../Models/Notifications");
const { count } = require("../../Models/PFE");
const PFE = require("../../Models/PFE");
const { SendStocket } = require("../../socket");

exports.CreatePFE = async (req, res) => {
  try {
    existe = req.user._id;
    const existingpfe = await PFE.findOne({ Etudiant: existe });
    if (existingpfe) {
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });
    } else {
      const Result = await PFE.create({
        Etudiant: req.user._id,
        Pays: req.body.Pays,
        ...req.body,
      });
      console.log(req.body);
      res.send(Result);
      console.log("PFE affecter");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFE = async (req, res) => {
  try {
    const Result = await PFE.find({});

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFEById = async (req, res) => {
  try {
    const Result = await PFE.findById(req.params.idPFE);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFEnonaffecte = async (req, res) => {
  try {
    const Result = await PFE.find({ Encadrant: null });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchPFEaffecte = async (req, res) => {
  try {
    const user = req.user._id;
    const Result = await PFE.find({ Encadrant: user });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchEtudiantByIdPfe = async (req, res) => {
  try {
    const Result = await Etudiant.findById(req.params.idPFE).populate(
      "Etudiant"
    );
    res.send({
      name: Result.Etudiant.firstName,
      lastname: Result.Etudiant.lastName,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.ChoisirPFE = async (req, res) => {
  try {
    const EncadrantData = {
      Encadrant: req.user._id,
    };

    const Result = await PFE.findByIdAndUpdate(req.params.idPFE, {
      $set: EncadrantData,
    });

    const Resultupdate = await PFE.findById(req.params.idPFE);
    const notifencadrant = await PFE.findById(req.params.idPFE).populate(
      "Encadrant"
    );
    const notif = await Notifications.create({
      title: `votre pfe est affecté par ${notifencadrant.Encadrant.firstName} ${notifencadrant.Encadrant.lastName}`,
      user: Resultupdate.Etudiant,
    });
    SendStocket(`notif-pfe-${Resultupdate.Etudiant}`, "votre pfe est affecté");
    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getnotif = async (req, res) => {
  try {
    const mynotifs = req.user._id;
    const notifcations = await Notifications.find({ user: mynotifs });
    res.status(200).json({
      message: "notifications",
      data: notifcations,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.UpdatePFE = async (req, res) => {
  try {
    const Result = await PFE.findByIdAndUpdate(req.params.idPFE, req.body);

    const Resultupdate = await PFE.findById(req.params.idPFE);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeletePFE = async (req, res) => {
  try {
    const Result = await PFE.findByIdAndDelete(req.params.idPFE);

    res.status(200).send("PFE deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};

// exports.getPfeStatistics = async (req, res) => {
//   try {
//     /* const city_data = await PFE.aggregate([
//             {
//                 $match: { type: { $eq: "pfe" } }
//             },
//             {
//                 $group: {
//                     _id: "$internship_organization",
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);*/
//     const company_data = await PFE.aggregate([
//       /* {
//                 $match: { Titre: { $eq: "plateforme gestion" } }
//             },*/
//       {
//         $group: {
//           _id: "$Societe",
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     /* const location_data = await PFE.aggregate([
//             {
//                 $match: { type: { $eq: "pfe" } }
//             },
//             {
//                 $group: {
//                     _id: "$location",
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);*/

//     res
//       .status(200)
//       .send({ /*...type_data,*/ ...company_data /*, ...location_data*/ });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err.message);
//   }
// };

exports.getByPays = async (req, res) => {
  try {
    const Projects = await PFE.aggregate([
      {
        $group: {
          _id: { $toLower: "$Pays" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By pays",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

exports.GetBySociete = async (req, res) => {
  try {
    const Projects = await PFE.aggregate([
      {
        $group: {
          _id: { $toLower: "$Societe" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By Societe",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

exports.GetByTech = async (req, res) => {
  try {
    const Projects = await PFE.aggregate([
      {
        $group: {
          _id: { $toLower: "$Technologie" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By Societe",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

exports.GetByEnseig = async (req, res) => {
  try {
    const Projects = await PFE.find().populate("Encadrant");
    console.log(Projects);
    let ensegs = Array.from(
      new Set(
        Projects.filter((proj) => {
          return proj.Encadrant;
        }).map((proj) => {
          let { _id, firstName, lastName } = proj.Encadrant;
          return JSON.stringify({
            _id,
            name: firstName + " " + lastName,
            nb: 0,
          });
        })
      ),
      JSON.parse
    );
    console.log(ensegs);
    for (let i = 0; i < ensegs.length; i++) {
      let enseig = ensegs[i];
      let nb = (await PFE.find({ Encadrant: enseig._id })).length;
      ensegs[i].nb = nb;
    }
    console.log(ensegs);
    return res.status(200).json({
      Message: "By encadrant",
      Success: true,
      data: ensegs,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
