/* eslint-disable no-console */

// Express Packages
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

// 3rd Party
import helmet from 'helmet';
import morgan from 'morgan';

// Use express async errors if express < 5
// import 'express-async-errors';

// Handlers
import { httpErrorHandler } from './lib/errorHandler.js';

// Instances
import { app } from './clients/express.js';

// Extra
import { corsConfig } from './config/corsConfig.js';

// Routes
import { apiVersionRouter } from './routes';
import { printRoutes } from './lib/expressPrintRoutes.js';

// ------------------------------------ END OF IMPORTS ------------------------------------------
/// /////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------- MIDDLEWARE ---------------------------------------------
// Logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Helmets sets headers for extra security
app.use(helmet());
app.use(helmet.hidePoweredBy());

// Cors configured for access to API from browser
app.use(cors(corsConfig));

// Parse data from request and provide via certain keys.
// TODO: I suppose it would be more efficient to only do this when required...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use compression to make data smaller
app.use(compression());
// ----------------------------------- END OF MIDDLEWARE ----------------------------------------
/// /////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------- START ROUTES -------------------------------------------
app.use('/api', apiVersionRouter);
// ------------------------------------ END ROUTES ----------------------------------------------
/// /////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------- SERVER START -------------------------------------------
// Error handler (after all routes!)
app.use(httpErrorHandler);

app.listen(process.env?.SERVER_PORT, () => {
    console.log('-------------------------------------');
    console.log(process.env?.SERVER_NAME, ' - Version', process.env?.SERVER_VERSION);
    console.log('-------------------------------------\n');
    printRoutes(app);
    console.log('\n------------- READY ! ---------------');
});
// ------------------------------------- SERVER END -------------------------------------------
