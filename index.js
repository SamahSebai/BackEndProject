const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const authRole = require('./passport/RoleAllowed')
const passport = require('passport');
const dotenv=require('dotenv')
const nodemailer = require("nodemailer");
dotenv.config()

require('./passport/bearer');

//start a new Express application
const app = express();

// connect to database
const PORT = 4000 || process.env.PORT;
require('./database/connect');

app.get('/', (req, res)=>{
     
    res.status(200);
    res.send("Welcome to root URL of Server");

});
 

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

//EJS TEMPLATE
app.set('view engine', 'ejs');
app.set('views',path.join('views'))


 //Get request
app.get('/home',(req, res)=>{
     res.status(200).render('index')
}); 

// dashboard 
app.get('/dashboard',passport.authenticate('bearer', { session: false }),authRole(["ADMIN"]),(req,res)=>{
    res.status(200).render('dashboard')
})

// initialize routes
const Authentification =  require('./Routes/Auth')
const Admins =  require('./Routes/AdminRoutes')
const Enseignant =  require('./Routes/EnseignantRoutes')
const Etudiant =  require('./Routes/EtudiantRoutes')
const Alumni =  require('./Routes/AlumniRoutes')
const Saison =  require('./Routes/SaisonRoutes')
const PFA =  require('./Routes/PFARoutes')
const PFE =  require('./Routes/PFERoutes')
const Event =  require('./Routes/EventRoutes')
const Blog =  require('./Routes/BlogRoutes')
const StageEte =  require('./Routes/StageEteRoutes')
const Postuler =  require('./Routes/PostulerRoutes')
const Confirm =  require('./Routes/confirmationRoutes')
const Cv =  require('./Routes/CvRoutes')
const Invitation = require('./Routes/InvitationRoutes');
const Demande = require('./Routes/demandeRoutes');


/**
 * user routes
 */
app.use('/Api/V1' , Authentification)
app.use('/Api/V1' , Admins)
app.use('/Api/V1' , Enseignant)
app.use('/Api/V1' , Etudiant)
app.use('/Api/V1' , Alumni)
app.use('/Api/V1' , Saison)
app.use('/Api/V1' , PFA)
app.use('/Api/V1' , PFE)
app.use('/Api/V1' ,Event)
app.use('/Api/V1' ,Blog)
app.use('/Api/V1' ,StageEte)
app.use('/Api/V1' ,Postuler)
app.use('/Api/V1' ,Confirm)
app.use('/Api/V1' , Cv)
app.use('/Api/V1' , Invitation)
app.use('/Api/V1' , Demande)


var CronJob = require('cron').CronJob;
var job = new CronJob(
	'* * * * *',
	async function() {
		/*let transporter = nodemailer.createTransport({
            service :"Gmail",
              auth: {
                user: "sebaisameh51@gmail.com",
                pass: "kashplocvadlnwnk" ,
      
              },
            });
            await transporter.sendMail({
              from:"sebaisameh51@gmail.com",
              to: "ahlemtbini28@gmail.com",
              subject: "notification ",
              html: `<h1>You will see this message six monthes view link <a href="
              #">dashbord</a>
              
              `
            })
            console.log("you will see this msg every six monthes")*/
            
	},
	null,
	true,
	'America/Los_Angeles'
);
job.start()

var jobDiplome = new CronJob(
	'* * * * *',
	async function() {
		/*let transporter = nodemailer.createTransport({
            service :"Gmail",
              auth: {
                user: "sebaisameh51@gmail.com",
                pass: "kashplocvadlnwnk" ,
      
              },
            });
            await transporter.sendMail({
              from:"sebaisameh51@gmail.com",
              to: "ahlemtbini28@gmail.com",
              subject: "notification ",
              html: `<h1>You will see this message six monthes view link <a href="
              #">dashbord</a>
              
              `
            })
            console.log("you should update your profil if you are graduated")*/
            
	},
	null,
	true,
	'America/Los_Angeles'
);
jobDiplome.start()
//PORT
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
