import { Request, Response } from 'express';
import { Post } from '../models/Post';
import redisClient  from '../config/redis';

const posts: Post[] = [];

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { id, content }: { id: string; content: string } = req.body;
  const newPost: Post = { id, content };
  posts.push(newPost);

  try {
    await redisClient.del(`/api/v1/posts/${id}/analysis`);
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

export const getAnalysis = async (req: Request, res: Response): Promise<void> => {
  const postId: string = req.params.id;

  try {
    const cachedAnalysis = await redisClient.get(`/api/v1/posts/${postId}/analysis`);
    if (cachedAnalysis) {
      res.status(200).json(JSON.parse(cachedAnalysis));
      return;
    }

    const post: Post | undefined = posts.find((p) => p.id === postId);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      const words: string[] = post.content.split(/\s+/);
      const wordCount: number = words.length;
      const totalCharacters: number = words.join('').length;
      const averageWordLength: number = totalCharacters / wordCount || 0;

      const analysis = {
        wordCount,
        averageWordLength,
      };

      await redisClient.set(`/api/v1/posts/${postId}/analysis`, JSON.stringify(analysis));
      res.status(200).json(analysis);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to get analysis', error });
  }
};
