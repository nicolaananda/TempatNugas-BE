import dotenv from 'dotenv';

dotenv.config();

export const MONGO_DB_URL = process.env.MONGODB_URL || '';
