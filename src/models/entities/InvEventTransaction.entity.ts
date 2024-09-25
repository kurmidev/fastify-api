import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { InvInvestorUser } from './InvInvestorUser.entity';  // Assuming investor entity
import { InvTransactionRequest } from './InvTransactionRequest.entity';
//import { SysAclUser } from './SysAclUser';  // Assuming user entity for executor
//import { SysAclUserRoleMapping } from './SysAclUserRoleMapping';  // Assuming user role mapping entity

@Entity({ name: 'inv_event_transaction' })
export class InvEventTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', nullable: true })
    transaction_date: Date;

    @Column({
        type: 'enum',
        enum: [
            'Investment', 'LoanDisbursed', 'LoanCancelled', 'LoanAdjustment', 'Withdrawal', 'EMIReceived', 'ResalePortfolio',
            'SchemeSwitch', 'BidFees'
        ],
        nullable: true,
    })
    event_type: 'Investment' | 'LoanDisbursed' | 'LoanCancelled' | 'LoanAdjustment' | 'Withdrawal' | 'EMIReceived' | 'ResalePortfolio' | 'SchemeSwitch' | 'BidFees';

    @Column({
        type: 'enum',
        enum: [
            'SchemeSwitch', 'ReinvestmentPrincipalInterest', 'ReinvestmentPrincipal', 'FullRedemption', 'PartialRedemption', 'MonthlyInterestPayout',
            'MaturityPrincipalInterestRedemptionVirtual', 'MaturityInterestRedemptionActual', 'MaturityPrincipalRedemptionVirtual',
            'MaturityPrincipalInterestRedemptionActual', 'LoanAdjusted', 'Capitalisation', 'VirtualRedemption', 'VirtualInvestment', 'SWPPayout'
        ],
        nullable: true,
    })
    event_sub_type: string;

    @OneToOne(() => InvInvestorUser)
    @JoinColumn({ name: 'investor_id' })
    investor: InvInvestorUser;

    @Column({ type: 'int', nullable: true })
    scheme_id: number;

    @Column({ type: 'double', precision: 12, scale: 4, nullable: true })
    amount: number;

    @Column({ type: 'int', nullable: true })
    application_id: number;

    @OneToOne(() => InvTransactionRequest,(request)=>request.event)
    @JoinColumn({ name: 'investor_id' })
    request: InvTransactionRequest;

    @Column({ type: 'int', nullable: true })
    request_id: number;

    @Column({ type: 'tinyint', nullable: true })
    risk_grade_id: number;

    @Column({ type: 'varchar', length: 50, nullable: true, charset: 'latin1' })
    reference_no: string;

    @Column({ type: 'date', nullable: true })
    emi_due_date: Date;

    @Column({ type: 'int', nullable: true })
    previous_event_id: number;

    @Column({
        type: 'enum',
        enum: ['Yes', 'No', 'Hold', 'InProgress', 'TempHold'],
        default: 'No',
        charset: 'latin1'
    })
    is_event_processed: 'Yes' | 'No' | 'Hold' | 'InProgress' | 'TempHold';

    @Column({ type: 'timestamp', nullable: true })
    event_processed_at: Date;

//    @ManyToOne(() => SysAclUser, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'executed_by' })
  //  executed_by: SysAclUser;
  executed_by: number;

    @Column({ type: 'text', nullable: true, charset: 'latin1' })
    json_text: string;

    @Column({
        type: 'enum',
        enum: ['Initiated', 'InProgress', 'Success', 'Failed'],
        nullable: true,
        charset: 'latin1'
    })
    job_status: 'Initiated' | 'InProgress' | 'Success' | 'Failed';

    @Column({ type: 'varchar', length: 100, default: '', charset: 'latin1' })
    remarks: string;

    @Column({ type: 'int', nullable: true })
    remark_id: number;

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

    //@ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'created_by' })
    //created_by: SysAclUserRoleMapping;
    created_by: number;

    //@ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'updated_by' })
    //updated_by: SysAclUserRoleMapping;
    updated_by: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
