import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['Income', 'Expense'],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ['Completed', 'Pending', 'Received'],
      default: 'Completed',
    },
  },

  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model(
  'Transaction',
  transactionSchema
);