const awsLambdaFastify = require('@fastify/aws-lambda')
const init = require('./index');

const proxy = awsLambdaFastify(init())
// or
// const proxy = awsLambdaFastify(init(), { binaryMimeTypes: ['application/octet-stream'] })

exports.handler = proxy;