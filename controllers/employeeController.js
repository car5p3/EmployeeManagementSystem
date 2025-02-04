const Task = require('../models/Task');
const User = require('../models/User');

const markTaskAsDone = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const employee = await User.findById(req.user.id).select('-password');
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { markTaskAsDone, getEmployeeDetails };