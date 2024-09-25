import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { IfaApiIntegration } from "../../models/entities/ifaApiIntegration.entity";
import { InvTransactionRequest } from "../../models/entities/InvTransactionRequest.entity";
import { Investorconfig, getTxnStatus, validateChecksum } from "../../utils/helper";

export function configureRoutes(server: FastifyInstance, options: any, done: any): void {
    const schema = {
        body: {
            type: 'object',
            required: ['Checksum', 'MID', 'Timestamp', 'InvestorId', 'RequestId'],
            properties: {
                Checksum: { type: 'string' },
                MID: { type: 'string' },
                Timestamp: { type: 'string' },
                InvestorId: { type: 'string' },
                RequestId: { type: 'string' },
            },
        },
    }

    const getTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
        const { Checksum, MID, Timestamp, InvestorId, RequestId } = request.body
        const checkMid = await server.IfaApiIntegrationRepo.checkMidExists(MID)
        
        if (checkMid === null) {
            reply.code(400).send({
                "status": false,
                "message": "IFA data not present",
                data: {},
                code: 400,
                checksum: null
            });
            return;
        }

        const checksumString = `${RequestId}||${InvestorId}||${Timestamp.trim()}`;
        const isChecksumValid = validateChecksum(checksumString.trim(), Checksum, checkMid.key);
        if (!isChecksumValid) {
            reply.code(400).send({
                "status": false,
                "message": "Checksum doesnt match",
                data: {},
                code: 400,
                checksum: null
            });
            return;
        }

        const transactionDetails = await server.InvTransactionRequestRepo.checkTransactionExits(parseInt(RequestId));
        if (transactionDetails === null) {
            reply.code(400).send({
                "status": false,
                "message": "There arn't any requests for requested crieteria",
                data: {},
                code: 400,
                checksum: null
            });
            return;
        }

        if (parseInt(transactionDetails.investor.id) !== parseInt(InvestorId) || parseInt(transactionDetails.investor.ifa_id) !== parseInt(checkMid.ifa_id)) {
            reply.code(400).send({
                "status": false,
                "message": "Investor not found/Investor not mapped to the ifa",
                data: {},
                code: 400,
                checksum: null
            });
            return;
        }

        const { approval_status, settlement_utr, banking_date, authenticated_at } = transactionDetails;
        const { event_processed_at } = transactionDetails.event;
        let transactionStatus: string = getTxnStatus(approval_status, settlement_utr, banking_date, event_processed_at, authenticated_at);
        reply.code(200).send({
            "status": true,
            "message": "Transaction details fetched successfully",
            data: {
                "id": transactionDetails.id,
                "investor_id": transactionDetails.investor_id,
                "amount": transactionDetails.amount,
                "transaction_type": transactionDetails.transaction_type,
                "transaction_sub_type": transactionDetails.transaction_sub_type,
                "withdrawal_method": transactionDetails.withdrawal_method,
                "manual_parameters": transactionDetails.manual_parameters,
                "old_investment_id": transactionDetails.old_investment_id,
                "scheme_id": transactionDetails.scheme_id,
                "mode": transactionDetails.mode,
                "transaction_id": transactionDetails.transaction_id,
                "order_id": transactionDetails.order_id,
                "settlement_utr": transactionDetails.settlement_utr,
                "transaction_source": transactionDetails.transaction_source,
                "approval_status": transactionDetails.approval_status,
                "transaction_status": transactionStatus,
                "created_at": transactionDetails.created_at,
                "authenticated_at": transactionDetails.authenticated_at,
                "banking_date": transactionDetails.banking_date,
                "execution_date": event_processed_at,
                "transaction_date": transactionDetails.transaction_date,
                "ext_transaction_date": transactionDetails.ext_transaction_date,
                "source_payment": transactionDetails.source_payment,
            },
            code: 200,
            checksum: null
        });
    }
    //server.post('/GetTransactionById', { schema }, getTransaction);
    server.route({
        method: "POST",
        url: "/GetTransactionById",
        schema: schema,
        handler: getTransaction,
    });

    done()
}

