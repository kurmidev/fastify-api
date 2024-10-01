import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
//   import { CancellationPolicyAgreeStatus } from "./CancellationPolicyAgreeStatus";
//   import { DealerWebhookLog } from "./DealerWebhookLog";
//   import { DisbursalSettlementDetails } from "./DisbursalSettlementDetails";
//   import { InvAuctionableLoan } from "./InvAuctionableLoan";
//   import { InvBidTbd } from "./InvBidTbd";
//   import { InvBidTransaction } from "./InvBidTransaction";
//   import { InvEventTransaction } from "./InvEventTransaction";
//   import { InvLoanEmiRepaymentSchedule } from "./InvLoanEmiRepaymentSchedule";
//   import { InvLoanMappingReport } from "./InvLoanMappingReport";
//   import { InvMarketplaceLoan } from "./InvMarketplaceLoan";
//   import { InvShortFundedLoan } from "./InvShortFundedLoan";
//   import { InvTransactionLog } from "./InvTransactionLog";
//   import { LosApplicantAadhaar } from "./LosApplicantAadhaar";
//   import { LosApplicantAddress } from "./LosApplicantAddress";
//   import { LosApplicantAverageBankBalance } from "./LosApplicantAverageBankBalance";
//   import { LosApplicantBanking } from "./LosApplicantBanking";
//   import { LosApplicantBankingAnalysis } from "./LosApplicantBankingAnalysis";
//   import { LosApplicantBankingAnalysisRaw } from "./LosApplicantBankingAnalysisRaw";
//   import { LosApplicantConsent } from "./LosApplicantConsent";
//   import { LosApplicantDependant } from "./LosApplicantDependant";
//   import { LosApplicantDocument } from "./LosApplicantDocument";
//   import { LosApplicantEmployer } from "./LosApplicantEmployer";
//   import { LosApplicantPaymentOtp } from "./LosApplicantPaymentOtp";
//   import { LosStatusMaster } from "./LosStatusMaster";
//   import { SysAclUser } from "./SysAclUser";
//   import { LosLoanTypeMaster } from "./LosLoanTypeMaster";
//   import { LosDealerSchemeMaster } from "./LosDealerSchemeMaster";
  import { LosDealerStore } from "./los_dealer_store.entity"
//   import { LosApplicationDetails } from "./LosApplicationDetails";
//   import { LosApplicationDiscretionaryDp } from "./LosApplicationDiscretionaryDp";
//   import { LosApplicationMapping } from "./LosApplicationMapping";
//   import { LosApplicationPreapproved } from "./LosApplicationPreapproved";
//   import { LosApplicationPrecloseRequest } from "./LosApplicationPrecloseRequest";
//   import { LosCoApplicantMapping } from "./LosCoApplicantMapping";
//   import { LosCrmIntegration } from "./LosCrmIntegration";
//   import { LosDealerApplicationStatus } from "./LosDealerApplicationStatus";
//   import { LosFinbit } from "./LosFinbit";
//   import { LosLmsApplicationMapping } from "./LosLmsApplicationMapping";
  import { LosLoanEmiRepaymentSchedule } from "./los_loan_emi_repayment_schedule.entity"
