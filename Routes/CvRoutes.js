const express=require('express');
const authRole = require('../Passport/RoleAllowed')


const { FetchCv, FetchCvByStudentId, UpdateCv, DeleteCv, CreateCv } = require('../Controllers/Cv/CvController');
const passport = require('passport');

const router=express.Router()
router.post('/CreateCv',  passport.authenticate('bearer', { session: false }) , CreateCv)
router.get('/Cv',  passport.authenticate('bearer', { session: false }), FetchCv)
router.get('/CvByStudent/:id_st',  passport.authenticate('bearer', { session: false }), FetchCvByStudentId)
router.put('/Cv/:idCv',  passport.authenticate('bearer', { session: false }) , UpdateCv)
router.delete('/Cv/:idCv' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN", "Enseignant"), DeleteCv)




module.exports=router