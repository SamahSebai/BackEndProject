const express=require('express');

const { CreateDemande ,FetchDemande} = require('../Controllers/Demande/Demande');
const passport = require('passport');

const router=express.Router()


router.post('/Demande',  passport.authenticate('bearer', { session: false }) , CreateDemande)
router.get('/Demande',  passport.authenticate('bearer', { session: false }) ,FetchDemande)





module.exports=router