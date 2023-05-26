const express = require("express");
const authRole = require("../Passport/RoleAllowed");
const multer = require("multer");
const Etudiant = require("../Models/Compte");

const {
  FetchEtudiant,
  FetchEtudiantById,
  UpdateEtudiant,
  DeleteEtudiant,
  UpdateEtudiantVisibility,
  FetchEtudiantPublic,
  uploadMultiple,
  SendMailStudentsPortefolio,
  updateSeason,
  academicProgress,
} = require("../Controllers/Etudiant/EtudiantController");
const passport = require("passport");
const csvtojson = require("csvtojson");

const {
  FetchEtudiant,
  FetchEtudiantById,
  UpdateEtudiant,
  DeleteEtudiant,
  UpdateEtudiantVisibility,
  FetchEtudiantPublic,
  uploadStudents,
} = require("../Controllers/Etudiant/EtudiantController");
const passport = require("passport");

/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/csv/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
});*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".csv"); // Set the filename for the uploaded file
  },
});

// Create an upload object
const upload = multer({ storage: storage });

router.post("/uploadFile", upload.single("csvFile"), (req, res) => {
  // router.post('/uploadFile',(req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
  } else {
    // File uploaded successfully

    const csvFilePath = req.file.path;
    csvtojson()
      .fromFile(csvFilePath)
      .then((csvData) => {
        console.log(csvData);
        Etudiant.insertMany(csvData)
          .then(function () {
            console.log("Data inserted"); //success
            res.json({ success: "success" });
            // res.send('File uploaded!');
          })
          .catch(function (error) {
            console.log(error); //failure
          });
      });
  }
});

router.get(
  "/Etudiant",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  FetchEtudiant
);
router.put(
  "/Etudiant/visiblitiy/:idEtudiant",
  passport.authenticate("bearer", { session: false }),
  authRole("Etudiant"),
  UpdateEtudiantVisibility
);
router.get(
  "/Etudiant/public",
  passport.authenticate("bearer", { session: false }),
  authRole("Etudiant"),
  FetchEtudiantPublic
);
router.get(
  "/Etudiant/:idEtudiant",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  FetchEtudiantById
);
router.put(
  "/Etudiant/Update/:idEtudiant",
  passport.authenticate("bearer", { session: false }),
  authRole("Etudiant"),
  UpdateEtudiantVisibility
);
router.put(
  "/EtudiantAdmin/:idEtudiant",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  UpdateEtudiant
);
router.delete(
  "/Etudiant/:idEtudiant",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  DeleteEtudiant
);
router.post(
  "/EtudiantUploadStudents",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  upload.single("students_csv"),
  uploadMultiple
);
router.post("/mailportefolio", SendMailStudentsPortefolio);
router.put("/academicProgress/:_id", academicProgress);
router.put("/updateSeason", updateSeason);

module.exports = router;
