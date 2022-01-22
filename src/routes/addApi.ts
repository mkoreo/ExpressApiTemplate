import express from 'express';
import { z } from 'zod';

// Create routes
export const v1Add = express.Router();

const pSchema = z.object({
    first: z.number(),
    second: z.number(),
});

v1Add.post('/', async (req, res) => {
    // Throw error if parameters don't match schema.
    const { first, second } = pSchema.parse(req?.body);

    const result = first + second;

    res
        .status(202)
        .json({ result })
        .send();
});
