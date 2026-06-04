import { Response } from 'express';

import { FinancialProfile } from '../models/financial-profile.model';

import type { AuthRequest } from '../types/auth.types';

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
   const userId = req.user?.userId;

    if (!userId) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }

    const profile = await FinancialProfile.findOne({user: userId});
    return res.json(profile);
};

export const saveProfile = async (
  req: AuthRequest,
  res: Response
) => {

  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  const data = {
    monthlyBudget: req.body.monthlyBudget,
    totalSavings: req.body.totalSavings,
    monthlySalary: req.body.monthlySalary,
    user: userId
  };

  const profile = await FinancialProfile.findOneAndUpdate({user: userId}, data,
      {
        upsert: true,
        new: true
      }
    );

  return res.json(profile);

};