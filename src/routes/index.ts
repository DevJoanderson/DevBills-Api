import type { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance): Promise<void> {
  fastify.get("/health", async () => {
    return {
      status: "OK",
      message: "Devbills API rodando normalmente",
    };
  });
}

export default routes;
