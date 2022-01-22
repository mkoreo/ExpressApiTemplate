/* eslint-disable no-console */

import { Application } from 'express';
import listEndpoints from 'express-list-endpoints';

interface endpoint {
    path: string,
    methods: Array<string>,
    middlewares: Array<string>,
}

type endpoints = Array<endpoint>;

const COLORS = {
    yellow: 33,
    green: 32,
    blue: 34,
    red: 31,
    grey: 90,
    magenta: 35,
    clear: 39,
};

const colorText = (color: number, text: string) => `\u001b[${color}m${text}\u001b[${COLORS.clear}m`;

function colorMethod(method: string) {
    switch (method) {
    case 'POST':
        return colorText(COLORS.yellow, method);
    case 'GET':
        return colorText(COLORS.green, method);
    case 'PUT':
        return colorText(COLORS.blue, method);
    case 'DELETE':
        return colorText(COLORS.red, method);
    case 'PATCH':
        return colorText(COLORS.grey, method);
    default:
        return method;
    }
}

export const printRoutes = (app: Application) => {
    const appEndpoints = listEndpoints(app.router) as endpoints;

    appEndpoints.forEach((appEndpoint) => {
        appEndpoint.methods.forEach((method) => {
            console.log(`${colorMethod(method)}\t${appEndpoint.path}`);
        });
    });
};
