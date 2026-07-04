import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';

import {
  getStories,
  getStoryById,
} from '../controllers/storyController.js';
import { getSavedStories } from '../controllers/storiesController.js';

import {
  getStoriesSchema,
  getStoryByIdSchema,
} from '../validations/storyValidation.js';

const storiesRoutes = Router();

storiesRoutes.get('/saved', authenticate, getSavedStories);
storiesRoutes.get('/', celebrate(getStoriesSchema), getStories);
storiesRoutes.get('/:storyId', celebrate(getStoryByIdSchema), getStoryById);

export default storiesRoutes;