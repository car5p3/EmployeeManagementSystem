const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { createEmployee, updateEmployeeSalary } = require('../controllers/adminController');
const router = express.Router();

router.use(authMiddleware, roleMiddleware('admin'));
router.post('/employees', createEmployee);
router.put('/employees/:employeeId/salary', updateEmployeeSalary);

module.exports = router;