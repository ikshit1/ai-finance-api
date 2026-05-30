import express from 'express';

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();


// GET
router.get(
  '/',
  protect,
  getTransactions
);


// POST
router.post(
  '/',
  protect,
  createTransaction
);


// DELETE
router.delete(
  '/:id',
  protect,
  deleteTransaction
);


export default router;