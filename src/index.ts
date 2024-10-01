import * as dotenv from "dotenv";
import Fastify, { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { configureRoutes } from "./modules/transaction/routes";
import AppDataSource from "./models/db.config";
import IfaApiIntegrationRepo from "./models/repository/ifaApiIntegration.repo";
import  InvTransactionRequestRepo  from "./models/repository/invTransactionRequest.repo";
import { RepaymentRoutes } from "./modules/repayment/routes";
import requestLoggerPlugin from "./middleware/apiAuth.middleware";
import ApiAclListRepo from "./models/repository/apiAclListRepo";
import DealerStoreRepo from "./models/repository/dealerStore.repo";
import LosLoanEmiRepaymentScheduleRepo from "./models/repository/losLoanEmiRepaymentSchedule.repo";
import MifosLosLoanEmiRepaymentScheduleRepo from "./models/repository/mifosLosLoanEmiRepaymentSchedule.repo";
import repositories from './plugins/repositories';

dotenv.config();


function init(){
  const server = Fastify({ logger: true });  
  server.register(AppDataSource);
  server.register(repositories)
  server.register(requestLoggerPlugin);
  //server.register(IfaApiIntegrationRepo);
  //server.register(InvTransactionRequestRepo);
  server.register(ApiAclListRepo);
  // server.register(DealerStoreRepo);
  //server.register(MifosLosLoanEmiRepaymentScheduleRepo);
  
  //server.register(losLoanEmiRepaymentScheduleRepo);

  server.register(configureRoutes,{prefix:"/api/v1"})
  server.register(RepaymentRoutes,{prefix:"/api/apiintegration/v2"})

  return server; 
}

if (require.main === module) {
  // called directly i.e. "node app"
  const PORT = process.env.PORT || "3000";
  init().listen({ port: parseInt(PORT) }, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
} else {
  // required as a module => executed on aws lambda
  module.exports = init;
}


// async function startServer() {

//   const PORT = process.env.PORT || "3000";
//   await init().listen({ port: parseInt(PORT) });
// }
// startServer()
//   .then(() => {
//     console.log(`Server started successfully at ${process.env.PORT}`);
//   })
//   .catch((err) => {
//     console.error("Error starting server:", err);
//     process.exit(1);
//   });
