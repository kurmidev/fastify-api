import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  // import { SysAclAppMaster } from "../draft-models/entities/SysAclAppMaster";
  // import { SysAclUserRoleMaster } from "../draft-models/entities/SysAclUserRoleMaster";
  
  @Index("role_id", ["roleId"], {})
  @Index("user_id", ["userId"], {})
  @Index("app_id", ["appId"], {})
  @Index("idx_reporting_user_id", ["reportingUserId"], {})
  @Index("status_is_deleted-idx", ["status", "isDeleted"], {})
  @Entity("sys_acl_user_role_mapping", { schema: "liquiloans" })
  export class SysAclUserRoleMapping {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;
  
    @Column("int", {
      name: "sys_user_id",
      nullable: true,
      comment: "Save sys_acl_user id as FK",
    })
    sysUserId: number | null;
  
    @Column("int", {
      name: "role_id",
      comment: "Save sys_acl_user_role_master id as FK",
    })
    roleId: number;
  
    @Column("int", {
      name: "user_id",
      nullable: true,
      comment: "Save user id as FK",
    })
    userId: number | null;
  
    @Column("enum", {
      name: "is_default",
      enum: ["Y", "N"],
      default: () => "'N'",
    })
    isDefault: "Y" | "N";
  
    @Column("int", { name: "reporting_user_id", nullable: true })
    reportingUserId: number | null;
  
    @Column("enum", {
      name: "hierarchy_level",
      nullable: true,
      enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
    })
    hierarchyLevel: "L1" | "L2" | "L3" | "L4" | "L5" | "L6" | null;
  
    @Column("int", { name: "app_id", nullable: true })
    appId: number | null;
  
    @Column("enum", {
      name: "sys_user_required",
      nullable: true,
      enum: ["Yes", "No"],
      default: () => "'Yes'",
    })
    sysUserRequired: "Yes" | "No" | null;
  
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
  
    // @ManyToOne(
    //   () => SysAclAppMaster,
    //   (sysAclAppMaster) => sysAclAppMaster.sysAclUserRoleMappings,
    //   { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    // )
    // @JoinColumn([{ name: "app_id", referencedColumnName: "id" }])
    // app: SysAclAppMaster;
  
    // @ManyToOne(
    //   () => SysAclUserRoleMaster,
    //   (sysAclUserRoleMaster) => sysAclUserRoleMaster.sysAclUserRoleMappings,
    //   { onDelete: "RESTRICT", onUpdate: "CASCADE" }
    // )
    // @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
    // role: SysAclUserRoleMaster;
  }