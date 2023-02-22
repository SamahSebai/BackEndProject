const router = require('express').Router();
const testController = require('../controllers/test');

/**
 * @swagger
 * /test:
 *   get:
 *     description:  test
 *     tags:
 *       - test
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Test routes
 *         schema:
 *           type: string
 */
router.get('/', testController.testGet);

router.get('/mail', testController.testMail);

module.exports = router;