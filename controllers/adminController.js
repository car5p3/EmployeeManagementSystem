const User = require('../models/User');

const createEmployee = async (req, res) => {
  const { name, email, password, role, salary } = req.body;
  try {
    const employee = new User({ name, email, password, role, salary });
    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployeeSalary = async (req, res) => {
  const { employeeId } = req.params;
  const { salary } = req.body;
  try {
    const employee = await User.findByIdAndUpdate(employeeId, { salary }, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createEmployee, updateEmployeeSalary };