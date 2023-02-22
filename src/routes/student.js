const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const multer = require('multer');
const upload = multer();
const studentController = require('../controllers/student.controller');



router.post('/:user', VerifyUserToken, /*VerifyRole(["administrator"])*/ studentController.addStudent);
//router.post('/', VerifyUserToken, /*VerifyRole(["administrator"])*/ studentController.createStudent);
router.put('/:id', VerifyUserToken,VerifyRole(["administrator","student"]), studentController.updateStudent);
router.get('/:id', VerifyUserToken,VerifyRole(["administrator","student"]), studentController.getStudent);
router.get('/',/* VerifyUserToken,VerifyRole(["administrator"]),*/ studentController.getAllStudents);
router.delete('/:id', VerifyUserToken, VerifyRole(["administrator"]), studentController.deleteStudent);
router.post('/excel/upload', /*VerifyUserToken,*/ /*VerifyRole(["administrator"]),*/ upload.any(), studentController.uploadStudents);




module.exports = router;