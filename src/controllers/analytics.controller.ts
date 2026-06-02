import type { Response } from 'express';

import { Transaction } from '../models/transaction.model';

import type {
  AuthRequest,
} from '../types/auth.types';

export const getAnalytics = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    const transactions =
      await Transaction.find({
        user: userId,
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

    const savings =
      income - expense;

    const transactionCount =
      transactions.length;

    const categoryTotals:
      Record<string, number> = {};

    transactions.forEach(t => {

      if (
        t.type === 'Expense'
      ) {

        categoryTotals[
          t.category
        ] =
          (
            categoryTotals[
              t.category
            ] || 0
          ) + t.amount;

      }

    });

    let topCategory =
      'N/A';

    let maxAmount = 0;

    Object.entries(
      categoryTotals
    ).forEach(
      ([category, amount]) => {

        if (
          amount > maxAmount
        ) {

          maxAmount =
            amount;

          topCategory =
            category;

        }

      }
    );

    return res.json({

      income,

      expense,

      savings,

      transactionCount,

      topCategory,

    });

  } catch (error) {

    return res.status(500).json({

      message:
        'Analytics failed'

    });

  }

};