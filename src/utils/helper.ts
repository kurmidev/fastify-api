
/*import * as crypto from "crypto";
import { FastifyReply } from "fastify";

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
  console.log("requestChecksum", checksum, requestChecksum, secret);
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


export const BadRequestException = (message: string, reply: FastifyReply) => {
  return reply.code(422).send({
    "status": false,
    "message": message,
    data: {},
    code: 422,
    checksum: null
  });
}

module.exports = {
  getTxnStatus,
  validateChecksum,
  
}
*/

import * as crypto from "crypto";
import { FastifyReply } from "fastify";

// Configuration object with appropriate typing
interface InvestorConfig {
  txnRequestApprovalStatus: {
    Approved: string;
    Rejected: string;
    Pending: string;
    Bounced: string;
    Processed: string;
    Banking: string;
    Executed: string;
    Failure: string;
    Created: string;
    Progress: string;
  };
}

const InvestorConfig: InvestorConfig = {
  txnRequestApprovalStatus: {
    Approved: 'Approved',
    Rejected: 'Rejected',
    Pending: 'Pending',
    Bounced: 'Bounced',
    Processed: 'Processed',
    Banking: 'Banking',
    Executed: 'Executed',
    Failure: 'Failure',
    Created: 'Created',
    Progress: 'Progress'
  }
};

// Function to validate the checksum with proper typing
export function validateChecksum(checkSumString: string, requestChecksum: string, secret: string): boolean {
  const checksum: string = hashHmacSha256(checkSumString, secret);
  console.log("requestChecksum", checksum, requestChecksum, secret);
  
  // Return comparison directly
  return checksum === requestChecksum;
}

// Function to create HMAC SHA256 hash with proper typing
function hashHmacSha256(checksumString: string, secret: string): string {
  const trimmedString = checksumString.trim();
  return crypto.createHmac('sha256', secret)
    .update(trimmedString)
    .digest('hex'); // Output in hexadecimal format
}

// Function to get the transaction status with proper typing
export function getTxnStatus(
  approvalStatus: string,
  settlementUtr: string | null,
  bankingDate: Date | null,
  executionDate: Date | null,
  authenticatedAt: Date | null
): string {
  let txnStatus: string = approvalStatus;

  interface TxnRequestApprovalStatus {
    Approved: string;
    Bounced: string;
    Rejected: string;
    Processed: string;
    Banking: string;
    Executed: string;
    Created: string;
  }
  
  // Define the InvestorConfig interface
  interface InvestorConfig {
    txnRequestApprovalStatus: TxnRequestApprovalStatus;
  }

  const investorConfig: InvestorConfig = {
    txnRequestApprovalStatus:{
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

    if (bouncedOrRejected.includes(settlementUtr?.toLowerCase() || '')) {
      txnStatus = 'Failed';
    } else if (
      settlementUtr &&
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

// Function to handle bad requests with proper typing
export function BadRequestException(message: string, reply: FastifyReply) {
  return reply.code(422).send({
    status: false,
    message: message,
    data: {},
    code: 422,
    checksum: null
  });
}

export default {
  getTxnStatus,
  validateChecksum,
  BadRequestException
};
