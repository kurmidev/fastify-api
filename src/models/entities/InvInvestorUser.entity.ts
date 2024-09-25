import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { IfaUser } from './Ifauser.entity';
// import { SysAclUser } from './SysAclUser';
// import { SysAclUserRoleMapping } from './SysAclUserRoleMapping';

@Entity({ name: 'inv_investor_user' })
export class InvInvestorUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    ifa_id:number;

    @ManyToOne(() => IfaUser)
    @JoinColumn({ name: 'ifa_id' })
    ifa: IfaUser;

    @Column({ type: 'int', nullable: true })
    category_id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string;

    @Column({ type: 'int', nullable: true })
    folio_master_id: number;

    @Column({
        type: 'enum',
        enum: ['Api', 'Manual'],
        default: 'Manual',
    })
    name_fetched_by: 'Api' | 'Manual';

    @Column({
        type: 'enum',
        enum: ['Family', 'Individual'],
        default: 'Individual',
    })
    investor_type: 'Family' | 'Individual';

    @Column({
        type: 'enum',
        enum: ['Family', 'Self'],
        default: 'Self',
    })
    dashboard_view: 'Family' | 'Self';

    @Column({
        type: 'enum',
        enum: [
            'Individual', 'Company', 'HUF', 'LLP', 'Trust', 'Society', 'AssociationOfPersons',
            'BodyOfIndividuals', 'Firm', 'Government', 'LocalAuthority', 'ArtificialJudicialPerson'
        ],
        default: 'Individual',
    })
    entity_type: string;

    @Column({
        type: 'enum',
        enum: ['ARN', 'RIA'],
        default: 'ARN',
    })
    holding_type: 'ARN' | 'RIA';

    @Column({
        type: 'enum',
        enum: ['Male', 'Female', 'Other'],
        nullable: true,
    })
    gender: 'Male' | 'Female' | 'Other';

    @Column({ type: 'date', nullable: true })
    dob: Date;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    email_hash: string;

    @Column({ type: 'varchar', length: 15 })
    contact_number: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    contact_number_hash: string;

    @Column({ type: 'varchar', length: 256 })
    pan: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    pan_hash: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    aadhaar_number: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    aadhaar_number_hash: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    gst_number: string;

    @Column({ type: 'float', precision: 12, scale: 4, nullable: true })
    profile_roi: number;

    @Column({
        type: 'enum',
        enum: ['Approved', 'Rejected', 'Pending', 'Blocked', 'Deleted'],
        default: 'Pending',
    })
    approval_status: 'Approved' | 'Rejected' | 'Pending' | 'Blocked' | 'Deleted';

    @Column({
        type: 'enum',
        enum: ['Physical', 'Electronic', 'MobileOtp'],
        nullable: true,
    })
    e_agreement_mode: 'Physical' | 'Electronic' | 'MobileOtp';

    @Column({
        type: 'enum',
        enum: ['Sent', 'Signed', 'Pending', 'Expired', 'NotRequired'],
        nullable: true,
    })
    e_agreement_status: 'Sent' | 'Signed' | 'Pending' | 'Expired' | 'NotRequired';

    @Column({ type: 'datetime', nullable: true })
    e_agreement_date: Date;

    @Column({ type: 'datetime', nullable: true })
    e_agreement_signed_date: Date;

    @Column({ type: 'varchar', length: 256, nullable: true })
    e_agreement_document_id: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    ckyc_number: string;

    @Column({ type: 'int', default: 50 })
    max_investment_bucket: number;

    //@ManyToOne(() => SysAclUser, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'authenticated_by' })
    //authenticated_by: SysAclUser;
    authenticated_by: number;

    @Column({ type: 'datetime', nullable: true })
    authenticated_at: Date;

    @Column({
        type: 'enum',
        enum: ['CKYC', 'OKYC', 'Manual', 'Banking', 'VerifyInvestorAccount', 'Document', 'Auto'],
        nullable: true,
    })
    kyc_verification_mode: string;

    @Column({
        type: 'enum',
        enum: ['Verified', 'NotVerified', 'Expired', 'Rejected', 'PartiallyVerified', 'Pending'],
        default: 'Pending',
    })
    kyc_status: string;

    @Column({ type: 'datetime', nullable: true })
    kyc_date: Date;

    @Column({ type: 'int', nullable: true })
    ca_certificate_id: number;

    @Column({
        type: 'enum',
        enum: ['Approved', 'Rejected', 'Pending', 'Expired'],
        nullable: true,
    })
    ca_certificate_status: 'Approved' | 'Rejected' | 'Pending' | 'Expired';

    @Column({
        type: 'enum',
        enum: ['website', 'websiteReferral', 'adminDashboard', 'ifaDashboard', 'investorDashboard', 'mobile', 'mobileReferral', 'thirdParty', 'unknownSource'],
        default: 'unknownSource',
    })
    onboarding_source: string;

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

    // @ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    // @JoinColumn({ name: 'created_by' })
    // created_by: SysAclUserRoleMapping;

    // @ManyToOne(() => SysAclUserRoleMapping, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    // @JoinColumn({ name: 'updated_by' })
    // updated_by: SysAclUserRoleMapping;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
