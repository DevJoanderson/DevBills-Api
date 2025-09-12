import { PrismaConnect } from './config/prisma';
import dotenv from "dotenv";
import app from "./app.ts";
import { initializeGlobalCategories } from './services/globalCategories.service.ts';

dotenv.config();



const PORT = Number(process.env.PORT);

const startServer = async () => {

  try {

    await PrismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port: Number(PORT) }).then(() => {
      console.log(`Servidor rodando na porta ${PORT}`);
  });
  } catch (err) {
    console.error(err);
  }
};

startServer();

