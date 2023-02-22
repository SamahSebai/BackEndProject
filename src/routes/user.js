const router = require('express').Router();
const { VerifyUserToken, VerifyRole } = require("../middleware/auth");
const userController = require('../controllers/user.controller');


//user
router.post('/login', userController.login);

//super admin (directeur etudes)

/**
 * @swagger
 * /user/:
 *   post:
 *     description:  test endpoint
 *     tags:
 *       - User
 */
router.post('/', /*VerifyUserToken, VerifyRole("directeur"),*/ userController.create);
/**
 * @swagger
 * /user/:id:
 *   post:
 *     description:  test endpoint
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully login
 *         schema:
 *           properties:
 *             status:
 *               type: string
 *             faId:
 *               type: string
 */
router.put('/:id', VerifyUserToken, VerifyRole(["directeur"]),userController.updateUser)
/**
 * @swagger
 * /user/:id:
 *   post:
 *     description:  test endpoint
 *     tags:
 *       - User
 */
router.delete('/:id', VerifyUserToken, VerifyRole(["directeur"]),userController.deleteUser)
/**
 * @swagger
 * /user/:id:
 *   get:
 *     description:  test endpoint
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully login
 *         schema:
 *           properties:
 *             status:
 *               type: string
 *             faId:
 *               type: string
 */
router.get('/:id', VerifyUserToken, VerifyRole(["directeur"]) ,userController.getUser)

router.put('/auth/forget',userController.forgotPassword)

router.put('/auth/reset',userController.resetPassword)



/**
 * @swagger
 * 
 * /auth/change-password:
 *   put:
 *     summary: Change user password
 *     description: Update the current user's password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: The new password for the user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *     responses:
 *       200:
 *         description: Successfully changed password
 *       404:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.put('/auth/change-password', userController.changePassword);

module.exports = router;