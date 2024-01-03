import express from 'express';
import { connectDB } from './config/db';
import postRoutes from './routes/postRoutes';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import  redisClient  from './config/redis';

const app = express();

app.use(express.json());

// Database connection
connectDB();

// Rate limiting middleware
const rateLimiterMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 100,
    duration: 60, // seconds
    blockDuration: 60, // block for 1 minute if exceeded
  });

  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';

  try {
    await rateLimiter.consume(clientIp.toString());
    next();
  } catch (error) {
    res.status(429).send('Too Many Requests');
  }
};

app.use(rateLimiterMiddleware);
app.use(postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
