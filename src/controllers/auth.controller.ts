import type {
  Request,
  Response,
} from 'express';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import type { AuthRequest } from '../types/auth.types';

export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: 'Register failed',
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: 'Invalid credentials',
      });
    }

/*     const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid credentials',
      });
    } */

    const token = jwt.sign(
      {
        userId: user._id,
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: '7d',
      }
    );

    res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: 'Login failed',
    });
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const user =
      await User.findById(
        req.user?.userId
      ).select('-password');

    return res.json(user);

  } catch (error) {

    return res.status(500).json({
      message:
        'Failed to fetch user'
    });

  }

};