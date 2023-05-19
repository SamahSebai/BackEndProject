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

exports.uploadStudents = (req, res) => {
  // Connect to the MongoDB database
  // Create a new instance of the ExcelJS Workbook
  const workbook = new Excel.Workbook();
  // Read the data from the Excel file using the buffer
  workbook.xlsx
    .load(req.files[0].buffer)
    .then(() => {
      // Get the first sheet
      const sheet = workbook.getWorksheet(1);
      // Iterate over the rows in the sheet starting from the second row
      sheet.eachRow({ includeEmpty: false, startRow: 2 }, (row, n) => {
        if (n > 1) {
          try {
            console.log("...", row.values);
            // Get the values of the cells
            //  let email = typeof row.values[6] === "string" ? row.values[6] : row.values[6].text
            //  const salt = bcrypt.genSaltSync(10);
            //  const hashPassword = bcrypt.hashSync(email, salt);
            // Create new user and student objects with the values
            console.log("...", row.values);

            const Account = new Account({
              first_name: row.values[1],
              lastName: row.values[2],
              email: row.values[3],
              /* password: row.values[4],
                    address: row.values[5],
                    Specialite: row.values[6],
                    classe: row.values[7],*/
            });

            /*     const user = new User({
                            email: email,
                            password: hashPassword,
                            username: email,
                            roles: ["student"]
                        })
                        const student = new Student({
                            credentials_id: user.id,
                            NIN: row.values[1],
                            first_name: row.values[2],
                            last_name: row.values[3],
                            birthdate: row.values[4],
                            first_year: row.values[5],
                            email: email,
                            phone_number: row.values[7]
                        });*/
            // Save the objects to the MongoDB database

            /*user.save();
                        student.save();*/
            Account.save();
          } catch (err) {
            console.log("row not saved");
          }
        }
      });
      res.status(200).json({ message: "Students uploaded successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
