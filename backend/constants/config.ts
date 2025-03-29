interface Config {
  PORT: number;
}

//config constants for this server
export const Config: Config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
};
