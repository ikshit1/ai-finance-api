import type { Request, Response } from 'express';
import { Transaction } from '../models/transaction.model';
import type { AuthRequest } from '../types/auth.types';

// GET ALL TRANSACTIONS
export const getTransactions = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      search,
      type,
    } = req.query;

    const filter: any = {};

    if (search) {

      filter.category = {
        $regex: search,
        $options: 'i',
      };
    }

    if (type) {

      filter.type = type;
    }

    const transactions =
      await Transaction.find({
        ...filter,
        user: req.user?.userId
      });

    res.status(200).json({
      success: true,
      data: transactions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        'Failed to fetch transactions',
    });

  }
};


// CREATE TRANSACTION
export const createTransaction = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const transaction = await Transaction.create(
      { ...req.body, user: req.user?.userId }
    );

    res.status(200).json({
      success: true,
      data: transaction,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
    });

  }
};


// DELETE TRANSACTION
export const deleteTransaction = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { id } = req.params;

    await Transaction.findByIdAndDelete({ _id: id, user: req.user?.userId });

    res.status(200).json({
      success: true,
      message: 'Transaction deleted',
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction',
    });

  }
};