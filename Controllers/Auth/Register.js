const Accounts = require("../../Models/Compte");
const CvModule = require("../../Models/Cv");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const Found = await Accounts.findOne({ email: req.body.email });
    if (Found !== null) {
      return res.status(400).send({ message: "E-mail déjà utilisé!" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      req.body.passwordHashed = bcrypt.hashSync(req.body.password, salt);
      /*  let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "sebaisameh51@gmail.com",
          pass: "kashplocvadlnwnk",
        },
      });
      await transporter.sendMail({
        from: "wajdi.barhoumi26@gmail.com",
        to: `${req.body.email}`,
        subject: "Inscription",
        html: `<h1>Thanks For Joining Us!</h1> 
        <p> Hello  ${req.body.firstName} ${req.body.lastName},you are now a member in our <br><br>
        E-learning platform ,we are proud to have you among <br><br>
        us ,thanks again for your trust!</p>
        You can now join the platform :<br><br>
        Your email: ${req.body.email}<br>
        Your password :${req.body.password}<br>
        Dont't hesitate to contact us if needed.<br>
        Sincerely .<br>
        By DEVILS TEAM<br>
        Manager of Academia .
        
        `,
      });*/
      const newAcc = await new Accounts(req.body);
      const savedacc = await newAcc.save();
      if (savedacc.role === "Etudiant" || savedacc.role === "ALumni") {
        const emptyCv = initcv(savedacc._id);
        const newCv = await new CvModule(emptyCv);
        const savedCv = await newCv.save();
      }
      res.status(201).send({ message: "Inscrit avec succés!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "An error occured" });
  }
};

const initcv = (student_id) => {
  return {
    compte: student_id,
    description: "",
    linkedInUrl: "",
    githubUrl: "",
    type_cv: 1,
    experiences: [
      {
        titre: "",
        description: "",
        technologies: "",
        nom_societe: "",
        type_exp: "STAGE D'ETE",
        emplacement: "",
        dateDebut: new Date(),
        dateFin: new Date(),
      },
    ],
    Education: [
      {
        titre_univ: "",
        titre_diplome: "",
        mention: "Passable",
        description: "",
        dateDebut: new Date(),
        dateFin: new Date(),
      },
    ],
    certifications: [
      {
        titre_certif: "",
        source_certif: "",
        description: "",
        emplacement: "",
        dateDebut: new Date(),
        dateFin: new Date(),
      },
    ],
    languages: [{ lang: "", level: "" }],
    hard_skills: [""],
    soft_skills: [""],
    hobbys: [""],
  };
};
