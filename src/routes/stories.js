import { celebrate } from 'celebrate';
import { Router } from 'express';
import { createStory } from '../controllers/storyController.js';
import { createStorySchema } from '../validations/storyValidation.js';
import { upload } from '../middleware/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const storiesRoutes = Router();

storiesRoutes.post('/', authenticate, upload.single('img'), celebrate(createStorySchema), createStory);

export default storiesRoutes;
