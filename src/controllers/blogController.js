import logger from '../utils/logger.js';
import { createPost } from '../services/posts.js';


export const newPost = async function (req, res) {
  try {
    const data = await createPost(req.body);
    logger.info(data);
    res.status(201).send(data);
  } catch (error) {
    logger.error(error);
  }
};
