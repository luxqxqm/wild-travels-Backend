import * as storyService from '../services/storyService.js';

export const getStoryById = async (req, res, next) => {
  try {
    const { storyId } = req.params;

    const story = await storyService.getStoryById(storyId);

    if (!story) {
      return res.status(404).json({
        message: 'Така історія відсутня',
      });
    }

    return res.status(200).json(story);
  } catch (error) {
    next(error);
  }
};
