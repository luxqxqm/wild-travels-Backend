import createHttpError from "http-errors";
import { Category } from "../models/category.js";
import { Story } from "../models/story.js";
import { saveFileToCloudinary} from '../utils/saveFileToCloudinary.js';

export const createStory = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "Image is required");
  }

  const result = await saveFileToCloudinary(req.file.buffer);
    req.body.img = result.secure_url;

  const categoryDoc = await Category.findOne({ category: req.body.category });
  if (!categoryDoc) {
    throw createHttpError(404, 'Category not found');
  }

const story = await (await Story.create({ ...req.body, ownerId: req.user._id,  category: categoryDoc._id })).populate('category');

  res.status(201).json(story);
};





