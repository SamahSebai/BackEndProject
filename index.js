const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const authRole = require("./passport/RoleAllowed");
const passport = require("passport");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const socketIo = require("socket.io");
const http = require("http");
dotenv.config();

require("./passport/bearer");

//start a new Express application
const app = express();

// connect to database
const PORT = 4000 || process.env.PORT;
require("./database/connect");

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

//EJS TEMPLATE
app.set("view engine", "ejs");
app.set("views", path.join("views"));

//Get request
app.get("/home", (req, res) => {
  res.status(200).render("index");
});

// dashboard
app.get(
  "/dashboard",
  passport.authenticate("bearer", { session: false }),
  authRole(["ADMIN"]),
  (req, res) => {
    res.status(200).render("dashboard");
  }
);

// initialize routes
const Authentification = require("./Routes/Auth");
const Admins = require("./Routes/AdminRoutes");
const Enseignant = require("./Routes/EnseignantRoutes");
const Etudiant = require("./Routes/EtudiantRoutes");
const Alumni = require("./Routes/AlumniRoutes");
const Saison = require("./Routes/SaisonRoutes");
const PFA = require("./Routes/PFARoutes");
const PFE = require("./Routes/PFERoutes");
const Event = require("./Routes/EventRoutes");
const Blog = require("./Routes/BlogRoutes");
const StageEte = require("./Routes/StageEteRoutes");
const Postuler = require("./Routes/PostulerRoutes");
const Confirm = require("./Routes/confirmationRoutes");
const Cv = require("./Routes/CvRoutes");
const Invitation = require("./Routes/InvitationRoutes");
const Demande = require("./Routes/demandeRoutes");
const { Timer } = require("./timer");

/**
 * user routes
 */
app.use("/Api/V1", Authentification);
app.use("/Api/V1", Admins);
app.use("/Api/V1", Enseignant);
app.use("/Api/V1", Etudiant);
app.use("/Api/V1", Alumni);
app.use("/Api/V1", Saison);
app.use("/Api/V1", PFA);
app.use("/Api/V1", PFE);
app.use("/Api/V1", Event);
app.use("/Api/V1", Blog);
app.use("/Api/V1", StageEte);
app.use("/Api/V1", Postuler);
app.use("/Api/V1", Confirm);
app.use("/Api/V1", Cv);
app.use("/Api/V1", Invitation);
app.use("/Api/V1", Demande);

//PORT
const server = http.createServer(app);
server.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
    Timer();
  } else console.log("Error occurred, server can't start", error);
});
const io = socketIo(server, { cors: { origin: "*", methods: "*" } });
io.on("connection", (socket) => {
  console.log("new user joined the server");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = {
  io,
};
