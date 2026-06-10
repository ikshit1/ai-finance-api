import { Response } from 'express';

import { Transaction } from '../models/transaction.model';
import { FinancialProfile } from '../models/financial-profile.model';
import { Debt } from '../models/debt.model';

import type {
  AuthRequest
} from '../types/auth.types';

export const getAnalytics = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const userId =
      req.user?.userId;

    if (!userId) {

      return res.status(401).json({
        message: 'Unauthorized'
      });

    }

    const [
      debts,
      transactions,
      profile
    ] = await Promise.all([

      Debt.find({
        user: userId
      }),

      Transaction.find({
        user: userId
      }),

      FinancialProfile.findOne({
        user: userId
      })

    ]);

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

    const monthlySavings =
      income - expense;

    const totalSavings =
      profile?.totalSavings || 0;

    const totalMonthlyEmi =
      debts.reduce(

        (sum, debt) =>

          sum + debt.emi,

        0

      );

    const totalOutstanding =
      debts.reduce(

        (sum, debt) =>

          sum +
          debt.outstandingAmount,

        0

      );

    const categoryMap =
      new Map<string, number>();

    transactions
      .filter(
        t => t.type === 'Expense'
      )
      .forEach(transaction => {

        const current =

          categoryMap.get(
            transaction.category
          ) || 0;

        categoryMap.set(

          transaction.category,

          current +
          transaction.amount

        );

      });

    const categoryBreakdown =

      Array.from(
        categoryMap.entries()
      )

      .map(

        ([category, amount]) => ({

          category,

          amount

        })

      );

    let healthScore = 0;

    const insights: string[] = [];

    const savingsRate =

      income > 0

        ? (monthlySavings / income) * 100

        : 0;

    if (savingsRate >= 30) {

      healthScore += 30;

      insights.push(
        'Excellent savings rate.'
      );

    }

    else if (savingsRate >= 20) {

      healthScore += 20;

      insights.push(
        'Good savings rate.'
      );

    }

    else if (savingsRate >= 10) {

      healthScore += 10;

      insights.push(
        'Savings rate can be improved.'
      );

    }

    else {

      insights.push(
        'Savings rate is low.'
      );

    }

    const emiBurden =

      profile?.monthlySalary

      ? (

        totalMonthlyEmi /

        profile.monthlySalary

      ) * 100

      : 0;

    if (emiBurden < 20) {

      healthScore += 25;

      insights.push(
        'EMI burden is healthy.'
      );

    }

    else if (emiBurden < 35) {

      healthScore += 15;

      insights.push(
        'EMI burden is manageable.'
      );

    }

    else {

      insights.push(
        'EMI burden is high.'
      );

    }

    if (

      totalSavings >=
      expense * 6

    ) {

      healthScore += 25;

      insights.push(
        'Emergency fund is strong.'
      );

    }

    else if (

      totalSavings >=
      expense * 3

    ) {

      healthScore += 15;

      insights.push(
        'Emergency fund is adequate.'
      );

    }

    else {

      insights.push(
        'Emergency fund is low.'
      );

    }

    const budgetUsage =

      profile?.monthlyBudget

      ? (

        expense /

        profile.monthlyBudget

      ) * 100

      : 0;

    if (budgetUsage <= 80) {

      healthScore += 20;

      insights.push(
        'You are within budget.'
      );

    }

    else if (budgetUsage <= 100) {

      healthScore += 10;

      insights.push(
        'Budget usage is near limit.'
      );

    }

    else {

      insights.push(
        'You exceeded your budget.'
      );

    }

    const topCategory =

  categoryBreakdown.length > 0

    ? [...categoryBreakdown]
        .sort(
          (a, b) =>
            b.amount - a.amount
        )[0]?.category

    : null;

    if (topCategory) {

      insights.push(
        `${topCategory} is your highest spending category.`
      );

    }

    return res.json({

      income,

      expense,

      monthlySavings,

      totalSavings,

      monthlyBudget:
        profile?.monthlyBudget || 0,

      monthlySalary:
        profile?.monthlySalary || 0,

      totalMonthlyEmi,

      activeLoans:
        debts.length,

      totalOutstanding,

      categoryBreakdown,

      healthScore,

      insights

    });

  }

  catch {

    return res.status(500).json({

      message:
        'Failed to fetch analytics'

    });

  }

};