const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { markTaskAsDone, getEmployeeDetails } = require('../controllers/employeeController');
const router = express.Router();

router.use(authMiddleware);
router.put('/tasks/:taskId/done', markTaskAsDone);
router.get('/details', getEmployeeDetails);

module.exports = router;