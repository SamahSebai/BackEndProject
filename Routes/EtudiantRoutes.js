const express=require('express');
const authRole = require('../Passport/RoleAllowed')
const multer = require('multer');
const upload = multer();


const { FetchEtudiant, FetchEtudiantById, UpdateEtudiant, DeleteEtudiant, UpdateEtudiantVisibility, FetchEtudiantPublic, uploadStudents } = require('../Controllers/Etudiant/EtudiantController');
const passport = require('passport');

const router=express.Router()

router.get('/Etudiant',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , FetchEtudiant)
router.put('/Etudiant/visiblitiy/:idEtudiant',  passport.authenticate('bearer', { session: false }), authRole("Etudiant") , UpdateEtudiantVisibility)
router.get('/Etudiant/public',  passport.authenticate('bearer', { session: false }), authRole("Etudiant") ,FetchEtudiantPublic)
router.get('/Etudiant/:idEtudiant',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , FetchEtudiantById)
router.put('/Etudiant/Update/:idEtudiant',  passport.authenticate('bearer', { session: false }), authRole("Etudiant") , UpdateEtudiantVisibility)
router.put('/EtudiantAdmin/:idEtudiant',  passport.authenticate('bearer', { session: false }), authRole( "ADMIN") , UpdateEtudiant)
router.delete('/Etudiant/:idEtudiant' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), DeleteEtudiant)
router.post('/EtudiantUploadStudents' , upload.any() , uploadStudents)




module.exports=router