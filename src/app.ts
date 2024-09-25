import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { configureRoutes } from "./modules/transaction/routes";
import AppDataSource from "./models/db.config";
import IfaApiIntegrationRepo from "./models/repository/ifaApiIntegration.repo";
import  InvTransactionRequestRepo  from "./models/repository/invTransactionRequest.repo";

dotenv.config();


async function startServer() {
  const server = Fastify({ logger: true });
  server.register(AppDataSource);
  server.register(IfaApiIntegrationRepo);
  server.register(InvTransactionRequestRepo);

  server.register(configureRoutes,{prefix:"/api/v1"})
  
  const PORT = process.env.PORT || "3000";
  await server.listen({ port: parseInt(PORT) });
}
startServer()
  .then(() => {
    console.log(`Server started successfully at ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
