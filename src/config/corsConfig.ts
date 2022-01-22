// List all DNS where API may be queried from.
const corsWhitelist = [
    'http://localhost:3000',
];

export const corsConfig = {
    origin: (origin: any, callback: any) => {
        // Allow requests with no origin
        if (!origin) return callback(null, true);

        // Allow requests with whitelisted origin
        if (corsWhitelist.indexOf(origin) === -1) {
            const message = 'The CORS policy for this origin does not allow access from the particular origin.';
            return callback(new Error(message), false);
        }
        return callback(null, true);
    },
    credentials: true, // Will add Access-Control-Allow-Credentials header
};
