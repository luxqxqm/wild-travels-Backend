import {Joi, Segments} from 'celebrate';

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    img: Joi.string(),
    title: Joi.string().min(2).max(40).required(),
    article: Joi.string().min(12).max(3000).required(),
    category: Joi.string().required(),
    rate: Joi.number().integer().min(1).max(100),
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
  })
};
