import { FastifyInstance } from "fastify";
import fp from "fastify-plugin"
import { LosLoanEmiRepaymentSchedule } from "../entities/los_loan_emi_repayment_schedule.entity";
import { Repository, TreeRepository } from "typeorm";




export default fp(async (server: FastifyInstance, opts: any) => {
    try {
        const repo = await server.db.getRepository(LosLoanEmiRepaymentSchedule).extend({
            storeData(applicationId: number) {
                return  this.createQueryBuilder("los_loan_emi_repayment_schedule")
                    .andWhere({ applicationId: applicationId, status: 'Active', isDeleted: 'False' })
                    .orderBy('installment_number', 'ASC').getMany();
            }
        })
        server.decorate('LosLoanEmiRepaymentScheduleRepo', repo);
    } catch (ex) {
        server.log.error('Database connection failed LosLoanEmiRepaymentScheduleRepo', ex);
        throw ex;
    }
});