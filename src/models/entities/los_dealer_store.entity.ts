import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { LosApplication } from "./los_application.entity";
  // import { LosApplicationPreapproved } from "./LosApplicationPreapproved";
  // import { LosDealerAddress } from "./LosDealerAddress";
  // import { LosDealerDocument } from "./LosDealerDocument";
  // import { LosDealerLeadGenerationMapping } from "./LosDealerLeadGenerationMapping";
  // import { LosDealerRemark } from "./LosDealerRemark";
  // import { LosDealerSchemeMapping } from "./LosDealerSchemeMapping";
  import { LosDealer } from "./los_dealer.entity";
  
  @Index("mid_unique", ["mid"], { unique: true })
  @Index("dealer_id", ["dealerId"], {})
  @Index("created_by", ["createdBy"], {})
  @Index("updated_by", ["updatedBy"], {})
  @Entity("los_dealer_store", { schema: "liquiloans" })
  export class LosDealerStore {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("int", { name: "dealer_id" })
    dealerId: number;
  
    @Column("varchar", { name: "name", length: 100 })
    name: string;
  
    @Column("varchar", { name: "poc_name", nullable: true, length: 100 })
    pocName: string | null;
  
    @Column("varchar", { name: "email", nullable: true, length: 100 })
    email: string | null;
  
    @Column("varchar", { name: "logo_path", nullable: true, length: 256 })
    logoPath: string | null;
  
    @Column("varchar", { name: "contact_number", nullable: true, length: 15 })
    contactNumber: string | null;
  
    @Column("varchar", {
      name: "alternate_contact_number",
      nullable: true,
      length: 192,
    })
    alternateContactNumber: string | null;
  
    @Column("varchar", { name: "pan", nullable: true, length: 256 })
    pan: string | null;
  
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
  
    @Column("int", { name: "sales_agent", nullable: true })
    salesAgent: number | null;
  
    @Column("int", { name: "city_head", nullable: true })
    cityHead: number | null;
  
    @Column("varchar", { name: "mid", nullable: true, unique: true, length: 20 })
    mid: string | null;
  
    @Column("varchar", { name: "secret", nullable: true, length: 20 })
    secret: string | null;
  
    @Column("enum", {
      name: "doc_collect_from",
      nullable: true,
      enum: ["Customer", "", "Dealer", "", "DealerWillCourier"],
    })
    docCollectFrom: "Customer," | "Dealer," | "DealerWillCourier" | null;
  
    @Column("enum", {
      name: "bank_verification_mail",
      nullable: true,
      enum: ["Pending", "Sent"],
      default: () => "'Pending'",
    })
    bankVerificationMail: "Pending" | "Sent" | null;
  
    @Column("enum", {
      name: "gst_verification_status",
      nullable: true,
      enum: ["Verified", "Rejected", "Pending", "Approved"],
    })
    gstVerificationStatus:
      | "Verified"
      | "Rejected"
      | "Pending"
      | "Approved"
      | null;
  
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
  
    @Column("enum", {
      name: "read_only",
      comment: "1 => Yes, 0 => No",
      enum: ["1", "0"],
      default: () => "'0'",
    })
    readOnly: "1" | "0";
  
    @OneToMany(
      () => LosApplication,
      (losApplication) => losApplication.dealerStore
    )
    losApplications: LosApplication[];
  
    // @OneToMany(
    //   () => LosApplicationPreapproved,
    //   (losApplicationPreapproved) => losApplicationPreapproved.dealerStore
    // )
    // losApplicationPreapproveds: LosApplicationPreapproved[];
  
    // @OneToMany(
    //   () => LosDealerAddress,
    //   (losDealerAddress) => losDealerAddress.store
    // )
    // losDealerAddresses: LosDealerAddress[];
  
    // @OneToMany(
    //   () => LosDealerDocument,
    //   (losDealerDocument) => losDealerDocument.store
    // )
    // losDealerDocuments: LosDealerDocument[];
  
    // @OneToMany(
    //   () => LosDealerLeadGenerationMapping,
    //   (losDealerLeadGenerationMapping) =>
    //     losDealerLeadGenerationMapping.dealerStore
    // )
    // losDealerLeadGenerationMappings: LosDealerLeadGenerationMapping[];
  
    // @OneToMany(() => LosDealerRemark, (losDealerRemark) => losDealerRemark.store)
    // losDealerRemarks: LosDealerRemark[];
  
    // @OneToMany(
    //   () => LosDealerSchemeMapping,
    //   (losDealerSchemeMapping) => losDealerSchemeMapping.store
    // )
    // losDealerSchemeMappings: LosDealerSchemeMapping[];
  
    // @ManyToOne(() => LosDealer, (losDealer) => losDealer.losDealerStores, {
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // })
    @JoinColumn([{ name: "dealer_id", referencedColumnName: "id" }])
    dealer: LosDealer;
  }