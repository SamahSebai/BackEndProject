const express=require('express');
const authRole = require('../Passport/RoleAllowed')


const { FetchPFA, FetchPFAById, UpdatePFA, DeletePFA, CreatePFA } = require('../Controllers/PFA/PFAController');
const passport = require('passport');

const router=express.Router()
router.post('/PFA',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , CreatePFA)
router.post('/PFAens',  passport.authenticate('bearer', { session: false }), authRole("Enseignant") , CreatePFA)
router.get('/PFA',  passport.authenticate('bearer', { session: false }), FetchPFA)
router.get('/PFA/:idPFA',  passport.authenticate('bearer', { session: false }) , FetchPFAById)
router.put('/PFA/:idPFA',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , UpdatePFA)
router.put('/PFAens/:idPFA',  passport.authenticate('bearer', { session: false }), authRole( "Enseignant") , UpdatePFA)
router.delete('/PFA/:idPFA' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), DeletePFA)
router.delete('/PFAens/:idPFA' ,  passport.authenticate('bearer', { session: false }), authRole( "Enseignant"), DeletePFA)




module.exports=router