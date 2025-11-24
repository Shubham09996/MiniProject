const asyncHandler = require('express-async-handler');
const FinancialGoal = require('../models/FinancialGoal');

// @desc    Get financial goals
// @route   GET /api/financialgoals
// @access  Private
const getFinancialGoals = asyncHandler(async (req, res) => {
  const financialGoals = await FinancialGoal.find({ user: req.user.id });
  res.status(200).json(financialGoals);
});

// @desc    Set financial goal
// @route   POST /api/financialgoals
// @access  Private
const setFinancialGoal = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.targetAmount || !req.body.icon) {
    res.status(400);
    throw new Error('Please add all required fields: title, targetAmount, icon');
  }

  const financialGoal = await FinancialGoal.create({
    title: req.body.title,
    currentAmount: req.body.currentAmount || 0,
    targetAmount: req.body.targetAmount,
    icon: req.body.icon,
    user: req.user.id,
  });

  res.status(200).json(financialGoal);
});

// @desc    Update financial goal
// @route   PUT /api/financialgoals/:id
// @access  Private
const updateFinancialGoal = asyncHandler(async (req, res) => {
  const financialGoal = await FinancialGoal.findById(req.params.id);

  if (!financialGoal) {
    res.status(400);
    throw new Error('Financial goal not found');
  }

  // Make sure the logged in user matches the goal user
  if (financialGoal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedFinancialGoal = await FinancialGoal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedFinancialGoal);
});

// @desc    Delete financial goal
// @route   DELETE /api/financialgoals/:id
// @access  Private
const deleteFinancialGoal = asyncHandler(async (req, res) => {
  const financialGoal = await FinancialGoal.findById(req.params.id);

  if (!financialGoal) {
    res.status(400);
    throw new Error('Financial goal not found');
  }

  // Make sure the logged in user matches the goal user
  if (financialGoal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await financialGoal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getFinancialGoals,
  setFinancialGoal,
  updateFinancialGoal,
  deleteFinancialGoal,
};
