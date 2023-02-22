const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const pfaController = require('../controllers/pfa.controller');
// replace isAdmin by isTeacher

router.post('/', VerifyUserToken, VerifyRole("teacher"), pfaController.insertPfa);
router.patch('/:id', VerifyUserToken, VerifyRole("teacher"), pfaController.updatePfa);
router.get('/:id', VerifyUserToken, VerifyRole("teacher"), pfaController.getPfa);
router.delete('/:id', VerifyUserToken, VerifyRole("teacher"), pfaController.deletePfa);

module.exports = router;