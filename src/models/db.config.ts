/*import { DataSource } from 'typeorm';
import { IfaUser } from './entities/Ifauser.entity';
import { IfaApiIntegration } from './entities/ifaApiIntegration.entity';
import { InvInvestorUser } from './entities/InvInvestorUser.entity';
import { InvTransactionRequest } from './entities/InvTransactionRequest.entity';
import { InvEventTransaction } from './entities/InvEventTransaction.entity';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { ApiAclList } from './entities/api_acl_list.entity';
import { LosApplication } from './entities/los_application.entity';
import { LosDealer } from './entities/los_dealer.entity';
import { LosDealerStore } from './entities/los_dealer_store.entity';
import { LosLoanEmiRepaymentSchedule } from './entities/los_loan_emi_repayment_schedule.entity';
import { MifosLosLoanEmiRepaymentSchedule } from './entities/mifos_los_loan_emi_repayment_schedule.entity';
import { SysAclUser } from './entities/sys_acl_user.entity';
import { SysAclUserRoleMapping } from './entities/sys_acl_user_role_mapping';

export default fp(async (fastify, opts) => {
  const AppDataSource = new DataSource({
    type: 'mysql',                // Change based on the DB you use
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3000"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [IfaUser, IfaApiIntegration, InvInvestorUser, InvTransactionRequest, InvEventTransaction,ApiAclList,LosApplication,LosDealer,LosDealerStore,LosLoanEmiRepaymentSchedule,MifosLosLoanEmiRepaymentSchedule,SysAclUser,SysAclUserRoleMapping],
    synchronize: false,            // Use false in production
    logging: true,
    migrations: [],
    subscribers: [],
    cache: true,
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

*/

import { DataSource } from 'typeorm';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { IfaUser } from './entities/Ifauser.entity';
import { IfaApiIntegration } from './entities/ifaApiIntegration.entity';
import { InvInvestorUser } from './entities/InvInvestorUser.entity';
import { InvTransactionRequest } from './entities/InvTransactionRequest.entity';
import { InvEventTransaction } from './entities/InvEventTransaction.entity';
import { ApiAclList } from './entities/api_acl_list.entity';
import { LosApplication } from './entities/los_application.entity';
import { LosDealer } from './entities/los_dealer.entity';
import { LosDealerStore } from './entities/los_dealer_store.entity';
import { LosLoanEmiRepaymentSchedule } from './entities/los_loan_emi_repayment_schedule.entity';
import { MifosLosLoanEmiRepaymentSchedule } from './entities/mifos_los_loan_emi_repayment_schedule.entity';
import { SysAclUser } from './entities/sys_acl_user.entity';
import { SysAclUserRoleMapping } from './entities/sys_acl_user_role_mapping';

export default fp(async (fastify: FastifyInstance, opts: any) => {
  // Initialize DataSource with safe parsing of environment variables
  const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),  // Default MySQL port is 3306
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'default_db',
    entities: [
      IfaUser,
      IfaApiIntegration,
      InvInvestorUser,
      InvTransactionRequest,
      InvEventTransaction,
      ApiAclList,
      LosApplication,
      LosDealer,
      LosDealerStore,
      LosLoanEmiRepaymentSchedule,
      MifosLosLoanEmiRepaymentSchedule,
      SysAclUser,
      SysAclUserRoleMapping
    ],
    synchronize: false, // Set to 'false' in production to avoid syncing schemas automatically
    logging: process.env.DB_LOGGING === 'true', // Toggle logging based on environment variable
    cache: true, // Enable caching for performance
  });

  try {
    console.log(AppDataSource);
    // Initialize the DataSource and connect to the database
    await AppDataSource.initialize();
    fastify.decorate('db', AppDataSource); // Decorate Fastify instance with the db connection
    fastify.log.info('Database connected successfully');
  } catch (err) {
    fastify.log.error('Database connection failed:', err);
    throw new Error('Database initialization failed');
  }

  // Gracefully close the database connection when Fastify shuts down
  fastify.addHook('onClose', async (instance: FastifyInstance) => {
    try {
      await AppDataSource.destroy();
      fastify.log.info('Database connection closed');
    } catch (err) {
      fastify.log.error('Error closing database connection:', err);
    }
  });
});

// Extend Fastify instance to include the db property for TypeScript type safety
declare module 'fastify' {
  interface FastifyInstance {
    db: DataSource;
  }
}
