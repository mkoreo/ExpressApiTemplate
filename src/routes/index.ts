import express from 'express';
import { v1Add } from './addApi';

// Create API router and all API versions
export const apiVersionRouter = express.Router();

// V1 API
export const v1 = express.Router();
v1.use('/add', v1Add);

// Add all versions of the API.
apiVersionRouter.use('/v1', v1);

// We'll also provide a non-versioned API, which just executes the latest version.
apiVersionRouter.use('/', v1);
