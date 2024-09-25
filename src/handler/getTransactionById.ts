import fastify, { FastifyRequest } from "fastify";
const crypto = require('crypto');

async function getTransactionByIdHandler(request:FastifyRequest, reply:FastifyRes) {
    const requestAll = request.body;
    const mid = requestAll.MID;

    // Assuming apiInvestor is some service or class, and you'd inject or require it here.
    const apiInvestor = request.apiInvestor;

    // Check if MID exists
    const checkMid = await apiInvestor.checkMidExists(mid);
    if (!checkMid.status) {
        return reply.code(checkMid.code || 400).send({
            status: checkMid.status,
            message: checkMid.message,
            data: checkMid.data || null
        });
    }

    // Create string to generate checksum
    const string = `${requestAll.RequestId.trim()}||${requestAll.InvestorId.trim()}||${requestAll.Timestamp.trim()}`;

    // Checksum validation (assuming you have a method for this)
    const isChecksumValid = validateChecksum(string, requestAll.Checksum, checkMid.data.key);
    if (!isChecksumValid) {
        return reply.code(400).send({
            status: false,
            message: 'Checksum doesn\'t match',
            data: []
        });
    }

    // Check if the investor is mapped to the IFA
    const investorMapping = await apiInvestor.CheckInvestorIsMappedToIfa(checkMid.data.ifa_id, requestAll.InvestorId);
    if (!investorMapping.status) {
        return reply.code(investorMapping.code || 400).send({
            status: investorMapping.status,
            message: investorMapping.message,
            data: investorMapping.data || null
        });
    }

    // Fetch the transaction by ID
    const responseData = await apiInvestor.getTransactionById(requestAll);
    return reply.code(responseData.code || 200).send({
        status: responseData.status,
        message: responseData.message,
        data: responseData.data
    });
}

// Function to validate the checksum (example implementation)
function validateChecksum(string, providedChecksum, key) {
    const hash = crypto.createHmac('sha256', key)
        .update(string)
        .digest('hex');
    return hash === providedChecksum;
}

module.exports = {
    getTransactionByIdHandler
};
