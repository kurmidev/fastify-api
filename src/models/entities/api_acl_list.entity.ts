import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Index("created_by", ["createdBy"], {})
  @Index("updated_by", ["updatedBy"], {})
  
  @Entity({ name: 'api_acl_list' })
  export class ApiAclList {
    @PrimaryGeneratedColumn({
      type: "int",
      name: "id",
      comment: "primary key for the table",
      unsigned: true,
    })
    id: number;
  
    @Column("varchar", { name: "api_path", length: 768 })
    apiPath: string;
  
    @Column("enum", { name: "api_method", enum: ["POST", "GET", "PUT"] })
    apiMethod: string;
  
    @Column("varchar", { name: "api_hash", nullable: true, length: 50 })
    apiHash: string | null;
  
    @Column("enum", { name: "auth_type", enum: ["DealerDefault", "IfaDefault"] })
    authType: "DealerDefault" | "IfaDefault";
  
    @Column("enum", { name: "policy_type", enum: ["Inclusion", "Exclusion"] })
    policyType: "Inclusion" | "Exclusion";
  
    @Column("enum", {
      name: "track_usage",
      enum: ["Yes", "No"],
      default: () => "'No'",
    })
    trackUsage: "Yes" | "No";
  
    @Column("enum", {
      name: "db_access",
      enum: ["Master-Slave", "Master-Master"],
      default: () => "'Master-Slave'",
    })
    dbAccess: "Master-Slave" | "Master-Master";
  
    @Column("json", { name: "access_list" })
    accessList: number[];
  
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
  
    @Column("int", { name: "created_by" })
    createdBy: number;
  
    @Column("int", { name: "updated_by" })
    updatedBy: number;
  
    @Column("datetime", {
      name: "created_at",
      default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;
  
    @Column("datetime", { name: "updated_at" })
    updatedAt: Date;
  }
