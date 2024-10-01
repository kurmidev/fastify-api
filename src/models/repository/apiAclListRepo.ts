/*import { FastifyInstance } from "fastify";
import fp from "fastify-plugin"
import { ApiAclList } from "../entities/api_acl_list.entity";


export default fp(async (server: FastifyInstance, opts: any)=> {
    try{
        const repo = await server.db.getRepository(ApiAclList).extend({
            checkAclExist( apiPath: string, apiMethod: string) {
                var status: string = "Active"
                var is_deleted: string = "False"
                return this.createQueryBuilder("api_acl_list")
                    .andWhere("api_acl_list.apiPath = :apiPath", { apiPath:apiPath})
                    .andWhere("api_acl_list.apiMethod = :apiMethod", { apiMethod:apiMethod} )
                    .andWhere("api_acl_list.status = :status", { status:status })
                    .andWhere("api_acl_list.is_deleted = :is_deleted", { is_deleted:is_deleted })
                    .getOne()
            }
        })
        server.decorate('ApiAclListRepo', repo);
    }catch(ex){
        server.log.error('Database connection failed', ex);
        throw ex;
    }
});*/

import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { ApiAclList } from "../entities/api_acl_list.entity";
import { Repository } from "typeorm";

export default fp(async (server: FastifyInstance, opts: any) => {
  try {
    // Get the repository and extend it with custom methods
    const repo = server.db.getRepository(ApiAclList).extend({
      // Method to check if an ACL entry exists in the database
      async checkAclExist(apiPath: string, apiMethod: string): Promise<ApiAclList|null|undefined> {
        const status = "Active";
        const is_deleted = "False";
        
        return this.createQueryBuilder("api_acl_list")
          .where("api_acl_list.apiPath = :apiPath", { apiPath })
          .andWhere("api_acl_list.apiMethod = :apiMethod", { apiMethod })
          .andWhere("api_acl_list.status = :status", { status })
          .andWhere("api_acl_list.is_deleted = :is_deleted", { is_deleted })
          .getOne();
      }
    });

    // Decorate the Fastify instance with the extended repository
    server.decorate('ApiAclListRepo', repo);
  } catch (error) {
    // Log and throw the error if there's a failure in database connection or repository setup
    server.log.error('Failed to initialize ApiAclList repository:', error);
    throw new Error('Database connection failed or repository setup issue');
  }
});

// Type definition for Fastify instance with the custom decorator
declare module 'fastify' {
  interface FastifyInstance {
    ApiAclListRepo: Repository<ApiAclList> & {
      checkAclExist(apiPath: string, apiMethod: string): Promise<ApiAclList|null|undefined>;
    };
  }
}
