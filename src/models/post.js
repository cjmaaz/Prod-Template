import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  contents: String,
  tags: [String],
}, {
  timestamps: true
});

export const Post = model('post', postSchema);
