import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { getSavedStories } from '../controllers/storiesController.js';

const storiesRouter = Router();

storiesRouter.get('/saved', authenticate, getSavedStories);

export default storiesRouter;