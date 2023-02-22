const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const personnelController = require('../controllers/personnel.controller');


router.get('/', VerifyUserToken, /*VerifyRole(["administrator","teacher"])*/ personnelController.getAllPersonnels);
router.post('/:user', VerifyUserToken, /*VerifyRole(["administrator"])*/ personnelController.addPersonnel);
router.post('/', VerifyUserToken, /*VerifyRole(["administrator"])*/ personnelController.createPersonnel);
router.put('/:id', VerifyUserToken, /*VerifyRole(["administrator","teacher"]),*/ personnelController.updatePersonnel);
router.get('/:id', VerifyUserToken, /*VerifyRole(["administrator","teacher"])*/ personnelController.getPersonnel);
router.delete('/:id', VerifyUserToken, /*VerifyRole(["administrator"]),*/ personnelController.deletePersonnel);



module.exports = router;