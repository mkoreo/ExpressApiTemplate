// Web Application framework
import express, { Application } from 'express';

// Enable use of environment variables
import dotenv from 'dotenv';

// Enable .env variables, must be called ASAP.
dotenv.config();

// Start Express & export instance
export const app : Application = express();
