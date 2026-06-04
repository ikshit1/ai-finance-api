import { Router } from 'express';

import {
  getProfile,
  saveProfile
}
from '../controllers/profile.controller.js';

import {
  protect
}
from '../middleware/auth.middleware.js';

const router = Router();

router.get(
  '/',
  protect,
  getProfile
);

router.post(
  '/',
  protect,
  saveProfile
);

export default router;