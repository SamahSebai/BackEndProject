const express = require("express");
const passport = require("passport");
const {
  forgetpassword,
  resetPassword,
  UpdateUser,
} = require("../Controllers/Auth/Forget_Reset_password");
const { login } = require("../Controllers/Auth/Login");
const { register, registerAlumni } = require("../Controllers/Auth/Register");
const authRole = require("../Passport/RoleAllowed");
const router = express.Router();
router.post("/registerAlumni", registerAlumni);
router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  passport.authenticate("bearer", { session: false }),
  function (req, res, next) {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/forgetPassword", forgetpassword);
router.put("/resetPassword/:token", resetPassword);
router.put("/updateuser/:iduser", UpdateUser);

module.exports = router;
