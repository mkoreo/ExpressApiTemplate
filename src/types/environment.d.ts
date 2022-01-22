declare global {
    namespace NodeJS {
        // Make .env variables typed
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            SERVER_VERSION: string;
            SERVER_NAME: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
