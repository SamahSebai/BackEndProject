const express=require('express');
const passport = require('passport');


const { CreateInvitation } = require('../Controllers/Invitation/InvitationController');

const router=express.Router()
router.post('/Invitation',  passport.authenticate('bearer', { session: false }), CreateInvitation)






module.exports=router