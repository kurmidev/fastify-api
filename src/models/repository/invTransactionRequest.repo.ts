import { FastifyInstance } from "fastify";
import { InvTransactionRequest } from "../entities/InvTransactionRequest.entity";
import fp from "fastify-plugin"


export default fp(async (server: FastifyInstance, opts: any) => {
    try {
        const repo = await server.db.getRepository(InvTransactionRequest).extend({
            checkTransactionExits(RequestId:number) {
                var status: string = "Active"
                var is_deleted: string = "False"
                return this.createQueryBuilder("inv_transaction_request")
                    .leftJoinAndSelect("inv_transaction_request.event", "event")
                    .leftJoinAndSelect("inv_transaction_request.investor", "investor")
                    .where("inv_transaction_request.id = :RequestId", { RequestId })
                    .andWhere("inv_transaction_request.status = :status", { status })
                    .andWhere("inv_transaction_request.is_deleted = :is_deleted", { is_deleted })
                    .getOne()
            }
        })
        server.decorate('InvTransactionRequestRepo', repo);
    } catch (ex) {
        server.log.error('Database connection failed InvTransactionRequestRepo', ex);
        throw ex;
    }
});