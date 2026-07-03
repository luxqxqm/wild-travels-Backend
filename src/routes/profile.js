
import { Router } from 'express';
import { getCurrentUser , updateAvatar } from '../controllers/profileController.js';
import { authenticate } from '../middleware/authenticate.js';
const profileRoutes = Router();

profileRoutes.get('/current', authenticate, getCurrentUser);
profileRoutes.patch('/avatar', authenticate, updateAvatar);



export default profileRoutes;


