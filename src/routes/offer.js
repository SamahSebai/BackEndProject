const router = require('express').Router();
const { VerifyUserToken, VerifyRole, isAlumni } = require("../middleware/auth");
const offerController = require('../controllers/offer.controller');

//others
router.get('/', VerifyUserToken, offerController.getOffer);


//alumni
router.post('/', VerifyUserToken, isAlumni(), offerController.insertOffer);
router.patch('/:id', VerifyUserToken, isAlumni(), offerController.updateOffer);
router.get('/:id', VerifyUserToken, isAlumni(), offerController.getOffer);
router.delete('/:id', VerifyUserToken, isAlumni(), offerController.deleteOffer);




module.exports = router;