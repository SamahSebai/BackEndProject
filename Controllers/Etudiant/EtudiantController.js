const Etudiant = require("../../Models/Compte"); 
const bcrypt = require("bcryptjs");
const Excel = require("exceljs");

exports.FetchEtudiant = async (req, res) => {
  try {
    const Result = await Etudiant.find({ role: "Etudiant" });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchEtudiantById = async (req, res) => {
  try {
    const Result = await Etudiant.findById(req.params.idEtudiant);

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.FetchEtudiantPublic = async (req, res) => {
  try {
    const Result = await Etudiant.find({ visibilite: true });

    res.send(Result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateEtudiant = async (req, res) => {
  console.log(req.params);
  try {
    // const salt = bcrypt.genSaltSync(10);
    // req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);
    const Result = await Etudiant.findByIdAndUpdate(
      req.params.idEtudiant,
      req.body
    );

    const Resultupdate = await Etudiant.findById(req.params.idEtudiant);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.UpdateEtudiantVisibility = async (req, res) => {
  try {
    const Result = await Etudiant.findByIdAndUpdate(
      req.params.idEtudiant,
      req.body
    );

    const Resultupdate = await Etudiant.findById(req.params.idEtudiant);

    res.send(Resultupdate);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.DeleteEtudiant = async (req, res) => {
  try {
    const Result = await Etudiant.findByIdAndDelete(req.params.idEtudiant);

    res.status(200).send("Etudiant deleted with success");
  } catch (error) {
    res.status(500).send("error serveur");
  }
};

exports.uploadMultiple = async (req, res) => {
  try {
    // console.log("file", req.file)
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(
        parse({
          Comment: "#",
          relax_column_count: true,
          columns: true,
          delimiter: ";",
        })
      )
      .on("data", (data) => {
        results.push(data);
      })
      .on("error", (err) => {
        res.status(500).send({ Message: "Server Error", Error: error.message });
      })
      .on("end", async () => {
        results.pop();
        console.log("popped", results);
        results.forEach(async (student) => {
          student.password = randomString(
            12,
            "abcdefghijklmnopqrstuvwxyz0123456789"
          );
          // try {
          //   await sendAcount(student)
          // } catch (error) {
          //   console.log("##########:", error);
          //   res.status(500).send({ Message: "Server Error", Error: error.message });
          // }
        });
        const createdEtudiant = await Etudiant.create(results);
        return res
          .status(200)
          .json({
            Message: "Etudiant(s) uploaded successfully",
            data: createdEtudiant,
          });
      });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
