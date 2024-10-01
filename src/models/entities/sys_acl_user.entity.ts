import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  // import { IfaApiIntergration } from "./IfaApiIntergration";
  // import { InvBidTbd } from "./InvBidTbd";
  // import { InvInvestorUser } from "./InvInvestorUser";
  // import { InvShortFundedLoan } from "./InvShortFundedLoan";
  // import { LmsCollectionReportLog } from "../draft-models/entities/LmsCollectionReportLog";
  // import { LosApplication } from "./LosApplication";
  // import { LosApplicationPreapproved } from "../draft-models/entities/LosApplicationPreapproved";
  // import { LosApplicationPrecloseRequest } from "../draft-models/entities/LosApplicationPrecloseRequest";
  // import { LosLoanEmiCollectionLog } from "../draft-models/entities/LosLoanEmiCollectionLog";
  // import { UserLoginOtpLog } from "./UserLoginOtpLog";
  
  @Index("email", ["email"], {})
  @Index("contact_number", ["contactNumber"], {})
  @Entity("sys_acl_user", { schema: "liquiloans" })
  export class SysAclUser {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("varchar", { name: "email", length: 100 })
    email: string;
  
    @Column("enum", {
      name: "is_email_verified",
      enum: ["True", "False"],
      default: () => "'False'",
    })
    isEmailVerified: "True" | "False";
  
    @Column("varchar", { name: "name", length: 100 })
    name: string;
  
    @Column("varchar", { name: "contact_number", length: 15 })
    contactNumber: string;
  
    @Column("enum", {
      name: "is_contact_number_verified",
      enum: ["True", "False"],
      default: () => "'False'",
    })
    isContactNumberVerified: "True" | "False";
  
    @Column("varchar", { name: "password", nullable: true, length: 256 })
    password: string | null;
  
    @Column("text", { name: "remember_token" })
    rememberToken: string;
  
    @Column("text", { name: "secret_token" })
    secretToken: string;
  
    @Column("int", { name: "login_count" })
    loginCount: number;
  
    @Column("text", { name: "pwd_reset_token", nullable: true })
    pwdResetToken: string | null;
  
    @Column("datetime", { name: "pwd_reset_date", nullable: true })
    pwdResetDate: Date | null;
  
    @Column("datetime", { name: "last_login_date", nullable: true })
    lastLoginDate: Date | null;
  
    @Column("enum", {
      name: "status",
      enum: ["Active", "Inactive"],
      default: () => "'Active'",
    })
    status: "Active" | "Inactive";
  
    @Column("enum", {
      name: "is_deleted",
      enum: ["True", "False"],
      default: () => "'False'",
    })
    isDeleted: "True" | "False";
  
    @Column("int", { name: "created_by", nullable: true })
    createdBy: number | null;
  
    @Column("int", { name: "updated_by", nullable: true })
    updatedBy: number | null;
  
    @Column("timestamp", {
      name: "created_at",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @Column("timestamp", { name: "updated_at", nullable: true })
    updatedAt: Date | null;
  
    @Column("timestamp", {
      name: "password_changed_at",
      nullable: true,
      default: () => "CURRENT_TIMESTAMP",
    })
    passwordChangedAt: Date | null;
  
    // @OneToMany(
    //   () => IfaApiIntergration,
    //   (ifaApiIntergration) => ifaApiIntergration.sysUser
    // )
    // ifaApiIntergrations: IfaApiIntergration[];
  
    // @OneToMany(() => InvBidTbd, (invBidTbd) => invBidTbd.authenticatedBy2)
    // invBidTbds: InvBidTbd[];
  
    // @OneToMany(
    //   () => InvInvestorUser,
    //   (invInvestorUser) => invInvestorUser.authenticatedBy2
    // )
    // invInvestorUsers: InvInvestorUser[];
  
    // @OneToMany(
    //   () => InvShortFundedLoan,
    //   (invShortFundedLoan) => invShortFundedLoan.ceatedBy2
    // )
    // invShortFundedLoans: InvShortFundedLoan[];
  
    // @OneToMany(
    //   () => LmsCollectionReportLog,
    //   (lmsCollectionReportLog) => lmsCollectionReportLog.createdBy2
    // )
    // lmsCollectionReportLogs: LmsCollectionReportLog[];
  
    // @OneToMany(
    //   () => LmsCollectionReportLog,
    //   (lmsCollectionReportLog) => lmsCollectionReportLog.updatedBy2
    // )
    // lmsCollectionReportLogs2: LmsCollectionReportLog[];
  
    // @OneToMany(() => LosApplication, (losApplication) => losApplication.appraiser)
    // losApplications: LosApplication[];
  
    // @OneToMany(
    //   () => LosApplicationPreapproved,
    //   (losApplicationPreapproved) => losApplicationPreapproved.salesAgent
    // )
    // losApplicationPreapproveds: LosApplicationPreapproved[];
  
    // @OneToMany(
    //   () => LosApplicationPrecloseRequest,
    //   (losApplicationPrecloseRequest) =>
    //     losApplicationPrecloseRequest.authenticatedBy2
    // )
    // losApplicationPrecloseRequests: LosApplicationPrecloseRequest[];
  
    // @OneToMany(
    //   () => LosLoanEmiCollectionLog,
    //   (losLoanEmiCollectionLog) => losLoanEmiCollectionLog.createdBy2
    // )
    // losLoanEmiCollectionLogs: LosLoanEmiCollectionLog[];
  
    // @OneToMany(
    //   () => LosLoanEmiCollectionLog,
    //   (losLoanEmiCollectionLog) => losLoanEmiCollectionLog.updatedBy2
    // )
    // losLoanEmiCollectionLogs2: LosLoanEmiCollectionLog[];
  
    // @OneToMany(
    //   () => UserLoginOtpLog,
    //   (userLoginOtpLog) => userLoginOtpLog.sysUser
    // )
    // userLoginOtpLogs: UserLoginOtpLog[];
  }
  