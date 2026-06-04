import { Response } from 'express';

import { Debt } from '../models/debt.model';

import type { AuthRequest } from '../types/auth.types.js';

export const getDebts = async (
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
    const debts = await Debt.find({user: userId});
    return res.json(debts);
  } catch {

    return res.status(500).json({
      message:
        'Failed to fetch debts'
    });
  }
};

export const createDebt = async (
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
    const debt =
      await Debt.create({
        ...req.body,
        user: userId
      });

    return res.status(201)
      .json(debt);

  } catch {

    return res.status(500).json({
      message:
        'Failed to create debt'
    });

  }

};

export const updateDebt = async (
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
    const debt = await Debt.findOneAndUpdate({
          _id: req.params.id,
          user: userId
        },
        req.body,
        {
          new: true
        }
      );

    return res.json(debt);

  } catch {

    return res.status(500).json({
      message:
        'Failed to update debt'
    });

  }

};

export const deleteDebt = async (
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
    await Debt.findOneAndDelete({
        _id:req.params.id, user: userId
    });

    return res.json({
      success: true
    });

  } catch {

    return res.status(500).json({
      message:
        'Failed to delete debt'
    });

  }

};