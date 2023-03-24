const express=require('express');
const authRole = require('../Passport/RoleAllowed')


const passport = require('passport');
const  {CreatePostulerPFE, FetchPostulerPFE}  = require('../Controllers/Postuler/PostulerPFE');
const { CreatePostulerPFA } = require('../Controllers/Postuler/PostulerPFA.JS');

const router=express.Router()
router.post('/PostulerPFE',  passport.authenticate('bearer', { session: false }), authRole("Etudiant") , CreatePostulerPFE)
router.post('/PostulerPFA',  passport.authenticate('bearer', { session: false }), authRole("Etudiant") , CreatePostulerPFA)
router.get('/FetchPostulerPFE',  passport.authenticate('bearer', { session: false }), FetchPostulerPFE)





module.exports=router