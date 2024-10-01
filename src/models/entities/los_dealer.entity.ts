import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  // import { DisbursalSettlementMaster } from "./DisbursalSettlementMaster";
  // import { LocApplicantCreditLimit } from "./LocApplicantCreditLimit";
  // import { LocApprovalDealerGroupMapping } from "./LocApprovalDealerGroupMapping";
  // import { LosApplicationDealerWebhook } from "./LosApplicationDealerWebhook";
  // import { LosCategoryMaster } from "./LosCategoryMaster";
  // import { LosDealerAddress } from "./LosDealerAddress";
  // import { LosDealerDocument } from "./LosDealerDocument";
  // import { LosDealerLeadGenerationMapping } from "./LosDealerLeadGenerationMapping";
  // import { LosDealerRemark } from "./LosDealerRemark";
  // import { LosDealerSchemeMapping } from "./LosDealerSchemeMapping";
  // import { LosDealerSettings } from "./LosDealerSettings";
  // import { LosDealerStore } from "./los_dealer_store";
  // import { LosLmsDealerLedgerMapping } from "./LosLmsDealerLedgerMapping";
  // import { LosLmsDealerMapping } from "./LosLmsDealerMapping";
  // import { LosLoanDrafts } from "./LosLoanDrafts";
  // import { OpsApiDisbursed } from "./OpsApiDisbursed";
  // import { PreApprovedDealerUser } from "./PreApprovedDealerUser";
  
  @Index("category_id", ["categoryId"], {})
  @Index("created_by", ["createdBy"], {})
  @Index("updated_by", ["updatedBy"], {})
  @Index("captive_flag", ["captiveFlag"], {})
  @Entity("los_dealer", { schema: "liquiloans" })
  export class LosDealer {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("varchar", { name: "code", nullable: true, length: 20 })
    code: string | null;
  
    @Column("varchar", { name: "name", length: 100 })
    name: string;
  
    @Column("varchar", { name: "dealer_legal_name", nullable: true, length: 100 })
    dealerLegalName: string | null;
  
    @Column("enum", {
      name: "dealer_type",
      enum: ["Dealer", "Dsa", "OnlinePartner"],
      default: () => "'Dealer'",
    })
    dealerType: "Dealer" | "Dsa" | "OnlinePartner";
  
    @Column("varchar", { name: "contact_number", length: 15 })
    contactNumber: string;
  
    @Column("varchar", { name: "email", nullable: true, length: 100 })
    email: string | null;
  
    @Column("varchar", { name: "pan", nullable: true, length: 256 })
    pan: string | null;
  
    @Column("varchar", { name: "pan_md5", nullable: true, length: 32 })
    panMd5: string | null;
  
    @Column("varchar", { name: "name_on_pan", nullable: true, length: 100 })
    nameOnPan: string | null;
  
    @Column("enum", {
      name: "name_on_pan_fetched_by",
      nullable: true,
      enum: ["Api", "Manual"],
    })
    nameOnPanFetchedBy: "Api" | "Manual" | null;
  
    @Column("varchar", { name: "gst_number", nullable: true, length: 20 })
    gstNumber: string | null;
  
    @Column("int", { name: "category_id", nullable: true })
    categoryId: number | null;
  
    @Column("enum", {
      name: "is_gst_applicable",
      nullable: true,
      enum: ["True", "False"],
    })
    isGstApplicable: "True" | "False" | null;
  
    @Column("varchar", { name: "logo_path", nullable: true, length: 256 })
    logoPath: string | null;
  
    @Column("varchar", { name: "referral_code", nullable: true, length: 10 })
    referralCode: string | null;
  
    @Column("varchar", { name: "unique_url_key", nullable: true, length: 256 })
    uniqueUrlKey: string | null;
  
    @Column("enum", {
      name: "approval_status",
      enum: ["Pending", "Approved", "Rejected"],
      default: () => "'Pending'",
    })
    approvalStatus: "Pending" | "Approved" | "Rejected";
  
    @Column("enum", {
      name: "part_disbursement",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    partDisbursement: "Yes" | "No";
  
    @Column("enum", {
      name: "send_disbursement_mail",
      enum: ["Yes", "No"],
      default: () => "'Yes'",
    })
    sendDisbursementMail: "Yes" | "No";
  
    @Column("enum", {
      name: "doc_collect_from",
      nullable: true,
      enum: [
        "Customer",
        "Dealer-Courier",
        "DealerWillCourier",
        "Agency-Dealer",
        "Agency-Customer",
        "Sales",
      ],
    })
    docCollectFrom:
      | "Customer"
      | "Dealer-Courier"
      | "DealerWillCourier"
      | "Agency-Dealer"
      | "Agency-Customer"
      | "Sales"
      | null;
  
    @Column("enum", {
      name: "bank_verification_mail",
      nullable: true,
      enum: ["Pending", "Sent"],
      default: () => "'Pending'",
    })
    bankVerificationMail: "Pending" | "Sent" | null;
  
    @Column("enum", {
      name: "mail_type",
      nullable: true,
      enum: ["No", "Yes"],
      default: () => "'No'",
    })
    mailType: "No" | "Yes" | null;
  
    @Column("enum", {
      name: "captive_flag",
      nullable: true,
      enum: ["Captive", "NonCaptive"],
    })
    captiveFlag: "Captive" | "NonCaptive" | null;
  
    @Column("enum", {
      name: "disbursement_flag",
      nullable: true,
      enum: ["Dealer", "Customer", "Others"],
    })
    disbursementFlag: "Dealer" | "Customer" | "Others" | null;
  
    @Column("enum", {
      name: "disbursement_to",
      nullable: true,
      enum: ["Dealer", "Customer", "Others"],
    })
    disbursementTo: "Dealer" | "Customer" | "Others" | null;
  
    @Column("enum", {
      name: "fldg_flag",
      nullable: true,
      enum: ["Fldg", "NonFldg", "both"],
    })
    fldgFlag: "Fldg" | "NonFldg" | "both" | null;
  
    @Column("enum", {
      name: "fldg_type",
      nullable: true,
      enum: ["cash", "percentage"],
    })
    fldgType: "cash" | "percentage" | null;
  
    @Column("enum", {
      name: "inv_category",
      nullable: true,
      enum: ["A", "B", "C", "D", "E"],
    })
    invCategory: "A" | "B" | "C" | "D" | "E" | null;
  
    @Column("int", { name: "dealer_grade", nullable: true })
    dealerGrade: number | null;
  
    @Column("enum", {
      name: "discretionary_dp_flag",
      nullable: true,
      enum: ["True", "False"],
    })
    discretionaryDpFlag: "True" | "False" | null;
  
    @Column("enum", {
      name: "document_verification_flag",
      nullable: true,
      enum: ["True", "False"],
    })
    documentVerificationFlag: "True" | "False" | null;
  
    @Column("enum", {
      name: "cancellation_call_flag",
      nullable: true,
      enum: ["True", "False"],
    })
    cancellationCallFlag: "True" | "False" | null;
  
    @Column("enum", {
      name: "moratorium_flag",
      nullable: true,
      enum: ["True", "False"],
    })
    moratoriumFlag: "True" | "False" | null;
  
    @Column("enum", {
      name: "emandate_flag",
      nullable: true,
      enum: ["True", "False"],
    })
    emandateFlag: "True" | "False" | null;
  
    @Column("enum", { name: "pdc_flag", nullable: true, enum: ["True", "False"] })
    pdcFlag: "True" | "False" | null;
  
    @Column("enum", {
      name: "lms_sms_flag",
      nullable: true,
      enum: ["True", "False"],
    })
    lmsSmsFlag: "True" | "False" | null;
  
    @Column("enum", {
      name: "irr_category",
      nullable: true,
      enum: ["1", "2", "3", "4", "5", "6"],
      default: () => "'1'",
    })
    irrCategory: "1" | "2" | "3" | "4" | "5" | "6" | null;
  
    @Column("enum", {
      name: "auto_assign",
      nullable: true,
      enum: ["True", "False"],
      default: () => "'False'",
    })
    autoAssign: "True" | "False" | null;
  
    @Column("enum", {
      name: "nach_amount",
      nullable: true,
      enum: ["emi_amount", "loan_amount"],
      default: () => "'loan_amount'",
    })
    nachAmount: "emi_amount" | "loan_amount" | null;
  
    @Column("enum", {
      name: "downpayment_type",
      nullable: true,
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    downpaymentType: "Yes" | "No" | null;
  
    @Column("enum", {
      name: "dealer_creation_status",
      nullable: true,
      enum: [
        "sales_created",
        "sales_approved",
        "credit_created",
        "credit_approved",
        "ops_created",
        "ops_approved",
        "final_approved",
        "sales_rejected",
      ],
    })
    dealerCreationStatus:
      | "sales_created"
      | "sales_approved"
      | "credit_created"
      | "credit_approved"
      | "ops_created"
      | "ops_approved"
      | "final_approved"
      | "sales_rejected"
      | null;
  
    @Column("varchar", { name: "nbfc_tieup_name", nullable: true, length: 100 })
    nbfcTieupName: string | null;
  
    @Column("enum", { name: "hold_status", nullable: true, enum: ["Yes", "No"] })
    holdStatus: "Yes" | "No" | null;
  
    @Column("json", { name: "hold_status_metadata", nullable: true })
    holdStatusMetadata: object | null;
  
    @Column("enum", {
      name: "model_type",
      nullable: true,
      enum: ["Central", "Franchise"],
    })
    modelType: "Central" | "Franchise" | null;
  
    @Column("enum", {
      name: "autobanking_upload",
      nullable: true,
      enum: ["Yes", "No"],
    })
    autobankingUpload: "Yes" | "No" | null;
  
    @Column("enum", {
      name: "repayment_mode",
      nullable: true,
      enum: [
        "all_pdc_or_enach",
        "nach_or_enach",
        "epdc_+_nach_or_enach",
        "spdc_+_epdc_+_nach_or_enach",
      ],
    })
    repaymentMode:
      | "all_pdc_or_enach"
      | "nach_or_enach"
      | "epdc_+_nach_or_enach"
      | "spdc_+_epdc_+_nach_or_enach"
      | null;
  
    @Column("text", { name: "amount_from_cust", nullable: true })
    amountFromCust: string | null;
  
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
  
    @Column("timestamp", { name: "approved_at", nullable: true })
    approvedAt: Date | null;
  
    @Column("json", {
      name: "mandate_mode",
      nullable: true,
      comment: "Will contain mandate_modes as [EMANDATE,NACH,UPI]",
    })
    mandateMode: object | null;
  
    @Column("varchar", { name: "api_disbursement", nullable: true, length: 191 })
    apiDisbursement: string | null;
  
    @Column("enum", {
      name: "invoice_waiver",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    invoiceWaiver: "Yes" | "No";
  
    @Column("enum", {
      name: "send_Automated_Invoice",
      enum: ["Yes", "No"],
      default: () => "'Yes'",
    })
    sendAutomatedInvoice: "Yes" | "No";
  
    @Column("int", { name: "cutoff_emi_date" })
    cutoffEmiDate: number;
  
    @Column("enum", {
      name: "set_mandate_amount_max",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    setMandateAmountMax: "Yes" | "No";
  
    @Column("enum", {
      name: "read_only",
      comment: "1 => Yes, 0 => No",
      enum: ["1", "0"],
      default: () => "'0'",
    })
    readOnly: "1" | "0";
  
    @Column("tinyint", {
      name: "default_tranche_consent",
      comment: "1 => yes and 0 => No",
      default: () => "'0'",
    })
    defaultTrancheConsent: number;
  
    @Column("tinyint", {
      name: "email_required",
      nullable: true,
      comment: "1=Yes, 0=No",
      default: () => "'1'",
    })
    emailRequired: number | null;
  
    @Column("varchar", {
      name: "bureau_configuration",
      nullable: true,
      length: 255,
    })
    bureauConfiguration: string | null;
  
    @Column("json", {
      name: "display_store_name",
      nullable: true,
      comment:
        "[2=>Email Communication,1=>Borrower Dashboard, 3=> Loan Agreement]",
    })
    displayStoreName: object | null;
  
    @Column("tinyint", {
      name: "agr_otp_notification_sms",
      width: 1,
      default: () => "'1'",
    })
    agrOtpNotificationSms: boolean;
  
    @Column("tinyint", {
      name: "agr_otp_notification_email",
      width: 1,
      default: () => "'1'",
    })
    agrOtpNotificationEmail: boolean;
  
    @Column("enum", {
      name: "dealer_tbd_flag",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    dealerTbdFlag: "Yes" | "No";
  
    @Column("json", { name: "rejection_classification", nullable: true })
    rejectionClassification: object | null;
  
    @Column("tinyint", {
      name: "emi_auto_debit",
      nullable: true,
      comment: "Auto schedule & debit EMI through NACH",
      width: 1,
      default: () => "'0'",
    })
    emiAutoDebit: boolean | null;
  
    @Column("tinyint", {
      name: "email_communications",
      comment:
        "If true then store name will display instead of dealer name in all email communications",
      width: 1,
      default: () => "'0'",
    })
    emailCommunications: boolean;
  
    @Column("tinyint", {
      name: "borrower_dashboard",
      comment: "If true then store name will display in borrower dashboard",
      width: 1,
      default: () => "'0'",
    })
    borrowerDashboard: boolean;
  
    @Column("tinyint", {
      name: "loan_agreement",
      comment:
        "If true then store name will display instead of dealer name in all loan agreements",
      width: 1,
      default: () => "'0'",
    })
    loanAgreement: boolean;
  
    @Column("tinyint", {
      name: "agr_otp_notification_official_email",
      width: 1,
      default: () => "'1'",
    })
    agrOtpNotificationOfficialEmail: boolean;
  
    @Column("tinyint", {
      name: "share_rejetion_reasons_api_webooks",
      width: 1,
      default: () => "'0'",
    })
    shareRejetionReasonsApiWebooks: boolean;
  
    @Column("tinyint", {
      name: "share_rejetion_reasons_dealer_dashboard",
      width: 1,
      default: () => "'1'",
    })
    shareRejetionReasonsDealerDashboard: boolean;
  
    // @OneToMany(
    //   () => DisbursalSettlementMaster,
    //   (disbursalSettlementMaster) => disbursalSettlementMaster.dealer
    // )
    // disbursalSettlementMasters: DisbursalSettlementMaster[];
  
    // @OneToMany(
    //   () => LocApplicantCreditLimit,
    //   (locApplicantCreditLimit) => locApplicantCreditLimit.oDealer
    // )
    // locApplicantCreditLimits: LocApplicantCreditLimit[];
  
    // @OneToMany(
    //   () => LocApprovalDealerGroupMapping,
    //   (locApprovalDealerGroupMapping) => locApprovalDealerGroupMapping.dealer
    // )
    // locApprovalDealerGroupMappings: LocApprovalDealerGroupMapping[];
  
    // @OneToMany(
    //   () => LosApplicationDealerWebhook,
    //   (losApplicationDealerWebhook) => losApplicationDealerWebhook.dealer
    // )
    // losApplicationDealerWebhooks: LosApplicationDealerWebhook[];
  
    // @ManyToOne(
    //   () => LosCategoryMaster,
    //   (losCategoryMaster) => losCategoryMaster.losDealers,
    //   { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    // )
    // @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
    // category: LosCategoryMaster;
  
    // @OneToMany(
    //   () => LosDealerAddress,
    //   (losDealerAddress) => losDealerAddress.dealer
    // )
    // losDealerAddresses: LosDealerAddress[];
  
    // @OneToMany(
    //   () => LosDealerDocument,
    //   (losDealerDocument) => losDealerDocument.dealer
    // )
    // losDealerDocuments: LosDealerDocument[];
  
    // @OneToMany(
    //   () => LosDealerLeadGenerationMapping,
    //   (losDealerLeadGenerationMapping) => losDealerLeadGenerationMapping.dealer
    // )
    // losDealerLeadGenerationMappings: LosDealerLeadGenerationMapping[];
  
    // @OneToMany(() => LosDealerRemark, (losDealerRemark) => losDealerRemark.dealer)
    // losDealerRemarks: LosDealerRemark[];
  
    // @OneToMany(
    //   () => LosDealerSchemeMapping,
    //   (losDealerSchemeMapping) => losDealerSchemeMapping.dealer
    // )
    // losDealerSchemeMappings: LosDealerSchemeMapping[];
  
    // @OneToMany(
    //   () => LosDealerSettings,
    //   (losDealerSettings) => losDealerSettings.dealer
    // )
    // losDealerSettings: LosDealerSettings[];
  
    // @OneToMany(() => LosDealerStore, (losDealerStore) => losDealerStore.dealer)
    // losDealerStores: LosDealerStore[];
  
    // @OneToMany(
    //   () => LosLmsDealerLedgerMapping,
    //   (losLmsDealerLedgerMapping) => losLmsDealerLedgerMapping.dealer
    // )
    // losLmsDealerLedgerMappings: LosLmsDealerLedgerMapping[];
  
    // @OneToMany(
    //   () => LosLmsDealerMapping,
    //   (losLmsDealerMapping) => losLmsDealerMapping.dealer
    // )
    // losLmsDealerMappings: LosLmsDealerMapping[];
  
    // @OneToMany(() => LosLoanDrafts, (losLoanDrafts) => losLoanDrafts.dealer2)
    // losLoanDrafts: LosLoanDrafts[];
  
    // @OneToMany(() => OpsApiDisbursed, (opsApiDisbursed) => opsApiDisbursed.dealer)
    // opsApiDisburseds: OpsApiDisbursed[];
  
    // @OneToMany(
    //   () => PreApprovedDealerUser,
    //   (preApprovedDealerUser) => preApprovedDealerUser.dealer
    // )
    // preApprovedDealerUsers: PreApprovedDealerUser[];
  }