import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getStories } from '../controllers/storyController.js';
import { getStoriesSchema } from '../validations/storyValidation.js';

const storiesRoutes = Router();

storiesRoutes.get('/', celebrate(getStoriesSchema), getStories);

export default storiesRoutes;
