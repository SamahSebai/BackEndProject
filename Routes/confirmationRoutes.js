const express=require('express');
const authRole = require('../Passport/RoleAllowed')


const passport = require('passport');
 
const { ConfirmationPFE, ConfirmationPFA, ConfirmationInvitation } = require('../Controllers/Admin/Confirmation');

const router=express.Router()
router.post('/confirmPFE',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") ,ConfirmationPFE)
router.post('/confirmPFA',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") ,ConfirmationPFA)
router.post('/confirmInvitation',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") ,ConfirmationInvitation)





module.exports=router