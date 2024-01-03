import mongoose, { ConnectOptions } from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/social_media_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    } as ConnectOptions);
    // mongoose.set('useNewUrlParser', true)
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};
