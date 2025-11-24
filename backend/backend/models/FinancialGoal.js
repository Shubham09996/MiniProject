
const mongoose = require('mongoose');

const financialGoalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    currentAmount: {
      type: Number,
      required: [true, 'Please add current amount'],
      default: 0,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Please add target amount'],
    },
    icon: {
      type: String,
      required: [true, 'Please add an icon'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FinancialGoal', financialGoalSchema);
