import { HttpError } from 'http-errors';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
/* eslint-disable no-console */

// Do not remove the next parameter, otherwise express does not identify this as an error handler.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const httpErrorHandler : ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof HttpError && err?.expose) {
        // Send Http error to client if statuscode < 500
        res
            .status(err.status)
            .send(err.message);
        return;
    }

    if (err instanceof ZodError) {
        const { fieldErrors } = err.flatten();

        // Bad request - https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md
        res
            .status(400)
            .json(fieldErrors);
        return;
    }

    if ((err?.status || err?.statuscode) && err?.expose) {
        // Express middleware error
        res
            .status(err?.status || err?.statuscode)
            .send('Malformed request');
        return;
    }

    // Not an HTTP erorr but actual node JS error.
    // Need to learn if this is safe to do, does this introduce a high load for the server when occuring a lot?
    console.log(err);

    res
        .status(500)
        .send('Internal server error.');
};
