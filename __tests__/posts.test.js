import mongoose from 'mongoose';
import { describe, expect, test } from '@jest/globals';

import { createPost } from '../src/services/posts';
import { Post } from '../src/models/post';

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = {
      title: 'Jest Test',
      author: 'Jest',
      contents: 'This post is stored in a MongoDB database using mongoose.',
      tags: ['jest', 'mongodb', 'mongoose']
    };
    const createdPost = await createPost(post);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
    const foundPost = await Post.findById(createdPost._id);
    expect(foundPost).toEqual(expect.objectContaining(post));
    expect(foundPost.createdAt).toBeInstanceOf(Date);
    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test('without title should fail', async () => {
    const post = {
      author: 'Jest',
      contents: 'This post is stored in a MongoDB database using mongoose.',
      tags: ['jest', 'mongodb', 'mongoose']
    };
    try {
      await createPost(post);
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.message).toContain('`title` is required');
    }
  });

  test('with minimal parameters should succeed', async () => {
    const post = {
      title: 'Jest Test',
    };
    const createdPost = await createPost(post);
    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});
