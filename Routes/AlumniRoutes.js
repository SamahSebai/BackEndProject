const express=require('express');
const passport = require('passport');
const authRole = require('../Passport/RoleAllowed')
const { FetchAll } = require('../Controllers/Alumini/Alumni');



const { FetchAlumni, FetchAlumniById, UpdateAlumni, DeleteAlumni } = require('../Controllers/Alumini/Alumni');
const router=express.Router()
router.get('/Alumni' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), FetchAlumni)
router.get('/All' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"),FetchAll)
router.put('/Alumni/:idAlumni' ,  passport.authenticate('bearer', { session: false }), UpdateAlumni)
router.get('/Alumni/:idAlumni' ,  passport.authenticate('bearer', { session: false }), authRole("ADMIN"), FetchAlumniById)
router.delete('/Alumni/:idAlumni',  passport.authenticate('bearer', { session: false }), authRole("ADMIN") , DeleteAlumni)


module.exports=router
