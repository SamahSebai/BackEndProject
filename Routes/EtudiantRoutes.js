const express = require("express");
const authRole = require("../Passport/RoleAllowed");
const multer = require("multer");

const {
  FetchEtudiant,
  FetchEtudiantById,
  UpdateEtudiant,
  DeleteEtudiant,
  UpdateEtudiantVisibility,
  FetchEtudiantPublic,
  uploadStudents,
  uploadMultiple,
  SendMailStudentsPortefolio,
} = require("../Controllers/Etudiant/EtudiantController");
const passport = require("passport");

const router = express.Router();

const storage = multer.diskStorage({
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

module.exports = router;
