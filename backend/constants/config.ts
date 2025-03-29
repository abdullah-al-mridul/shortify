// interfaces for types
interface Config {
  PORT: number;
  API_ENDPOINT: string;
  MONGOOSE_URI: string;
  JWT_SECRET: string;
}

//config constants for this server
export const Config: Config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  API_ENDPOINT: process.env.API_ENDPOINT ? process.env.API_ENDPOINT : "/api",
  MONGOOSE_URI: process.env.MONGOOSE_URI ? process.env.MONGOOSE_URI : "",
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
};
