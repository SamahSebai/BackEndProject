const express=require('express');
const passport = require('passport');
const authRole = require('../Passport/RoleAllowed')



const { FetchAlumni, FetchAlumniById, UpdateAlumni, DeleteAlumni } = require('../Controllers/Alumini/Alumni');
const router=express.Router()
router.get('/Alumni' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), FetchAlumni)
router.put('/Alumni/:idAlumni' ,  passport.authenticate('bearer', { session: false }), UpdateAlumni)
router.put('/Alumni/:idAlumni',  passport.authenticate('bearer', { session: false }) , UpdateAlumni)

router.get('/Alumni/:idAlumni' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), FetchAlumniById)
router.delete('/Alumni/:idAlumni',  passport.authenticate('bearer', { session: false }), DeleteAlumni)


module.exports=router