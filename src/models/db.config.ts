import { DataSource } from 'typeorm';
import { IfaUser } from './entities/Ifauser.entity';
import { IfaApiIntegration } from './entities/ifaApiIntegration.entity';
import { InvInvestorUser } from './entities/InvInvestorUser.entity';
import { InvTransactionRequest } from './entities/InvTransactionRequest.entity';
import { InvEventTransaction } from './entities/InvEventTransaction.entity';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
  const AppDataSource = new DataSource({
    type: 'mysql',                // Change based on the DB you use
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3000"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [IfaUser, IfaApiIntegration, InvInvestorUser, InvTransactionRequest, InvEventTransaction],
    synchronize: false,            // Use false in production
    logging: true,
    migrations: [],
    subscribers: [],
  });
  try {
    await AppDataSource.initialize();
    fastify.decorate('db', AppDataSource);
    fastify.log.info('Database connected successfully');
  } catch (err) {
    fastify.log.error('Database connection failed', err);
    throw err;
  }
  fastify.addHook('onClose', async (instance) => {
    await AppDataSource.destroy();  // Gracefully close the connection when the server stops
  });
});


/*
  async (server:FastifyInstance) => {
  const AppDataSource = new DataSource({
    type: 'mysql',                // Change based on the DB you use
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3000"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [IfaUser, IfaApiIntegration, InvInvestorUser, InvTransactionRequest, InvEventTransaction],
    synchronize: false,            // Use false in production
    logging: true,
    migrations: [],
    subscribers: [],
  });

  try {
    // Initialize TypeORM DataSource
    AppDataSource.initialize()
    server.decorate('db', AppDataSource);
    server.log.info('TypeORM connection established');
  } catch (err) {
    server.log.error('Error connecting to the database:', err);
    throw err;
  }

  server.addHook('onClose', async (instance) => {
    await AppDataSource.destroy();  // Gracefully close the connection when the server stops
  });
}
*/