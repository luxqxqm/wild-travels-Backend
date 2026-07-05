import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createStory,
  getStories,
  getStoryById,
  getRecommendedStoriesController,
} from '../controllers/storyController.js';
import {
  createStorySchema,
  getStoriesSchema,
  getStoryByIdSchema,
} from '../validations/storyValidation.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const storiesRoutes = Router();

storiesRoutes.get('/recommended', getRecommendedStoriesController);

storiesRoutes.get('/', celebrate(getStoriesSchema), getStories);
storiesRoutes.post(
  '/',
  authenticate,
  upload.single('img'),
  celebrate(createStorySchema),
  createStory,
);
storiesRoutes.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

export default storiesRoutes;
