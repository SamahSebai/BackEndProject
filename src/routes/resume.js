const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const resumeController = require('../controllers/resume.controller');
// replace isAdmin by isTeacher


router.post('/', VerifyUserToken, VerifyRole(["student"]), resumeController.insertResume);
router.patch('/:id', VerifyUserToken, VerifyRole(["student"]), resumeController.updateResume);
router.get('/:id', VerifyUserToken, VerifyRole(["student","teacher"]), resumeController.getResumeById);
router.get('/get/all', VerifyUserToken, VerifyRole(["teacher"]), resumeController.getAllResume);

module.exports = router;