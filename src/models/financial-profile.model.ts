import mongoose from 'mongoose';

const financialProfileSchema =
  new mongoose.Schema({

    monthlyBudget: {
      type: Number,
      default: 0
    },

    totalSavings: {
      type: Number,
      default: 0
    },

    monthlySalary: {
      type: Number,
      default: 0
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    }

  }, {
    timestamps: true
  });

export const FinancialProfile =
  mongoose.model(
    'FinancialProfile',
    financialProfileSchema
  );