//   import { LosMandate } from "./LosMandate";
//   import { LosMifosApplicationMapping } from "./LosMifosApplicationMapping";
//   import { LosPartDisbursal } from "./LosPartDisbursal";
//   import { LosScienapticLogs } from "./LosScienapticLogs";
//   import { LosUploadDocumentLink } from "./LosUploadDocumentLink";
//   import { OpsApiDisbursed } from "./OpsApiDisbursed";
//   import { OpsTbdLoans } from "./OpsTbdLoans";
  
  @Index("loan_type_id", ["loanTypeId"], {})
  @Index("sales_agent_id", ["salesAgentId"], {})
  @Index("scheme_id", ["schemeId"], {})
  @Index("dealer_store_id", ["dealerStoreId"], {})
  @Index("application_status_id", ["applicationStatusId"], {})
  @Index("created_by", ["createdBy"], {})
  @Index("updated_by", ["updatedBy"], {})
  @Index("dealer_id", ["dealerId"], {})
  @Index("appraiser_id", ["appraiserId"], {})
  @Index("created_at", ["createdAt"], {})
  @Index("code", ["code"], {})
  @Index("los_application_nbfc_id", ["nbfcId"], {})
  @Index("idx_los_application_urn", ["urn"], {})
  @Index("isdeleted_status", ["status", "isDeleted"], {})
  @Index("idx_losappl_disbdate", ["disbursementDate"], {})
  @Entity("los_application", { schema: "liquiloans" })
  export class LosApplication {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("varchar", { name: "code", nullable: true, length: 20 })
    code: string | null;
  
    @Column("date", { name: "application_date", nullable: true })
    applicationDate: string | null;
  
    @Column("int", { name: "loan_type_id", nullable: true })
    loanTypeId: number | null;
  
    @Column("int", { name: "application_status_id" })
    applicationStatusId: number;
  
    @Column("int", { name: "application_sub_status_id", nullable: true })
    applicationSubStatusId: number | null;
  
    @Column("varchar", { name: "urn", nullable: true, length: 100 })
    urn: string | null;
  
    @Column("enum", {
      name: "closure_status",
      nullable: true,
      enum: ["ExtensionClosure", "NormalClosure", "EarlyClosure", "Cancelled"],
    })
    closureStatus:
      | "ExtensionClosure"
      | "NormalClosure"
      | "EarlyClosure"
      | "Cancelled"
      | null;
  
    @Column("float", {
      name: "product_amount_old",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    productAmountOld: number | null;
  
    @Column("float", {
      name: "down_payment_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    downPaymentAmount: number | null;
  
    @Column("float", {
      name: "loan_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    loanAmount: number | null;
  
    @Column("float", {
      name: "subvention_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    subventionPercentage: number | null;
  
    @Column("float", {
      name: "subvention_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    subventionAmount: number | null;
  
    @Column("enum", {
      name: "subvention_dealer_on",
      nullable: true,
      enum: ["loan_amount", "product_amount"],
    })
    subventionDealerOn: "loan_amount" | "product_amount" | null;
  
    @Column("float", {
      name: "subvention_customer_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    subventionCustomerPercentage: number | null;
  
    @Column("float", {
      name: "subvention_customer_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    subventionCustomerAmount: number | null;
  
    @Column("enum", {
      name: "subvention_customer_on",
      nullable: true,
      enum: ["loan_amount", "product_amount"],
    })
    subventionCustomerOn: "loan_amount" | "product_amount" | null;
  
    @Column("float", {
      name: "processing_fees_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    processingFeesPercentage: number | null;
  
    @Column("float", {
      name: "processing_fees_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    processingFeesAmount: number | null;
  
    @Column("enum", {
      name: "processsing_fees_customer_on",
      nullable: true,
      enum: ["loan_amount", "product_amount"],
    })
    processsingFeesCustomerOn: "loan_amount" | "product_amount" | null;
  
    @Column("float", {
      name: "processing_fees_dealer_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    processingFeesDealerPercentage: number | null;
  
    @Column("float", {
      name: "processing_fees_dealer_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    processingFeesDealerAmount: number | null;
  
    @Column("enum", {
      name: "processing_fees_dealer_on",
      nullable: true,
      enum: ["loan_amount", "product_amount"],
    })
    processingFeesDealerOn: "loan_amount" | "product_amount" | null;
  
    @Column("float", {
      name: "franking_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    frankingPercentage: number | null;
  
    @Column("float", {
      name: "franking_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    frankingAmount: number | null;
  
    @Column("float", {
      name: "gst_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    gstPercentage: number | null;
  
    @Column("float", {
      name: "gst_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    gstAmount: number | null;
  
    @Column("float", {
      name: "subvention_dealer_gst_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    subventionDealerGstAmount: number | null;
  
    @Column("float", {
      name: "subvention_customer_gst_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    subventionCustomerGstAmount: number | null;
  
    @Column("float", {
      name: "processing_fee_dealer_gst_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    processingFeeDealerGstAmount: number | null;
  
    @Column("float", {
      name: "processing_fee_customer_gst_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    processingFeeCustomerGstAmount: number | null;
  
    @Column("int", { name: "emi_tenure", nullable: true })
    emiTenure: number | null;
  
    @Column("float", {
      name: "emi_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    emiAmount: number | null;
  
    @Column("enum", {
      name: "emi_type_id",
      nullable: true,
      enum: ["1", "2", "3", "4"],
      default: () => "'1'",
    })
    emiTypeId: "1" | "2" | "3" | "4" | null;
  
    @Column("float", {
      name: "to_be_disbursed_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    toBeDisbursedAmount: number | null;
  
    @Column("float", {
      name: "disbursed_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    disbursedAmount: number | null;
  
    @Column("enum", {
      name: "scheme_type",
      nullable: true,
      enum: ["1", "2"],
      default: () => "'1'",
    })
    schemeType: "1" | "2" | null;
  
    @Column("enum", {
      name: "down_payment_type",
      nullable: true,
      enum: ["Months", "Percentage", "Discretionary"],
    })
    downPaymentType: "Months" | "Percentage" | "Discretionary" | null;
  
    @Column("int", { name: "down_payment_tenure", nullable: true })
    downPaymentTenure: number | null;
  
    @Column("float", {
      name: "down_payment_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    downPaymentPercentage: number | null;
  
    @Column("float", {
      name: "advance_emi_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    advanceEmiAmount: number | null;
  
    @Column("enum", {
      name: "advance_emi_type",
      nullable: true,
      enum: ["Months", "Percentage", "Discretionary"],
    })
    advanceEmiType: "Months" | "Percentage" | "Discretionary" | null;
  
    @Column("int", { name: "advance_emi_tenure", nullable: true })
    advanceEmiTenure: number | null;
  
    @Column("float", {
      name: "advance_emi_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    advanceEmiPercentage: number | null;
  
    @Column("float", {
      name: "roi_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    roiPercentage: number | null;
  
    @Column("enum", {
      name: "roi_type",
      nullable: true,
      enum: ["Declining", "Flat", "Balloon"],
    })
    roiType: "Declining" | "Flat" | "Balloon" | null;
  
    @Column("enum", {
      name: "roi_on",
      nullable: true,
      enum: ["loan_amount", "product_amount"],
    })
    roiOn: "loan_amount" | "product_amount" | null;
  
    @Column("enum", { name: "roi_gst", nullable: true, enum: ["Yes", "No"] })
    roiGst: "Yes" | "No" | null;
  
    @Column("float", {
      name: "foir_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    foirPercentage: number | null;
  
    @Column("float", {
      name: "xirr_percentage",
      nullable: true,
      precision: 7,
      scale: 4,
    })
    xirrPercentage: number | null;
  
    @Column("int", { name: "product_id", nullable: true })
    productId: number | null;
  
    @Column("int", { name: "dealer_id", nullable: true })
    dealerId: number | null;
  
    @Column("int", { name: "dealer_store_id", nullable: true })
    dealerStoreId: number | null;
  
    @Column("int", { name: "scheme_id" })
    schemeId: number;
  
    @Column("int", { name: "sales_agent_id", nullable: true })
    salesAgentId: number | null;
  
    @Column("int", { name: "appraiser_id", nullable: true })
    appraiserId: number | null;
  
    @Column("int", {
      name: "loan_reason_id",
      nullable: true,
      comment: "table creation pending",
    })
    loanReasonId: number | null;
  
    @Column("int", { name: "nbfc_id", nullable: true, default: () => "'1'" })
    nbfcId: number | null;
  
    @Column("varchar", { name: "other_reason", nullable: true, length: 100 })
    otherReason: string | null;
  
    @Column("date", { name: "emi_start_date", nullable: true })
    emiStartDate: string | null;
  
    @Column("date", { name: "expected_disbursement_date", nullable: true })
    expectedDisbursementDate: string | null;
  
    @Column("date", { name: "disbursement_date", nullable: true })
    disbursementDate: string | null;
  
    @Column("text", { name: "nach_reports", nullable: true })
    nachReports: string | null;
  
    @Column("enum", {
      name: "nach_amount_type",
      nullable: true,
      enum: ["emi_amount", "loan_amount"],
      default: () => "'loan_amount'",
    })
    nachAmountType: "emi_amount" | "loan_amount" | null;
  
    @Column("enum", {
      name: "mandate_sent",
      nullable: true,
      enum: ["Y", "N", "Registered"],
    })
    mandateSent: "Y" | "N" | "Registered" | null;
  
    @Column("timestamp", { name: "mandate_date", nullable: true })
    mandateDate: Date | null;
  
    @Column("timestamp", { name: "mandate_reg_date", nullable: true })
    mandateRegDate: Date | null;
  
    @Column("varchar", { name: "loan_annexure", nullable: true, length: 256 })
    loanAnnexure: string | null;
  
    @Column("datetime", { name: "loan_annexure_gen_date", nullable: true })
    loanAnnexureGenDate: Date | null;
  
    @Column("date", { name: "approval_date", nullable: true })
    approvalDate: string | null;
  
    @Column("enum", {
      name: "approval_status",
      nullable: true,
      enum: ["Ready", "Pending"],
      default: () => "'Pending'",
    })
    approvalStatus: "Ready" | "Pending" | null;
  
    @Column("varchar", { name: "approval_id", nullable: true, length: 45 })
    approvalId: string | null;
  
    @Column("enum", {
      name: "doc_custody",
      nullable: true,
      enum: ["Sales", "Dealer", "Agency"],
    })
    docCustody: "Sales" | "Dealer" | "Agency" | null;
  
    @Column("int", { name: "check_count", nullable: true })
    checkCount: number | null;
  
    @Column("enum", { name: "fldg", nullable: true, enum: ["Yes", "No", "Both"] })
    fldg: "Yes" | "No" | "Both" | null;
  
    @Column("enum", {
      name: "cancellation_call",
      nullable: true,
      enum: ["Yes", "No"],
    })
    cancellationCall: "Yes" | "No" | null;
  
    @Column("enum", {
      name: "is_part_disbursal",
      nullable: true,
      enum: ["Yes", "No"],
    })
    isPartDisbursal: "Yes" | "No" | null;
  
    @Column("enum", {
      name: "part_disbursal_type",
      nullable: true,
      enum: ["1", "0"],
    })
    partDisbursalType: "1" | "0" | null;
  
    @Column("varchar", { name: "utr", nullable: true, length: 1000 })
    utr: string | null;
  
    @Column("enum", {
      name: "ops_banking_verified",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    opsBankingVerified: "Yes" | "No";
  
    @Column("text", { name: "ops_banking_json", nullable: true })
    opsBankingJson: string | null;
  
    @Column("enum", {
      name: "ops_banking_auto_verified",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    opsBankingAutoVerified: "Yes" | "No";
  
    @Column("enum", {
      name: "ops_cheque_verified",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    opsChequeVerified: "Yes" | "No";
  
    @Column("text", { name: "ops_cheque_json", nullable: true })
    opsChequeJson: string | null;
  
    @Column("enum", {
      name: "bank_rating",
      nullable: true,
      enum: ["1", "2", "3", "4", "5"],
    })
    bankRating: "1" | "2" | "3" | "4" | "5" | null;
  
    @Column("enum", {
      name: "credit_rating",
      nullable: true,
      enum: ["1", "2", "3", "4", "5"],
    })
    creditRating: "1" | "2" | "3" | "4" | "5" | null;
  
    @Column("enum", {
      name: "custodian",
      nullable: true,
      enum: ["SalesAgent", "Agency", "Dealer", "Liquiloans"],
      default: () => "'Agency'",
    })
    custodian: "SalesAgent" | "Agency" | "Dealer" | "Liquiloans" | null;
  
    @Column("float", {
      name: "cash_outflow_amount_old",
      nullable: true,
      precision: 12,
    })
    cashOutflowAmountOld: number | null;
  
    @Column("double", {
      name: "cash_outflow_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    cashOutflowAmount: number | null;
  
    @Column("varchar", { name: "cash_outflow_json", nullable: true, length: 500 })
    cashOutflowJson: string | null;
  
    @Column("float", {
      name: "exposure",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    exposure: number | null;
  
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
  
    @Column("timestamp", { name: "assign_tvr_loan_to_uw_at", nullable: true })
    assignTvrLoanToUwAt: Date | null;
  
    @Column("enum", {
      name: "tranche_consent",
      nullable: true,
      enum: ["Yes", "No"],
    })
    trancheConsent: "Yes" | "No" | null;
  
    @Column("double", {
      name: "bundled_loan_amount",
      precision: 12,
      scale: 4,
      default: () => "'0.0000'",
    })
    bundledLoanAmount: number;
  
    @Column("double", {
      name: "product_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    productAmount: number | null;
  
    // @OneToMany(
    //   () => CancellationPolicyAgreeStatus,
    //   (cancellationPolicyAgreeStatus) => cancellationPolicyAgreeStatus.application
    // )
    // cancellationPolicyAgreeStatuses: CancellationPolicyAgreeStatus[];
  
    // @OneToMany(
    //   () => DealerWebhookLog,
    //   (dealerWebhookLog) => dealerWebhookLog.application
    // )
    // dealerWebhookLogs: DealerWebhookLog[];
  
    // @OneToOne(
    //   () => DisbursalSettlementDetails,
    //   (disbursalSettlementDetails) => disbursalSettlementDetails.application
    // )
    // disbursalSettlementDetails: DisbursalSettlementDetails;
  
    // @OneToMany(
    //   () => InvAuctionableLoan,
    //   (invAuctionableLoan) => invAuctionableLoan.application
    // )
    // invAuctionableLoans: InvAuctionableLoan[];
  
    // @OneToMany(() => InvBidTbd, (invBidTbd) => invBidTbd.application)
    // invBidTbds: InvBidTbd[];
  
    // @OneToMany(
    //   () => InvBidTransaction,
    //   (invBidTransaction) => invBidTransaction.application
    // )
    // invBidTransactions: InvBidTransaction[];
  
    // @OneToMany(
    //   () => InvEventTransaction,
    //   (invEventTransaction) => invEventTransaction.application
    // )
    // invEventTransactions: InvEventTransaction[];
  
    // @OneToMany(
    //   () => InvLoanEmiRepaymentSchedule,
    //   (invLoanEmiRepaymentSchedule) => invLoanEmiRepaymentSchedule.application
    // )
    // invLoanEmiRepaymentSchedules: InvLoanEmiRepaymentSchedule[];
  
    // @OneToMany(
    //   () => InvLoanMappingReport,
    //   (invLoanMappingReport) => invLoanMappingReport.application
    // )
    // invLoanMappingReports: InvLoanMappingReport[];
  
    // @OneToMany(
    //   () => InvMarketplaceLoan,
    //   (invMarketplaceLoan) => invMarketplaceLoan.application
    // )
    // invMarketplaceLoans: InvMarketplaceLoan[];
  
    // @OneToMany(
    //   () => InvShortFundedLoan,
    //   (invShortFundedLoan) => invShortFundedLoan.application
    // )
    // invShortFundedLoans: InvShortFundedLoan[];
  
    // @OneToMany(
    //   () => InvTransactionLog,
    //   (invTransactionLog) => invTransactionLog.application
    // )
    // invTransactionLogs: InvTransactionLog[];
  
    // @OneToMany(
    //   () => LosApplicantAadhaar,
    //   (losApplicantAadhaar) => losApplicantAadhaar.application
    // )
    // losApplicantAadhaars: LosApplicantAadhaar[];
  
    // @OneToMany(
    //   () => LosApplicantAddress,
    //   (losApplicantAddress) => losApplicantAddress.application
    // )
    // losApplicantAddresses: LosApplicantAddress[];
  
    // @OneToMany(
    //   () => LosApplicantAverageBankBalance,
    //   (losApplicantAverageBankBalance) =>
    //     losApplicantAverageBankBalance.application
    // )
    // losApplicantAverageBankBalances: LosApplicantAverageBankBalance[];
  
    // @OneToMany(
    //   () => LosApplicantBanking,
    //   (losApplicantBanking) => losApplicantBanking.application
    // )
    // losApplicantBankings: LosApplicantBanking[];
  
    // @OneToMany(
    //   () => LosApplicantBankingAnalysis,
    //   (losApplicantBankingAnalysis) => losApplicantBankingAnalysis.application
    // )
    // losApplicantBankingAnalyses: LosApplicantBankingAnalysis[];
  
    // @OneToMany(
    //   () => LosApplicantBankingAnalysisRaw,
    //   (losApplicantBankingAnalysisRaw) =>
    //     losApplicantBankingAnalysisRaw.application
    // )
    // losApplicantBankingAnalysisRaws: LosApplicantBankingAnalysisRaw[];
  
    // @OneToMany(
    //   () => LosApplicantConsent,
    //   (losApplicantConsent) => losApplicantConsent.application
    // )
    // losApplicantConsents: LosApplicantConsent[];
  
    // @OneToMany(
    //   () => LosApplicantDependant,
    //   (losApplicantDependant) => losApplicantDependant.application
    // )
    // losApplicantDependants: LosApplicantDependant[];
  
    // @OneToMany(
    //   () => LosApplicantDocument,
    //   (losApplicantDocument) => losApplicantDocument.application
    // )
    // losApplicantDocuments: LosApplicantDocument[];
  
    // @OneToMany(
    //   () => LosApplicantEmployer,
    //   (losApplicantEmployer) => losApplicantEmployer.application
    // )
    // losApplicantEmployers: LosApplicantEmployer[];
  
    // @OneToMany(
    //   () => LosApplicantPaymentOtp,
    //   (losApplicantPaymentOtp) => losApplicantPaymentOtp.application
    // )
    // losApplicantPaymentOtps: LosApplicantPaymentOtp[];
  
    // @ManyToOne(
    //   () => LosStatusMaster,
    //   (losStatusMaster) => losStatusMaster.losApplications,
    //   { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    // )
    // @JoinColumn([{ name: "application_status_id", referencedColumnName: "id" }])
    // applicationStatus: LosStatusMaster;
  
    // @ManyToOne(() => SysAclUser, (sysAclUser) => sysAclUser.losApplications, {
    //   onDelete: "RESTRICT",
    //   onUpdate: "CASCADE",
    // })
    // @JoinColumn([{ name: "appraiser_id", referencedColumnName: "id" }])
    // appraiser: SysAclUser;
  
    // @ManyToOne(
    //   () => LosLoanTypeMaster,
    //   (losLoanTypeMaster) => losLoanTypeMaster.losApplications,
    //   { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    // )
    // @JoinColumn([{ name: "loan_type_id", referencedColumnName: "id" }])
    // loanType: LosLoanTypeMaster;
  
    // @ManyToOne(
    //   () => LosDealerSchemeMaster,
    //   (losDealerSchemeMaster) => losDealerSchemeMaster.losApplications,
    //   { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    // )
    // @JoinColumn([{ name: "scheme_id", referencedColumnName: "id" }])
    // scheme: LosDealerSchemeMaster;
  
    @ManyToOne(
      () => LosDealerStore,
      (losDealerStore) => losDealerStore.losApplications,
      { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    )
    @JoinColumn([{ name: "dealer_store_id", referencedColumnName: "id" }])
    dealerStore: LosDealerStore;
  
    // @OneToMany(
    //   () => LosApplicationDetails,
    //   (losApplicationDetails) => losApplicationDetails.application
    // )
    // losApplicationDetails: LosApplicationDetails[];
  
    // @OneToMany(
    //   () => LosApplicationDiscretionaryDp,
    //   (losApplicationDiscretionaryDp) => losApplicationDiscretionaryDp.application
    // )
    // losApplicationDiscretionaryDps: LosApplicationDiscretionaryDp[];
  
    // @OneToMany(
    //   () => LosApplicationMapping,
    //   (losApplicationMapping) => losApplicationMapping.application
    // )
    // losApplicationMappings: LosApplicationMapping[];
  
    // @OneToMany(
    //   () => LosApplicationPreapproved,
    //   (losApplicationPreapproved) => losApplicationPreapproved.application
    // )
    // losApplicationPreapproveds: LosApplicationPreapproved[];
  
    // @OneToMany(
    //   () => LosApplicationPrecloseRequest,
    //   (losApplicationPrecloseRequest) => losApplicationPrecloseRequest.application
    // )
    // losApplicationPrecloseRequests: LosApplicationPrecloseRequest[];
  
    // @OneToMany(
    //   () => LosCoApplicantMapping,
    //   (losCoApplicantMapping) => losCoApplicantMapping.application
    // )
    // losCoApplicantMappings: LosCoApplicantMapping[];
  
    // @OneToMany(
    //   () => LosCrmIntegration,
    //   (losCrmIntegration) => losCrmIntegration.application
    // )
    // losCrmIntegrations: LosCrmIntegration[];
  
    // @OneToMany(
    //   () => LosDealerApplicationStatus,
    //   (losDealerApplicationStatus) => losDealerApplicationStatus.application
    // )
    // losDealerApplicationStatuses: LosDealerApplicationStatus[];
  
    // @OneToMany(() => LosFinbit, (losFinbit) => losFinbit.application)
    // losFinbits: LosFinbit[];
  
    // @OneToMany(
    //   () => LosLmsApplicationMapping,
    //   (losLmsApplicationMapping) => losLmsApplicationMapping.application
    // )
    // losLmsApplicationMappings: LosLmsApplicationMapping[];
  
    @OneToMany(
      () => LosLoanEmiRepaymentSchedule,
      (losLoanEmiRepaymentSchedule) => losLoanEmiRepaymentSchedule.application
    )
    losLoanEmiRepaymentSchedules: LosLoanEmiRepaymentSchedule[];
  
    // @OneToMany(() => LosMandate, (losMandate) => losMandate.loan)
    // losMandates: LosMandate[];
  
    // @OneToMany(
    //   () => LosMifosApplicationMapping,
    //   (losMifosApplicationMapping) => losMifosApplicationMapping.application
    // )
    // losMifosApplicationMappings: LosMifosApplicationMapping[];
  
    // @OneToMany(
    //   () => LosPartDisbursal,
    //   (losPartDisbursal) => losPartDisbursal.application
    // )
    // losPartDisbursals: LosPartDisbursal[];
  
    // @OneToMany(
    //   () => LosScienapticLogs,
    //   (losScienapticLogs) => losScienapticLogs.application
    // )
    // losScienapticLogs: LosScienapticLogs[];
  
    // @OneToMany(
    //   () => LosUploadDocumentLink,
    //   (losUploadDocumentLink) => losUploadDocumentLink.application
    // )
    // losUploadDocumentLinks: LosUploadDocumentLink[];
  
    // @OneToMany(
    //   () => OpsApiDisbursed,
    //   (opsApiDisbursed) => opsApiDisbursed.application
    // )
    // opsApiDisburseds: OpsApiDisbursed[];
  
    // @OneToMany(() => OpsTbdLoans, (opsTbdLoans) => opsTbdLoans.loan)
    // opsTbdLoans: OpsTbdLoans[];
  }
  