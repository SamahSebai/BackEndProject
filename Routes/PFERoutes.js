const express = require("express");
const authRole = require("../Passport/RoleAllowed");

const {
  FetchPFE,
  FetchPFEById,
  UpdatePFE,
  DeletePFE,
  CreatePFE,
  FetchPFEnonaffecte,
  FetchPFEaffecte,
  ChoisirPFE,
  getByPays,
  GetBySociete,
  GetByEnseig,
  GetByTech,
  getnotif,
  FetchEtudiantByIdPfe,
} = require("../Controllers/PFE/PFEController");
const passport = require("passport");

const router = express.Router();
router.post(
  "/PFE",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  CreatePFE
);
router.post(
  "/PFEe",
  passport.authenticate("bearer", { session: false }),
  authRole("Etudiant"),
  CreatePFE
);
router.get(
  "/PFE",
  passport.authenticate("bearer", { session: false }),
  FetchPFE
);
router.get(
  "/enseignant_PFE",
  passport.authenticate("bearer", { session: false }),
  authRole("Enseignant"),
  FetchPFEnonaffecte
);
router.get(
  "/enseignant_affecte",
  passport.authenticate("bearer", { session: false }),
  authRole("Enseignant"),
  FetchPFEaffecte
);
router.get(
  "/PFE/:idPFE",
  passport.authenticate("bearer", { session: false }),
  FetchPFEById
);
router.put(
  "/PFE/:idPFE",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  UpdatePFE
);
router.get(
  "/selectpfe/:idPFE",
  passport.authenticate("bearer", { session: false }),
  authRole("Enseignant"),
  ChoisirPFE
);
router.get(
  "/pfe/:idPFE",
  passport.authenticate("bearer", { session: false }),
  authRole("Enseignant"),
  FetchEtudiantByIdPfe
);
router.delete(
  "/PFE/:idPFE",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  DeletePFE
);
router.get(
  "/PFEStatPays",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  getByPays
);
router.get(
  "/PFEStatSoc",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  GetBySociete
);
router.get(
  "/PFEStatEns",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  GetByEnseig
);
router.get(
  "/PFEStatTech",
  passport.authenticate("bearer", { session: false }),
  authRole("ADMIN"),
  GetByTech
);
router.get(
  "/notifs",
  passport.authenticate("bearer", { session: false }),
  authRole("Etudiant"),
  getnotif
);

module.exports = router;
