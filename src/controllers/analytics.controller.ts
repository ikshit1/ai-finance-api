import { Response } from 'express';

import { Transaction }
from '../models/transaction.model.js';

import { FinancialProfile }
from '../models/financial-profile.model.js';

import type {
  AuthRequest
}
from '../types/auth.types.js';

export const getAnalytics = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({
        message: 'Unauthorized'
        });
    }

    const transactions =
      await Transaction.find({
        user: userId
      });

    const income =
      transactions
        .filter(
          t => t.type === 'Income'
        )
        .reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

    const expense =
      transactions
        .filter(
          t => t.type === 'Expense'
        )
        .reduce(
          (sum, t) =>
            sum + t.amount,
          0
        );

    const profile =
      await FinancialProfile.findOne({
        user: userId
      });

    const monthlySavings =
      income - expense;

    return res.json({

      income,

      expense,

      monthlySavings,

      totalSavings:
        profile?.totalSavings || 0,

      monthlyBudget:
        profile?.monthlyBudget || 0,

      monthlySalary:
        profile?.monthlySalary || 0

    });

  } catch (error) {

    return res.status(500).json({
      message:
        'Failed to fetch analytics'
    });

  }

};