import { Router } from 'express';

import {
  getDebts,
  createDebt,
  updateDebt,
  deleteDebt
}
from '../controllers/debt.controller.js';

import {
  protect
}
from '../middleware/auth.middleware.js';

const router = Router();

router.get(
  '/',
  protect,
  getDebts
);

router.post(
  '/',
  protect,
  createDebt
);

router.put(
  '/:id',
  protect,
  updateDebt
);

router.delete(
  '/:id',
  protect,
  deleteDebt
);

export default router;