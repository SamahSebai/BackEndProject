const router = require('express').Router();
const { VerifyUserToken, VerifyRole, isAlumni } = require("../middleware/auth");
const demandeController = require('../controllers/demande.controller');

//others
router.get('/', VerifyUserToken, demandeController.getDemande);


//alumni
router.post('/', VerifyUserToken, isAlumni(), demandeController.insertDemande);
router.patch('/:id', VerifyUserToken, isAlumni(), demandeController.updateDemande);
router.get('/:id', VerifyUserToken, isAlumni(), demandeController.getDemande);
router.delete('/:id', VerifyUserToken, isAlumni(), demandeController.deleteDemande);




module.exports = router;