import express from 'express';

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller.js';

const router = express.Router();


// GET
router.get(
  '/',
  getTransactions
);


// POST
router.post(
  '/',
  createTransaction
);


// DELETE
router.delete(
  '/:id',
  deleteTransaction
);


export default router;