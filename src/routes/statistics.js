const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const statisticsController = require('../controllers/statistics.controller');
// replace isAdmin by isTeacher



// router.post('/', VerifyUserToken, VerifyRole(["student"]), statisticsController.insertStatistics);
// router.patch('/:id', VerifyUserToken, VerifyRole(["student"]), statisticsController.updateStatistics);
// router.get('/:id', VerifyUserToken, VerifyRole(["student","teacher"]), statisticsController.getStatisticsById);
router.get('/alumni',statisticsController.getStudentAlimniStatistics);
router.get('/pfe',statisticsController.getPfeStatistics);
// router.get('/get/all', VerifyUserToken, VerifyRole(["teacher"]), statisticsController.getAllStatistics);

module.exports = router;