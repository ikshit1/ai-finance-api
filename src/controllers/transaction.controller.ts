import type { Response } from 'express';
import mongoose from 'mongoose';
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

  } catch {

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

    const transaction =
      await Transaction.create({

        ...req.body,

        user:
          req.user?.userId

      });

    res.status(200).json({

      success: true,

      data: transaction

    });

  } catch {

    res.status(500).json({

      success: false,

      message:
        'Failed to create transaction'

    });

  }

};

// UPDATE TRANSACTION
export const updateTransaction = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { id } =
      req.params;

    const transaction =
      await Transaction.findOneAndUpdate(

        {
          _id: new mongoose.Types.ObjectId(id as string),
          user:
            new mongoose.Types.ObjectId(req.user?.userId as string)
        },

        req.body,

        {
          returnDocument: 'after'
        }

      );

    if (!transaction) {

      return res.status(404).json({

        success: false,

        message:
          'Transaction not found'

      });

    }

    return res.status(200).json({

      success: true,

      data: transaction

    });

  }

  catch {

    return res.status(500).json({

      success: false,

      message:
        'Failed to update transaction'

    });

  }

};

// DELETE TRANSACTION
export const deleteTransaction = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { id } =
      req.params;

    const transaction =
      await Transaction.findOneAndDelete({

        _id: new mongoose.Types.ObjectId(id as string),

        user:
          new mongoose.Types.ObjectId(req.user?.userId as string)

      });

    if (!transaction) {

      return res.status(404).json({

        success: false,

        message:
          'Transaction not found'

      });

    }

    return res.status(200).json({

      success: true,

      message:
        'Transaction deleted'

    });

  }

  catch {

    return res.status(500).json({

      success: false,

      message:
        'Failed to delete transaction'

    });

  }

};