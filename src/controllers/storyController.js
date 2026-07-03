import { Story } from '../models/story.js';
import mongoose from 'mongoose';

export const getRecommendedStoriesController = async (req, res, next) => {
  try {
    const { category, page = 1, perPage = 10 } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ message: 'Category query parameter is required' });
    }

    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    const categoryObjectId = new mongoose.Types.ObjectId(category);

    const stories = await Story.aggregate([
      { $match: { category: categoryObjectId } },

      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'savedArticles',
          as: 'savedByUsers',
        },
      },

      {
        $addFields: {
          countSaves: { $size: '$savedByUsers' },
        },
      },

      { $sort: { countSaves: -1, createdAt: -1 } },

      { $skip: skip },
      { $limit: limit },

      { $project: { savedByUsers: 0 } },
    ]);

    const totalItems = await Story.countDocuments({
      category: categoryObjectId,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found recommended stories!',
      data: {
        stories,
        page: parseInt(page),
        perPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
