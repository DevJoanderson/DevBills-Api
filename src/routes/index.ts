import type { FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";
import transactionRoutes from "./transaction.routes";

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/health", async () => {
    return {
      status: "OK",
      message: "Devbills API rodando normalmente",
    };
  });

  fastify.register(categoryRoutes, { prefix: "/categories" });
  fastify.register(transactionRoutes, { prefix: "/transaction" });
}

export default routes;
