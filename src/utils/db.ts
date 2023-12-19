import mongoose from 'mongoose';
import { DB_URI } from '../config';
import logger from './logger';

/**
 * Connect to mongodb
 */
async function connectToDb() {
  try {
    await mongoose.connect(DB_URI);
    logger.info('Connected to DB');
  } catch (error) {
    logger.error('Failed to connect to DB');
    // exit with failure
    process.exit(1);
  }
}

export default connectToDb;
