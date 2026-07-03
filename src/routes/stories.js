import { Router } from 'express';
import { getRecommendedStoriesController } from '../controllers/storyController.js';

const router = Router();

router.get('/recommended', getRecommendedStoriesController);

export default router;
