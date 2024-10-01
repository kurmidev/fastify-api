import { FastifyInstance } from "fastify";
import fp from "fastify-plugin"
import { LosDealerStore } from "../entities/los_dealer_store.entity";
import ConfigService from "../../utils/config";


export default fp(async (server: FastifyInstance, opts: any) => {
    try {
        const repo = await server.db.getRepository(LosDealerStore).extend({
            // async storeData(sid: string) {
            //     const configService = ConfigService(); // Use getInstance() to ensure a single instance//+
            //     return this.createQueryBuilder("los_dealer_store")
            //     .select([
            //         'surm.id AS sysUserRoleMappingId',
            //         'surm.sys_user_id AS sysUserId',
            //         'los_dealer_store.id AS storeId',
            //         'los_dealer_store.dealer_id AS dealerId',
            //         'los_dealer_store.name AS name',
            //         'los_dealer_store.email AS email',
            //         'los_dealer_store.contact_number AS contactNumber',
            //         'los_dealer_store.mid AS mid',
            //         'los_dealer_store.secret AS secret',
            //         'los_dealer.captive_flag AS captiveFlag',
            //         'los_dealer.fldg_flag AS fldgFlag',
            //       ])
            //       .innerJoin('los_dealer', 'los_dealer', 'los_dealer.id = los_dealer_store.dealer_id')
            //       .leftJoinAndSelect('sys_acl_user_role_mapping', 'surm', 'surm.user_id = los_dealer_store.dealer_id')
            //       .where('los_dealer_store.mid = :sid', { sid })
            //       .andWhere('surm.status = :status', { status: 'Active' })
            //       .andWhere('surm.is_deleted = :isDeleted', { isDeleted: 'False' })
            //       .andWhere('surm.app_id IN (:...appIds)', { appIds: configService.DEALER_DASHBOARD_IDS })  // Configurable in environment
            //       .andWhere('surm.role_id IN (:...roleIds)', { roleIds: configService.DEALER_ROLE_IDS })
            //       .andWhere('los_dealer_store.status = :status', { status: 'Active' })
            //       .getRawOne();
            // }
        })
        server.decorate('storeDataRepo', repo);
    } catch (ex) {
        server.log.error('Database connection failed InvTransactionRequestRepo', ex);
        throw ex;
    }
});