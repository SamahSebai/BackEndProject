const express=require('express');
const authRole = require('../Passport/RoleAllowed')


const { FetchCv, FetchCvById, UpdateCv, DeleteCv, CreateCv } = require('../Controllers/Cv/CvController');
const passport = require('passport');

const router=express.Router()
router.post('/Cv',  passport.authenticate('bearer', { session: false }), authRole("ADMIN", "Enseignant") , CreateCv)
router.get('/Cv',  passport.authenticate('bearer', { session: false }), FetchCv)
router.get('/Cv/:idCv',  passport.authenticate('bearer', { session: false }), FetchCvById)
router.put('/Cv/:idCv',  passport.authenticate('bearer', { session: false }) , UpdateCv)
router.delete('/Cv/:idCv' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN", "Enseignant"), DeleteCv)




module.exports=router