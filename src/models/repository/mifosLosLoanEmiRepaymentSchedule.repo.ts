import { FastifyInstance } from "fastify";
import fp from "fastify-plugin"
import { MifosLosLoanEmiRepaymentSchedule } from "../entities/mifos_los_loan_emi_repayment_schedule.entity";
import { DataSource, Repository } from "typeorm";



export default fp(async (server: FastifyInstance, opts: any) => {
    try {
        const repo = await server.db.getRepository(MifosLosLoanEmiRepaymentSchedule).extend({
         async storeData(applicationId: number) {
                return this.createQueryBuilder("mifos_los_loan_emi_repayment_schedule")
                    .andWhere({ applicationId: applicationId, status: 'Active', isDeleted: 'False' })
                    .orderBy('installment_number', 'ASC').getMany();
            }
        })
        server.decorate('MifosLosLoanEmiRepaymentScheduleRepo', repo);
    } catch (ex) {
        server.log.error('Database connection failed MifosLosLoanEmiRepaymentScheduleRepo', ex);
        throw ex;
    }
});