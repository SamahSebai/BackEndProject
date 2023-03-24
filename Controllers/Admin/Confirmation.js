
const PFA = require('../../Models/PFA')
const PFE = require('../../Models/PFE')
const PostulerPFA = require('../../Models/PostulerPFA')
const PostulerPFE = require('../../Models/PostulerPFE')
const Etudiant = require('../../Models/Compte')
const nodemailer = require("nodemailer");
const Invitation = require('../../Models/Invitation')
exports.ConfirmationPFA = async (req, res) => {

    try {

         await PFA.findByIdAndUpdate(req.body.Stage, { Disponibilite: false })

        
        let transporter = nodemailer.createTransport({
            service :"Gmail",
              auth: {
                user: "sebaisameh51@gmail.com",
                pass: "kashplocvadlnwnk" ,
      
              },
            });
            await transporter.sendMail({
              from:"sebaisameh51@gmail.com",
              to: `${req.body.Etudient}`,
              subject: "confirmation pfa ",
              html: `<h1>Thanks For Joining Us!
              
              `
            })
            res.send("PFA confirme")

    } catch (error) {
console.log(error);
        res.status(500).send(error)
    }

}
exports.ConfirmationPFE = async (req, res) => {

    try {
       

        const valid = await PFE.findByIdAndUpdate(req.body.idPFE, { Disponibilite: false })
        let transporter = nodemailer.createTransport({
            service :"Gmail",
              auth: {
                user: "sebaisameh51@gmail.com",
                pass: "kashplocvadlnwnk" ,
      
              },
            });
            await transporter.sendMail({
              from:"sebaisameh51@gmail.com",
              to: `${req.body.Etudient}`,
              subject: "confirmation pfe",
              html: `<h1>Thanks For Joining Us!</h1> 
              
              `
            })

        res.send("PFE confirme")

    } catch (error) {

        res.status(500).send(error)
    }}

    exports.ConfirmationInvitation = async (req, res) => {

      try {
         
  
        await Invitation.findByIdAndUpdate(req.body.idInvitation, { Validation: true })
  
          res.send("invitation validee")
  
      } catch (error) {
  
          res.status(500).send(error)
      }
}


