const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const teacherController = require('../controllers/teacher.controller');


router.get('/', VerifyUserToken, /*VerifyRole(["administrator","teacher"])*/ teacherController.getAllTeachers);
router.post('/:user', VerifyUserToken, /*VerifyRole(["administrator"])*/ teacherController.addTeacher);
router.post('/', VerifyUserToken, /*VerifyRole(["administrator"])*/ teacherController.createTeacher);
router.put('/:id', VerifyUserToken, /*VerifyRole(["administrator","teacher"]),*/ teacherController.updateTeacher);
router.get('/:id', VerifyUserToken, /*VerifyRole(["administrator","teacher"])*/ teacherController.getTeacher);
router.delete('/:id', VerifyUserToken, /*VerifyRole(["administrator"]),*/ teacherController.deleteTeacher);



module.exports = router;