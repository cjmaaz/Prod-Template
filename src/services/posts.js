import { Post } from '../models/post.js';

export const createPost = function ({ title, author, contents, tags }) {
  const post = new Post({ title, author, contents, tags });
  return post.save();
};
