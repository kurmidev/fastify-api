/*import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BadRequestException } from "./../../utils/helper"
import ConfigService from "../../utils/config"
import { LosApplication } from "../../models/entities/los_application.entity";

export function RepaymentRoutes(server: FastifyInstance, options: any, done: any) {
    
    const getRepayments = async (request: FastifyRequest, reply: FastifyReply) => {
        
        const query = request.query
        const SID = query.sid || query.SID
        const {loan_id,authData} = query
        
        console.log("query:===>",SID,loan_id,authData);
        const dealer_id = authData.dealerId;

        // Get loan details
        const applicationData = await server.db.getRepository(LosApplication).findOneBy({ id: loan_id, status: 'Active', isDeleted: 'False' });
        if (applicationData === null) {
            return BadRequestException("Invalid application id", reply);
        }

        // Check if Loan belongs to this dealer or not
        if (dealer_id !== applicationData.dealerId) {
            return BadRequestException("Invalid application id", reply);
        }

        const config = ConfigService();
        const configStatus = config.APPLICATION_STATUS
        const allowedStatus = [configStatus.Disbursed, configStatus.Closed, configStatus.Ops_TBD, configStatus.Ops_Pending, configStatus.Ops_Failed_To_Push];

        // Check whether loan status is Disbursed or not
        if (!allowedStatus.includes(applicationData.applicationStatusId)) {
            return BadRequestException("Cannot get repayment schedule for a loan that hasn't been disbursed", reply);
        }

        const specificDate = new Date('2023-03-01');
        const disbursement_date = new Date(applicationData.disbursementDate as string);

        const sync_los_rs_dealer_ids = config.NonLmsDealers;
        const credFlag = (config.DealerListToGetRPS.includes(dealer_id) && disbursement_date < specificDate) ? false : true;

        let checkRepayments;
        if ((disbursement_date >= specificDate || sync_los_rs_dealer_ids) && credFlag) {
            checkRepayments = await server.MifosLosLoanEmiRepaymentScheduleRepo.storeData(loan_id);
        } else {
            checkRepayments = await server.LosLoanEmiRepaymentScheduleRepo.storeData(loan_id);
        }

        if (checkRepayments && checkRepayments.length > 0) {
            const resultArr = checkRepayments.map(val => ({
                application_id: val.applicationId,
                installment_number: val.installmentNumber,
                due_date: val.dueDate ? new Date(val.dueDate).toISOString().split('T')[0] : null,
                due_amount: val.dueAmount ? parseFloat(val.dueAmount.toFixed(2)) : null,
                principal_amount: val.principalAmount ? parseFloat(val.principalAmount.toFixed(2)) : null,
                interest_amount: val.interestAmount ? parseFloat(val.interestAmount.toFixed(2)) : null,
                payment_status: val.bPaymentStatus || "Unpaid",
                received_date: val.bReceivedDate ? new Date(val.bReceivedDate).toISOString().split('T')[0] : null,
                received_amount: val.bReceivedAmount ? parseFloat(val.bReceivedAmount.toFixed(2)) : 0,
                paid_principal_amount: val.bPaidEmiPrincipal ? parseFloat(val.bPaidEmiPrincipal.toFixed(2)) : 0,
                paid_interest_amount: val.bPaidEmiInterest ? parseFloat(val.bPaidEmiInterest.toFixed(2)) : 0,
                lpi: val.bPaidLpi ? parseFloat(val.bPaidLpi.toFixed(2)) : 0,
                other_charges: val.bPaidOtherCharges ? parseFloat(val.bPaidOtherCharges.toFixed(2)) : 0,
                bounce_charges: val.bPaidBounceCharges ? parseFloat(val.bPaidBounceCharges.toFixed(2)) : 0,
                post_payment_principal_outstanding: val.bPostPaymentPrincipalOutstanding ? parseFloat(val.bPostPaymentPrincipalOutstanding.toFixed(2)) : 0,
                post_payment_interest_outstanding: val.bPostPaymentInterestOutstanding ? parseFloat(val.bPostPaymentInterestOutstanding.toFixed(2)) : 0
            }));

            if (resultArr.length > 0) {
                return {
                    status: true,
                    message: "Repayment schedule fetched successfully.",
                    data: { schedule: resultArr }
                };
            } else {
                return BadRequestException("This loan id doesn't have a repayment schedule yet.", reply);
            }
        } else {
            return BadRequestException("This loan id doesn't have a repayment schedule yet.", reply);
        }
    }

    server.route({
        method: "GET",
        url: "/GetRepaymentDetails",
        //schema: schema,
        handler: getRepayments,
    });

    done()

}*/

import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { BadRequestException } from "../../utils/helper";
import ConfigService from "../../utils/config";
import { LosApplication } from "../../models/entities/los_application.entity";
import { LosLoanEmiRepaymentSchedule } from "../../models/entities/los_loan_emi_repayment_schedule.entity";
import { MifosLosLoanEmiRepaymentSchedule } from "../../models/entities/mifos_los_loan_emi_repayment_schedule.entity";

// Define a TypeScript interface for query parameters
interface GetRepaymentQuery {
  sid?: string;
  SID?: string;
  loan_id: string;
  authData: {
    dealerId: string;
  };
}

