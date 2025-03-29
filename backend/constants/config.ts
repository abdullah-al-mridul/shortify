// interfaces for types
interface Config {
  PORT: number;
  API_ENDPOINT: string;
}

//config constants for this server
export const Config: Config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  API_ENDPOINT: process.env.API_ENDPOINT ? process.env.API_ENDPOINT : "/api",
};
