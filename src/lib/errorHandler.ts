import createError from 'http-errors';
import { ErrorRequestHandler } from 'express';
/* eslint-disable no-console */

export const httpErrorHandler : ErrorRequestHandler = (err, req, res) => {
    // Send HTTP error to client if error is http error.
    // Don't send if error status is higher than 500.
    if (createError.isHttpError(err) && err.expose) {
        if (!err.expose) {
            res
                .status(500)
                .send('Internal server error.');
        }

        // Send Http error to client.
        res
            .status(err.status)
            .send(err.message);
        return;
    }
    // Not an HTTP erorr but actual node JS error.
    // Need to learn if this is safe to do, does this introduce a high load for the server when occuring a lot?
    console.log(err?.stack);

    res
        .status(500)
        .send('Internal server error.');
};
