// Example: src/plugins/repositories.ts
import { FastifyPluginAsync } from 'fastify';
import  LosLoanEmiRepaymentScheduleRepo  from './../models/repository/losLoanEmiRepaymentSchedule.repo';
import  MifosLosLoanEmiRepaymentScheduleRepo from './../models/repository/mifosLosLoanEmiRepaymentSchedule.repo';
import  IfaApiIntegrationRepo from './../models/repository/ifaApiIntegration.repo'
import apiAclListRepo from '../models/repository/apiAclListRepo';

const repositories: FastifyPluginAsync = async (server) => {
  
  // Use decorate to add custom properties to Fastify instance
  server.decorate('LosLoanEmiRepaymentScheduleRepo', LosLoanEmiRepaymentScheduleRepo);
  server.decorate('MifosLosLoanEmiRepaymentScheduleRepo', MifosLosLoanEmiRepaymentScheduleRepo);
  server.decorate('IfaApiIntegrationRepo', IfaApiIntegrationRepo);

};

export default repositories;
