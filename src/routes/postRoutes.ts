import { Router } from 'express';
import { createPost, getAnalysis } from '../controllers/postsController';

const router = Router();

router.post('/api/v1/posts', createPost);
router.get('/api/v1/posts/:id/analysis', getAnalysis);

export default router;
