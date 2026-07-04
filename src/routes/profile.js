import { Router } from 'express';

import {
  getCurrentUser,
  updateAvatar,
} from '../controllers/profileController.js';

import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/me', authenticate, getCurrentUser);

router.patch('/avatar', authenticate, upload.single('avatar'), updateAvatar);

export default router;
