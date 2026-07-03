import { Story } from '../models/story.js';
import { calculatePaginationData } from '../utils/pagination.js';

export const getStories = async (req, res, next) => {
  try {
    const { page = 1, perPage = 12, category, type } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    const { skip, limit } = calculatePaginationData(page, perPage);

    const sort =
      type === 'popular'
        ? { savedCount: -1, createdAt: -1 }
        : { createdAt: -1 };

    const [stories, totalItems] = await Promise.all([
      Story.find(filter)
        .populate('category')
        .sort(sort)
        .skip(skip)
        .limit(limit),

      Story.countDocuments(filter),
    ]);

    res.status(200).json({
      data: stories,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages: Math.ceil(totalItems / Number(perPage)),
    });
  } catch (error) {
    next(error);
  }
};
