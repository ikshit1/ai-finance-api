import express from 'express';

import {

  getTransactions,

  createTransaction,

  updateTransaction,

  deleteTransaction

} from '../controllers/transaction.controller';

import {

  protect

} from '../middleware/auth.middleware';

const router =
  express.Router();

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

// PUT
router.put(

  '/:id',

  protect,

  updateTransaction

);

// DELETE
router.delete(

  '/:id',

  protect,

  deleteTransaction

);

export default router;