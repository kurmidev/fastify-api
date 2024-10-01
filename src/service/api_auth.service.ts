/*import { Repository } from "typeorm";
import { LosDealerStore } from "../models/entities/los_dealer_store.entity";
import { FastifyInstance } from "fastify";
import {BadRequestException} from "../utils/helper"


export default class ApiAuthService {
  private authMsg: string;
  private accessList: any;
  private userID: string | null;
  private dontLog: boolean;
  private _authData: any;
  private server: FastifyInstance 

  constructor(server:FastifyInstance) {
    this.server = server;
  }

  async processACL(path: string, method: string, mid: string): Promise<boolean> {
    let retVal = false;
    this.userID = null;
    this.authMsg = 'NA';
    this.dontLog = false;

    console.log(path.trim().substring(1),method);
    const response = await this.server.ApiAclListRepo.checkAclExist(path.trim().substring(1),method);
    console.log("ApiAclListRepo=>",response);
    if (response !== null) {
      const authType = response.authType ?? 'NA';
      this.accessList = response.accessList ?? [];
      const inclusivePolicy = (response.policyType ?? 'Inclusion') === 'Inclusion';

      switch (authType) {
        case 'DealerDefault':
          retVal = inclusivePolicy ? await this.dealerDefault(mid) : !(await this.dealerDefault(mid));
          break;
      }
    } else {
      this.authMsg = 'No such request found';
    }

    if (!retVal && this.authMsg === 'NA') {
      this.authMsg = 'Not authorised to make this request';
      this.dontLog = true;
    }

    if (retVal && this.userID === null) {
      retVal = false;
      this.authMsg = 'Invalid user to process';
    }

    return retVal;
  }

  async dealerDefault(mid: string): Promise<boolean> {
    let retVal = false;
    let keyType = 'SID';

    // Logic to get mid from request
    // ...

    if (mid.length) {
      this._authData = await this.server.DealerStoreRepo.StoreSIDWithRoleMapping(mid);
      
      if (this._authData !== false) {
        const dealer_id = this._authData.dealerId;

        console.log("StoreSIDWithRoleMapping",dealer_id,this.accessList);

        if (dealer_id !== null && this.accessList.includes(dealer_id)) {
          retVal = true;
          this.userID = dealer_id;
        }
      } else {
        this.authMsg = `Invalid ${keyType} found!`;
      }
    } else {
      this.authMsg = `No ${keyType} found!`;
    }

    return retVal;
  }

  authorize(path: string, method: string, mid: string): Promise<boolean> {
    return this.processACL(path, method, mid);
  }

  failedAuthorization() {
    const message = this.authMsg !== 'NA' ? this.authMsg : 'Unauthorized access request';
    return message;
  }

  
  public get authData() : any {
    return this._authData;
  }
  
}*/

import { FastifyInstance } from "fastify";
import { BadRequestException } from "../utils/helper";
import { LosDealerStore } from "../models/entities/los_dealer_store.entity";
import { ApiAclList } from "../models/entities/api_acl_list.entity";
import ConfigService from "../utils/config";

// Define a class for handling API authorization
export default class ApiAuthService {
  private authMsg: string;
  private accessList?: number[] = [];
  private userID: string | null;
  private dontLog: boolean;
  private _authData: any;
  private server: FastifyInstance;

  // Initialize the class with the Fastify instance
  constructor(server: FastifyInstance) {
    this.server = server;
    this.authMsg = 'NA';
    this.accessList = [];
    this.userID = null;
    this.dontLog = false;
    this._authData = null;
  }

