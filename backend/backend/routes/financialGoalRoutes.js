const express = require('express');
const router = express.Router();
const {
  getFinancialGoals,
  setFinancialGoal,
  updateFinancialGoal,
  deleteFinancialGoal,
} = require('../controllers/financialGoalController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getFinancialGoals).post(protect, setFinancialGoal);
router.route('/:id').delete(protect, deleteFinancialGoal).put(protect, updateFinancialGoal);

module.exports = router;
