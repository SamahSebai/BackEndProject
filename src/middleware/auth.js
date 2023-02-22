const config = require("../config/config");
const jwt = require("jsonwebtoken");

exports.VerifyUserToken = (req, res, next) => {
  var bearerToken = req.headers.authorization;
  if (!bearerToken)
    return res.status(401).send("Access Denied / Unauthorized request");

  try {
    var token = bearerToken.split(" ")[1];
    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");

    let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);
    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    req.user = verifiedUser;
    return next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

/*exports.IsAdmin = async (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(401).send("Unauthorized!");
};
exports.IsDirecteurEtudes = async (req, res, next) => {
  if (req.user.role === "directeur") {
    return next();
  }
  return res.status(401).send("Unauthorized!");
};*/

exports.VerifyRole = (roles) => {
  return async (req, res, next) => {
    if (req.user.roles.some(role => roles.includes(role)) ) {
      next();
    } else {
      res.status(401).send("Unauthorized!");
    }
  };
};
exports.isAlumni = () => {
  return async (req, res, next) => {
    if (req.user.isAlumni == true ) {
      next();
    } else {
      res.status(401).send("Unauthorized!");
    }
  };
};

exports.IsHimself = async (req, res, next) => {
  if (req.user._id === req.params.id) {
    return next();
  }

  return res.status(401).send("Unauthorized!");
};
