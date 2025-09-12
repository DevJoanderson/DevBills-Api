import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PrismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅DB conectado com sucesso!");
  } catch (err) {
    console.error("🚨Falha ao conectar ao DB", err);
  }
};

export default prisma;
