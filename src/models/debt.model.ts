import mongoose from 'mongoose';

const debtSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true
  },

  lender: {
    type: String,
    required: true
  },

  emi: {
    type: Number,
    required: true
  },

  outstandingAmount: {
    type: Number,
    default: 0
  },

  interestRate: {
    type: Number,
    default: 0
  },

  endDate: {
    type: Date
  },

  notes: {
    type: String,
    default: ''
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
});

export const Debt =
  mongoose.model(
    'Debt',
    debtSchema
  );