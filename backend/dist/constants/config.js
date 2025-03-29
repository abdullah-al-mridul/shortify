"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
//config constants for this server
exports.Config = {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    API_ENDPOINT: process.env.API_ENDPOINT ? process.env.API_ENDPOINT : "/api",
};
