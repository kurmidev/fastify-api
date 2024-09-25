import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
//import { SysAclUserRoleMapping } from './SysAclUserRoleMapping'; // Import the related entity

@Entity({ name: 'ifa_user' })
export class IfaUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ['Commission', 'NonCommission'],
        nullable: true,
    })
    user_type: 'Commission' | 'NonCommission';

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    company_name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    role_nick_name: string;

    @Column({
        type: 'enum',
        enum: ['Male', 'Female', 'Other'],
        default: 'Male',
    })
    gender: 'Male' | 'Female' | 'Other';

    @Column({
        type: 'enum',
        enum: ['Family', 'Individual'],
        nullable: true,
    })
    entity_type: 'Family' | 'Individual';

    @Column({
        type: 'enum',
        enum: ['ARN', 'RIA', 'Both'],
        default: 'ARN',
    })
    holding_type: 'ARN' | 'RIA' | 'Both';

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 256 })
    pan: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    pan_hash: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    aadhar_number: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    gst_number: string;

    @Column({
        type: 'enum',
        enum: ['Approved', 'Rejected', 'Pending'],
        default: 'Pending',
    })
    approval_status: 'Approved' | 'Rejected' | 'Pending';

    @Column({
        type: 'enum',
        enum: ['Monthly', 'Quarterly', 'HalfYearly', 'Yearly'],
        nullable: true,
    })
    payout_type: 'Monthly' | 'Quarterly' | 'HalfYearly' | 'Yearly';

    @Column({ type: 'varchar', length: 100, nullable: true })
    unique_url_alias: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    unique_url_key: string;

    @Column({
        type: 'enum',
        enum: ['Yes', 'No'],
        default: 'No',
    })
    mask_data: 'Yes' | 'No';

    @Column({ type: 'varchar', length: 100, nullable: true })
    referral_code: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    logo: string;

    @Column({
        type: 'enum',
        enum: ['Physical', 'Electronic', 'MobileOtp'],
        nullable: true,
    })
    agreement_mode: 'Physical' | 'Electronic' | 'MobileOtp';

    @Column({
        type: 'enum',
        enum: ['Sent', 'Signed', 'Pending', 'Expired', 'NotRequired'],
        nullable: true,
    })
    agreement_status: 'Sent' | 'Signed' | 'Pending' | 'Expired' | 'NotRequired';

    @Column({ type: 'datetime', nullable: true })
    agreement_date: Date;

    @Column({ type: 'datetime', nullable: true })
    agreement_signed_date: Date;

    @Column({ type: 'varchar', length: 256, nullable: true })
    agreement_id: string;

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

    @Column({ nullable: true })
    authenticated_by: number;

    @Column({ type: 'datetime', nullable: true })
    authenticated_at: Date;

    @Column({ type: 'tinyint', default: 1 })
    send_automatic_commission_email: number;

    @Column({ nullable: true })
    created_by: number;

    @Column({ nullable: true })
    updated_by: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ type: 'varchar', length: 45, nullable: true, charset: 'utf8mb4' })
    source_of_lead: string;

    // Foreign Key Relationships
    //@ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'created_by' })
    createdBy: number;

    //@ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'authenticated_by' })
    authenticatedBy: number;

    //@ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'updated_by' })
    updatedBy: Date;
}
