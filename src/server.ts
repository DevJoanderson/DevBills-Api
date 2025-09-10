import dotenv from "dotenv";
dotenv.config();

import app from "./app.ts";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await app.listen({ port: Number(PORT) }).then(() =>
      console.log(`Servidor rodando na porta ${PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();