  // Main function to process Access Control Logic (ACL)
  async processACL(path: string, method: string, mid: string): Promise<boolean> {
    let retVal = false;
    this.userID = null;
    this.authMsg = 'NA';
    this.dontLog = false;

    console.log(path.trim().substring(1), method);

    // Fetch ACL details from the repository
    const response: ApiAclList | null = await this.server.ApiAclListRepo.checkAclExist(path.trim().substring(1), method);
    console.log("ApiAclListRepo=>", response);

    if (response !== null) {
      const authType = response != undefined ? (response.authType ?? 'NA') : 'NA';
      if (response.accessList !== null) {
        this.accessList = response.accessList
      }

      //response!=undefined?(response.accessList ?? []):[];
      const inclusivePolicy = response != undefined ? ((response.policyType ?? 'Inclusion') === 'Inclusion') : 'Inclusion';

      // Handle different authorization types, e.g., 'DealerDefault'
      switch (authType) {
        case 'DealerDefault':
          retVal = inclusivePolicy ? await this.dealerDefault(mid) : !(await this.dealerDefault(mid));
          break;
        default:
          this.authMsg = 'Unsupported authentication type';
          break;
      }
    } else {
      this.authMsg = 'No such request found';
    }

    // Handle unauthorized requests
    if (!retVal && this.authMsg === 'NA') {
      this.authMsg = 'Not authorised to make this request';
      this.dontLog = true;
    }

    // Ensure userID is valid
    if (retVal && this.userID === null) {
      retVal = false;
      this.authMsg = 'Invalid user to process';
    }

    return retVal;
  }

  // Dealer-specific authorization check
  async dealerDefault(mid: string): Promise<boolean> {
    let retVal = false;
    const keyType = 'SID';  // Assuming 'SID' is the key type

    // Ensure `mid` (Merchant ID) is valid
    if (mid.length) {
      //this._authData = await this.server.DealerStoreRepo.StoreSIDWithRoleMapping(mid);
      const configService = ConfigService();
      this._authData = await this.server.db.getRepository(LosDealerStore)
        .createQueryBuilder()  // Use consistent alias for LosDealerStore
        .select([
          'surm.id AS sysUserRoleMappingId',
          'surm.sys_user_id AS sysUserId',
          'LosDealerStore.id AS storeId',
          'LosDealerStore.dealer_id AS dealerId',
          'LosDealerStore.name AS name',
          'LosDealerStore.email AS email',
          'LosDealerStore.contact_number AS contactNumber',
          'LosDealerStore.mid AS mid',
          'LosDealerStore.secret AS secret',
          'los_dealer.captive_flag AS captiveFlag',
          'los_dealer.fldg_flag AS fldgFlag',
        ])
        .innerJoin('los_dealer', 'los_dealer', 'los_dealer.id = LosDealerStore.dealer_id')  // Inner join for 'los_dealer'
        .leftJoin('sys_acl_user_role_mapping', 'surm', 'surm.user_id = LosDealerStore.dealer_id')  // Left join for 'sys_acl_user_role_mapping'
        .where('LosDealerStore.mid= :mid', { mid })  // Use parameter for mid
        .andWhere('surm.status = :status', { status: 'Active' })  // Ensure correct condition
        .andWhere('surm.is_deleted = :isDeleted', { isDeleted: 'False' })  // Condition for deletion flag
        .andWhere('surm.app_id IN (:...appIds)', { appIds: configService.DEALER_DASHBOARD_IDS })  // Use spread for array
        .andWhere('surm.role_id IN (:...roleIds)', { roleIds: configService.DEALER_ROLE_IDS })  // Use spread for array
        .andWhere('LosDealerStore.status = :status', { status: 'Active' })  // Ensure correct status
        .getRawOne();

      console.log('this._authData', this._authData);
      if (this._authData) {
        const dealerId = this._authData.dealerId;

        console.log("StoreSIDWithRoleMapping", dealerId, this.accessList, typeof this.accessList);

        // Check if the dealerId is authorized
        if (dealerId !== null && this.accessList.includes(parseInt(dealerId))) {
          retVal = true;
          this.userID = dealerId;
        }
      } else {
        this.authMsg = `Invalid ${keyType} found!`;
      }
    } else {
      this.authMsg = `No ${keyType} found!`;
    }

    return retVal;
  }

  // Main authorization function that wraps the processACL function
  authorize(path: string, method: string, mid: string): Promise<boolean> {
    return this.processACL(path, method, mid);
  }

  // Function to handle failed authorization
  failedAuthorization(): string {
    return this.authMsg !== 'NA' ? this.authMsg : 'Unauthorized access request';
  }

  // Getter to access the authData
  public get authData(): any {
    return this._authData;
  }
}
