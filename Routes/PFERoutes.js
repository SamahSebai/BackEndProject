const express=require('express');
const authRole = require('../Passport/RoleAllowed')


const { FetchPFE, FetchPFEById, UpdatePFE, DeletePFE, CreatePFE, getPfeStatistics } = require('../Controllers/PFE/PFEController');
const passport = require('passport');

const router=express.Router()
router.post('/PFE',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , CreatePFE)
router.post('/PFEe',  passport.authenticate('bearer', { session: false }), authRole( "Etudiant") , CreatePFE)
router.get('/PFE',  passport.authenticate('bearer', { session: false }) , FetchPFE)
router.get('/PFE/:idPFE',  passport.authenticate('bearer', { session: false }) , FetchPFEById)
router.put('/PFE/:idPFE',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , UpdatePFE)
router.delete('/PFE/:idPFE' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), DeletePFE)
router.get('/PFEStatistics' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), getPfeStatistics)




module.exports=router