import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm';
import { InvInvestorUser } from './InvInvestorUser.entity';  // Assume investor entity
import { InvEventTransaction } from './InvEventTransaction.entity';
//import { SysAclUser } from './SysAclUser';  // Assume user entity for authentication
//import { SysAclUserRoleMapping } from './SysAclUserRoleMapping';  // Assume role entity

@Entity({ name: 'inv_transaction_request' })
export class InvTransactionRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => InvInvestorUser)
    @JoinColumn({ name: 'investor_id' })
    investor: InvInvestorUser;

    @Column({ type: 'double', precision: 12, scale: 4 })
    amount: number;

    @Column({ type: 'double', precision: 12, scale: 4, nullable: true })
    interest_amount: number;

    @Column({ type: 'datetime', nullable: true })
    transaction_date: Date;

    @Column({
        type: 'enum',
        enum: ['Credit', 'Debit'],
        nullable: true,
    })
    transaction_type: 'Credit' | 'Debit';

    @Column({
        type: 'enum',
        enum: [
            'AddMoney', 'WithdrawMoney', 'FullRedemption', 'PartialRedemption', 'MonthlyInterestPayout', 'SchemeSwitch',
            'PrincipalAndInterestReinvestment', 'PrincipalReinvestmentAndInterestRedemption', 'PrincipalAndInterestRedemption',
            'Capitalisation', 'VirtualRedemption', 'VirtualInvestment', 'BidFees', 'SWPPayout',
        ],
        nullable: true,
    })
    transaction_sub_type: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    transaction_id: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    settlement_utr: string;

    @Column({
        type: 'enum',
        enum: ['Approved', 'Rejected', 'Pending', 'Progress'],
        nullable: true,
    })
    approval_status: 'Approved' | 'Rejected' | 'Pending' | 'Progress';

    @Column({
        type: 'enum',
        enum: ['Manual', 'Auto'],
        nullable: true,
    })
    withdrawal_method: 'Manual' | 'Auto';

    @Column({ type: 'text', nullable: true })
    manual_parameters: string;

    @Column({ type: 'tinyint', default: 0 })
    is_swp: number;

    @Column({ type: 'int', nullable: true })
    scheme_id: number;

    @Column({
        type: 'enum',
        enum: ['Yes', 'No'],
        default: 'No',
    })
    is_sip_investment: 'Yes' | 'No';

    @Column({ type: 'int', nullable: true })
    sip_schedule_id: number;

    @Column({ type: 'int', nullable: true })
    old_investment_id: number;

    @Column({
        type: 'enum',
        enum: ['Paytm', 'Razorpay', 'PayU', 'NEFT', 'IMPS', 'Cash', 'RTGS', 'Netbanking', 'Cheque'],
        nullable: true,
    })
    mode: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    order_id: string;

    @Column({ type: 'int', nullable: true })
    banking_id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    upi_id: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    udf1: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    udf2: string;

    @Column({ type: 'int', nullable: true })
    maturity_request_id: number;

    @Column({ type: 'varchar', length: 150, nullable: true })
    transaction_source: string;

    @Column({ type: 'date', nullable: true })
    start_date: Date;

    @Column({ type: 'datetime', nullable: true })
    banking_date: Date;

    @Column({ type: 'datetime', nullable: true })
    ext_transaction_date: Date;

    @Column({ type: 'double', precision: 12, scale: 4, nullable: true })
    dpv_as_on_request: number;

    @Column({ type: 'double', precision: 12, scale: 4, nullable: true })
    tpv_as_on_request: number;

    @Column({ type: 'double', precision: 12, scale: 4, nullable: true })
    tpv_interest_as_on_request: number;

    //@ManyToOne(() => SysAclUser, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'authenticated_by' })
    //authenticated_by: SysAclUser;
    authenticated_by: number;

    @Column({ type: 'datetime', nullable: true })
    authenticated_at: Date;

    @Column({ type: 'text', nullable: true })
    remarks: string;

    @Column({ type: 'int', nullable: true })
    remark_id: number;

    @Column({ type: 'varchar', length: 256, default: '' })
    ifsc_code: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    account_number: string;

    @Column({ type: 'varchar', length: 256, default: '' })
    branch_name: string;

    @Column({
        type: 'enum',
        enum: ['0', '3', '6', '9', '12'],
        nullable: true,
    })
    lockin_tenure: '0' | '3' | '6' | '9' | '12';

    @Column({ type: 'double', precision: 12, scale: 4, nullable: true })
    roi: number;

    @Column({
        type: 'enum',
        enum: ['Default', 'Manual'],
        nullable: true,
    })
    action: 'Default' | 'Manual';

    @Column({ type: 'int', nullable: true })
    reason_id: number;

    @Column({
        type: 'enum',
        enum: ['Yes', 'No'],
        default: 'No',
    })
    source_payment: 'Yes' | 'No';

    @Column({
        type: 'enum',
        enum: ['Active', 'Inactive'],
        default: 'Active',
    })
    status: 'Active' | 'Inactive';

    @Column({
        type: 'enum',
        enum: ['True', 'False'],
        default: 'False',
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

    @OneToOne(() => InvEventTransaction,(event)=>event.request)
    @JoinColumn({ name: 'id' })
    event: InvEventTransaction;

}
