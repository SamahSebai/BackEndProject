const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const internshipController = require('../controllers/internship.controller');
// replace isAdmin by isTeacher



router.post('/', VerifyUserToken, VerifyRole(["student"]), internshipController.insertInternship);
router.patch('/:id', VerifyUserToken, VerifyRole(["student"]), internshipController.updateInternship);
router.get('/', VerifyUserToken, VerifyRole(["teacher"]), internshipController.getAllInternships);
router.get('/:id', VerifyUserToken, VerifyRole(["student","teacher"]), internshipController.getInternshipsById);

module.exports = router;