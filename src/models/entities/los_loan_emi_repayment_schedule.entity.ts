import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { LosApplication } from "./los_application.entity";
  
  @Index("application_id", ["applicationId"], {})
  @Index("created_by", ["createdBy"], {})
  @Index("updated_by", ["updatedBy"], {})
  @Entity("los_loan_emi_repayment_schedule", { schema: "liquiloans" })
  export class LosLoanEmiRepaymentSchedule {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("int", { name: "application_id" })
    applicationId: number;
  
    @Column("int", { name: "installment_number" })
    installmentNumber: number;
  
    @Column("date", { name: "due_date" })
    dueDate: string;
  
    @Column("float", { name: "principal_amount", precision: 12, scale: 4 })
    principalAmount: number;
  
    @Column("float", { name: "interest_amount", precision: 12, scale: 4 })
    interestAmount: number;
  
    @Column("float", { name: "due_amount", precision: 12, scale: 4 })
    dueAmount: number;
  
    @Column("double", { name: "lpi", nullable: true, precision: 12, scale: 4 })
    lpi: number | null;
  
    @Column("double", {
      name: "other_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    otherCharges: number | null;
  
    @Column("double", {
      name: "bounce_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bounceCharges: number | null;
  
    @Column("double", {
      name: "waived_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    waivedCharges: number | null;
  
    @Column("float", { name: "principal_outstanding", precision: 12, scale: 4 })
    principalOutstanding: number;
  
    @Column("enum", {
      name: "payment_status",
      nullable: true,
      enum: ["Paid", "Unpaid", "PartiallyPaid", "NormalClosure", "PreClosure"],
    })
    paymentStatus:
      | "Paid"
      | "Unpaid"
      | "PartiallyPaid"
      | "NormalClosure"
      | "PreClosure"
      | null;
  
    @Column("date", { name: "received_date", nullable: true })
    receivedDate: string | null;
  
    @Column("float", {
      name: "received_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    receivedAmount: number | null;
  
    @Column("float", {
      name: "paid_emi_principal",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    paidEmiPrincipal: number | null;
  
    @Column("float", {
      name: "paid_emi_interest",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    paidEmiInterest: number | null;
  
    @Column("float", {
      name: "paid_lpi",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    paidLpi: number | null;
  
    @Column("float", {
      name: "paid_other_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    paidOtherCharges: number | null;
  
    @Column("float", {
      name: "paid_bounce_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    paidBounceCharges: number | null;
  
    @Column("float", {
      name: "post_payment_principal_outstanding",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    postPaymentPrincipalOutstanding: number | null;
  
    @Column("float", {
      name: "post_payment_interest_outstanding",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    postPaymentInterestOutstanding: number | null;
  
    @Column("datetime", { name: "last_updated_at", nullable: true })
    lastUpdatedAt: Date | null;
  
    @Column("enum", {
      name: "b_payment_status",
      nullable: true,
      enum: ["Paid", "Unpaid", "PartiallyPaid", "NormalClosure", "PreClosure"],
    })
    bPaymentStatus:
      | "Paid"
      | "Unpaid"
      | "PartiallyPaid"
      | "NormalClosure"
      | "PreClosure"
      | null;
  
    @Column("date", { name: "b_received_date", nullable: true })
    bReceivedDate: string | null;
  
    @Column("float", {
      name: "b_received_amount",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bReceivedAmount: number | null;
  
    @Column("float", {
      name: "b_paid_emi_principal",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPaidEmiPrincipal: number | null;
  
    @Column("float", {
      name: "b_paid_emi_interest",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPaidEmiInterest: number | null;
  
    @Column("float", {
      name: "b_paid_lpi",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPaidLpi: number | null;
  
    @Column("float", {
      name: "b_paid_other_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPaidOtherCharges: number | null;
  
    @Column("float", {
      name: "b_paid_bounce_charges",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPaidBounceCharges: number | null;
  
    @Column("float", {
      name: "b_post_payment_principal_outstanding",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPostPaymentPrincipalOutstanding: number | null;
  
    @Column("float", {
      name: "b_post_payment_interest_outstanding",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPostPaymentInterestOutstanding: number | null;
  
    @Column("double", {
      name: "b_post_payment_charges_outstanding",
      nullable: true,
      precision: 12,
      scale: 4,
    })
    bPostPaymentChargesOutstanding: number | null;
  
    @Column("datetime", { name: "b_last_updated_at", nullable: true })
    bLastUpdatedAt: Date | null;
  
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
  
    @ManyToOne(
      () => LosApplication,
      (losApplication) => losApplication.losLoanEmiRepaymentSchedules,
      { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
    )
    @JoinColumn([{ name: "application_id", referencedColumnName: "id" }])
    application: LosApplication;
  }