// Define a route for repayment details
export function RepaymentRoutes(server: FastifyInstance, options: any, done: () => void) {
    
    // Handler for getting repayment details
    const getRepayments = async (request: FastifyRequest<{ Querystring: GetRepaymentQuery }>, reply: FastifyReply) => {
        const query = request.query;
        const SID = query.sid || query.SID;
        const { loan_id, authData } = query;
        
        console.log("query:===>", SID, loan_id, authData);
        const dealer_id = authData.dealerId;

        // Get loan details from the database
        const applicationData = await server.db.getRepository(LosApplication).findOne({
            where: { id: parseInt( loan_id), status: 'Active', isDeleted: 'False' }
        });

        // If loan is not found, return a bad request error
        if (!applicationData) {
            return BadRequestException("Invalid application id", reply);
        }

        // Check if the loan belongs to the dealer
        if (parseInt(dealer_id) !==applicationData.dealerId) {
            return BadRequestException("Invalid application id", reply);
        }

        const config = ConfigService();
        const configStatus = config.APPLICATION_STATUS;
        const allowedStatus = [
            configStatus.Disbursed,
            configStatus.Closed,
            configStatus.Ops_TBD,
            configStatus.Ops_Pending,
            configStatus.Ops_Failed_To_Push
        ];

        // Check whether the loan status is one of the allowed statuses
        if (!allowedStatus.includes(applicationData.applicationStatusId)) {
            return BadRequestException("Cannot get repayment schedule for a loan that hasn't been disbursed", reply);
        }

        // Set up specific date comparison
        const specificDate = new Date('2023-03-01');
        const disbursement_date = new Date(applicationData.disbursementDate as string);

        // Check if the dealer is in the configured list
        const sync_los_rs_dealer_ids = config.NonLmsDealers;
        const credFlag = (config.DealerListToGetRPS.includes(parseInt(dealer_id)) && disbursement_date < specificDate) ? false : true;

        let checkRepayments;

        // Fetch repayment details based on the loan and dealer configuration
        if ((disbursement_date >= specificDate || sync_los_rs_dealer_ids) && credFlag) {
            //checkRepayments = await server.MifosLosLoanEmiRepaymentScheduleRepo.storeData(loan_id);
            checkRepayments = await server.db.getRepository(MifosLosLoanEmiRepaymentSchedule).find({where:{applicationId: parseInt(loan_id), status: 'Active', isDeleted: 'False'} })
        } else {
            //checkRepayments = await server.LosLoanEmiRepaymentScheduleRepo.storeData(loan_id);
            checkRepayments = await server.db.getRepository(LosLoanEmiRepaymentSchedule).find({where:{applicationId: parseInt(loan_id), status: 'Active', isDeleted: 'False'} })
        }

        // If repayment data is found, return it; otherwise, return an error
        if (checkRepayments && checkRepayments.length > 0) {
            const resultArr = checkRepayments.map(val => ({
                application_id: val.applicationId,
                installment_number: val.installmentNumber,
                due_date: val.dueDate ? new Date(val.dueDate).toISOString().split('T')[0] : null,
                due_amount: val.dueAmount ? parseFloat(val.dueAmount.toFixed(2)) : null,
                principal_amount: val.principalAmount ? parseFloat(val.principalAmount.toFixed(2)) : null,
                interest_amount: val.interestAmount ? parseFloat(val.interestAmount.toFixed(2)) : null,
                payment_status: val.bPaymentStatus || "Unpaid",
                received_date: val.bReceivedDate ? new Date(val.bReceivedDate).toISOString().split('T')[0] : null,
                received_amount: val.bReceivedAmount ? parseFloat(val.bReceivedAmount.toFixed(2)) : 0,
                paid_principal_amount: val.bPaidEmiPrincipal ? parseFloat(val.bPaidEmiPrincipal.toFixed(2)) : 0,
                paid_interest_amount: val.bPaidEmiInterest ? parseFloat(val.bPaidEmiInterest.toFixed(2)) : 0,
                lpi: val.bPaidLpi ? parseFloat(val.bPaidLpi.toFixed(2)) : 0,
                other_charges: val.bPaidOtherCharges ? parseFloat(val.bPaidOtherCharges.toFixed(2)) : 0,
                bounce_charges: val.bPaidBounceCharges ? parseFloat(val.bPaidBounceCharges.toFixed(2)) : 0,
                post_payment_principal_outstanding: val.bPostPaymentPrincipalOutstanding ? parseFloat(val.bPostPaymentPrincipalOutstanding.toFixed(2)) : 0,
                post_payment_interest_outstanding: val.bPostPaymentInterestOutstanding ? parseFloat(val.bPostPaymentInterestOutstanding.toFixed(2)) : 0
            }));

            return {
                status: true,
                message: "Repayment schedule fetched successfully.",
                data: { schedule: resultArr }
            };
        } else {
            return BadRequestException("This loan id doesn't have a repayment schedule yet.", reply);
        }
    };

    // Register the route to handle GET requests
    server.route({
        method: "GET",
        url: "/GetRepaymentDetails",
        handler: getRepayments,
    });

    done();
}
