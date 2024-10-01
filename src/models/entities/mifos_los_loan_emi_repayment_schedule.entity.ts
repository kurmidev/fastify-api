import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("application_id", ["applicationId"], {})
@Index("status", ["status"], {})
@Index("is_deleted", ["isDeleted"], {})
@Index("due_date_idx", ["dueDate"], {})
@Entity("mifos_los_loan_emi_repayment_schedule", { schema: "liquiloans" })
export class MifosLosLoanEmiRepaymentSchedule {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "application_id" })
  applicationId: number;

  @Column("int", { name: "installment_number" })
  installmentNumber: number;

  @Column("date", { name: "due_date" })
  dueDate: string;

  @Column("double", { name: "principal_amount", precision: 12, scale: 4 })
  principalAmount: number;

  @Column("double", { name: "interest_amount", precision: 12, scale: 4 })
  interestAmount: number;

  @Column("double", { name: "due_amount", precision: 12, scale: 4 })
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

  @Column("double", { name: "principal_outstanding", precision: 12, scale: 4 })
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

  @Column("double", {
    name: "received_amount",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  receivedAmount: number | null;

  @Column("double", {
    name: "paid_emi_principal",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  paidEmiPrincipal: number | null;

  @Column("double", {
    name: "paid_lpi",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  paidLpi: number | null;

  @Column("double", {
    name: "paid_other_charges",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  paidOtherCharges: number | null;

  @Column("double", {
    name: "paid_bounce_charges",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  paidBounceCharges: number | null;

  @Column("double", {
    name: "paid_emi_interest",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  paidEmiInterest: number | null;

  @Column("double", {
    name: "post_payment_principal_outstanding",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  postPaymentPrincipalOutstanding: number | null;

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

  @Column("double", {
    name: "b_received_amount",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bReceivedAmount: number | null;

  @Column("double", {
    name: "b_paid_emi_principal",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bPaidEmiPrincipal: number | null;

  @Column("double", {
    name: "b_paid_emi_interest",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bPaidEmiInterest: number | null;

  @Column("double", {
    name: "b_paid_lpi",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bPaidLpi: number | null;

  @Column("double", {
    name: "b_paid_other_charges",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bPaidOtherCharges: number | null;

  @Column("double", {
    name: "b_paid_bounce_charges",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bPaidBounceCharges: number | null;

  @Column("double", {
    name: "b_post_payment_principal_outstanding",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  bPostPaymentPrincipalOutstanding: number | null;

  @Column("double", {
    name: "post_payment_interest_outstanding",
    nullable: true,
    precision: 12,
    scale: 4,
  })
  postPaymentInterestOutstanding: number | null;

  @Column("double", {
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
}