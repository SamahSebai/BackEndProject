const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const eventController = require('../controllers/event.controller');
// replace isAdmin by isTeacher

router.post('/', VerifyUserToken, VerifyRole(["teacher"]), eventController.insertEvent);
router.patch('/:id', VerifyUserToken, VerifyRole(["teacher"]), eventController.updateEvent);
router.get('/:id', VerifyUserToken, VerifyRole(["teacher"]), eventController.getEvent);
router.delete('/:id', VerifyUserToken, VerifyRole(["teacher"]), eventController.deleteEvent);

module.exports = router;