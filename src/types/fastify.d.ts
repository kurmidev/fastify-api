// src/types/fastify.d.ts
import  LosLoanEmiRepaymentScheduleRepo  from '../models/repository/losLoanEmiRepaymentSchedule.repo';
import  MifosLosLoanEmiRepaymentScheduleRepo  from './../models/repository/MifosLosLoanEmiRepaymentScheduleRepo';

// Extend the FastifyInstance interface
declare module 'fastify' {
  interface FastifyInstance {
    LosLoanEmiRepaymentScheduleRepo: LosLoanEmiRepaymentScheduleRepo;
    MifosLosLoanEmiRepaymentScheduleRepo: MifosLosLoanEmiRepaymentScheduleRepo;
  }
}
