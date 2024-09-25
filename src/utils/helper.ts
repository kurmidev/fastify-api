
import * as crypto from "crypto";

const Investorconfig = {
    txnRequestApprovalStatus: {
      'Approved': 'Approved',
      'Rejected': 'Rejected',
      'Pending': 'Pending',
      'Bounced': 'Bounced',
      'Processed': 'Processed',
      'Banking': 'Banking',
      'Executed': 'Executed',
      'Failure': 'Failure',
      'Created': 'Created',
      'Progress': 'Progress'
    }
  }

function validateChecksum(checkSumString: string, requestChecksum: string, secret: string): boolean {
    let checksum: string = hashHmacSha256(checkSumString, secret);
    console.log("requestChecksum",checksum,requestChecksum,secret);
    if (checksum !== requestChecksum) {
      return false;
    }
    return true;
  }
  
  function hashHmacSha256(checksumString: string, secret: string): string {
    const trimmedString = checksumString.trim(); // Trim the string as in PHP
    return crypto.createHmac('sha256', secret)
      .update(trimmedString)
      .digest('hex'); // Output in hexadecimal format
  }
  
  function getTxnStatus(approvalStatus: string, settlementUtr: string, bankingDate: Date, executionDate: Date, authenticatedAt: Date): string {
    let txnStatus = approvalStatus;
  
    const investorConfig = {
      txnRequestApprovalStatus: {
        Approved: 'Approved',
        Bounced: 'Bounced',
        Rejected: 'Rejected',
        Processed: 'Processed',
        Banking: 'Banking',
        Executed: 'Executed',
        Created: 'Created'
      }
    };
  
    if (approvalStatus === investorConfig.txnRequestApprovalStatus.Approved) {
      const bouncedOrRejected = [
        investorConfig.txnRequestApprovalStatus.Bounced.toLowerCase(),
        investorConfig.txnRequestApprovalStatus.Rejected.toLowerCase()
      ];
  
      if (bouncedOrRejected.includes(settlementUtr)) {
        txnStatus = 'Failed';
      } else if (
        settlementUtr !== null &&
        settlementUtr.trim().toLowerCase() !== investorConfig.txnRequestApprovalStatus.Bounced.toLowerCase()
      ) {
        txnStatus = investorConfig.txnRequestApprovalStatus.Processed;
      } else if (bankingDate !== null) {
        txnStatus = investorConfig.txnRequestApprovalStatus.Banking;
      } else if (executionDate !== null) {
        txnStatus = investorConfig.txnRequestApprovalStatus.Executed;
      } else if (authenticatedAt !== null) {
        txnStatus = investorConfig.txnRequestApprovalStatus.Approved;
      } else {
        txnStatus = investorConfig.txnRequestApprovalStatus.Created;
      }
    }
  
    return txnStatus;
  }
  

module.exports = {
    Investorconfig:Investorconfig,
    getTxnStatus,
    validateChecksum
}