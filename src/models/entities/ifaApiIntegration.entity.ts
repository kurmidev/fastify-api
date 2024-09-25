import fastify, { FastifyInstance } from 'fastify';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Repository
} from 'typeorm';
import AppDataSource  from "./../db.config";

//import {configureDatabase} from '../db.config';

//import { SysAclUser } from './SysAclUser'; // Import the corresponding SysAclUser entity
//import { IfaUser } from './IfaUser'; // Import the corresponding IfaUser entity

@Entity({ name: 'ifa_api_intergration' })
export class IfaApiIntegration {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sys_user_id: number;

    @Column()
    ifa_id: number;

    @Column({ type: 'varchar', length: 45, charset: 'latin1' })
    mid: string;

    @Column({ type: 'varchar', length: 45, charset: 'latin1' })
    key: string;

    @Column({ type: 'varchar', length: 256, nullable: true, charset: 'latin1' })
    call_back_url: string;

    @Column({ 
        type: 'enum', 
        enum: ['Active', 'Inactive'], 
        default: 'Active', 
        charset: 'latin1' 
    })
    status: 'Active' | 'Inactive';

    @Column({ 
        type: 'enum', 
        enum: ['True', 'False'], 
        default: 'False', 
        charset: 'latin1' 
    })
    is_deleted: 'True' | 'False';

    @Column({ nullable: true })
    created_by: number;

    @Column({ nullable: true })
    updated_by: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // Relationships with other tables (Foreign Keys)

    // @ManyToOne(() => SysAclUser, sysAclUser => sysAclUser.apiIntegrations, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    // @JoinColumn({ name: 'sys_user_id' })
    // sysAclUser: SysAclUser;

    // @ManyToOne(() => IfaUser, ifaUser => ifaUser.apiIntegrations, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    // @JoinColumn({ name: 'ifa_id' })
    // ifaUser: IfaUser;
}

// export const IfaApiIntegrationRepository = AppDataSource.getRepository(IfaApiIntegration).extend({
//     checkMidExists(mid: string) {
//         var status:string="Active"
//         var is_deleted:string="False"
//         return this.createQueryBuilder("ifa_api_intergration")
//             .where("ifa_api_intergration.mid = :mid", { mid })
//             .andWhere("ifa_api_intergration.status = :status", { status })
//             .andWhere("ifa_api_intergration.is_deleted = :is_deleted", { is_deleted })
//             .getOne()
//     },
// })


// const ApiIntegrationsRepository = async (server:FastifyInstance)=>{
//     server.decorate("ApiIntegrationsRepository",server.AppDataSource.getRepository(IfaApiIntegration).extend({
//         checkMidExists(mid: string) {
//             var status:string="Active"
//             var is_deleted:string="False"
//             return this.createQueryBuilder("ifa_api_intergration")
//                 .where("ifa_api_intergration.mid = :mid", { mid })
//                 .andWhere("ifa_api_intergration.status = :status", { status })
//                 .andWhere("ifa_api_intergration.is_deleted = :is_deleted", { is_deleted })
//                 .getOne()
//         }));
    
                
// }