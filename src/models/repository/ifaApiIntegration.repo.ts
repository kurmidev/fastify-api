import { FastifyInstance } from "fastify";
import { IfaApiIntegration } from "../entities/ifaApiIntegration.entity";
import fp from "fastify-plugin"


export default fp(async (server: FastifyInstance, opts: any)=> {
    try{
        const repo = await server.db.getRepository(IfaApiIntegration).extend({
            checkMidExists(mid: string) {
                var status: string = "Active"
                var is_deleted: string = "False"
                return this.createQueryBuilder("ifa_api_intergration")
                    .where("ifa_api_intergration.mid = :mid", { mid })
                    .andWhere("ifa_api_intergration.status = :status", { status })
                    .andWhere("ifa_api_intergration.is_deleted = :is_deleted", { is_deleted })
                    .getOne()
            }
        })
        server.decorate('IfaApiIntegrationRepo', repo);
    }catch(ex){
        server.log.error('Database connection failed', ex);
        throw ex;
    }
});