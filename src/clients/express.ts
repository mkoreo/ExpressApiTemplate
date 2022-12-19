// Web Application framework
import express, { Express } from 'express';

// Enable use of environment variables
import * as dotenv from 'dotenv-defaults';

// Enable .env variables, must be called ASAP.
dotenv.config();

// Start Express & export instance
export const app : Express = express();
