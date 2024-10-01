import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import ApiAuthService from '../service/api_auth.service';
import { ChecksumService } from '../service/checksum';

// Define the plugin using fastify-plugin
const requestLoggerPlugin = fp(async function (fastify: FastifyInstance, opts: any) {

    // Function to check if the V4 checksum is verified
    const checkIfV4ChecksumVerified = (requestData: any, secret: string): boolean => {
        // Implement your V4 checksum verification logic here
        return false;
    };

    // Function for custom checksum match
    const customChecksumMatch = (requestData: any, secret: string, appendKey: boolean): boolean => {
        // Implement your custom checksum match logic here
        return false;
    };

    // Middleware using preHandler hook with access to Fastify instance via 'this'
    fastify.addHook("preHandler", async function (request: FastifyRequest, reply: FastifyReply) {

        // Extract method, body, and query from the request
        const { method, body, query } = request;
        let sid: string = "";
        
        // Determine whether the request is a GET or POST
        if (method === "GET") {
            sid = (query as any).SID || (query as any).sid;
        } else if (method === "POST") {
            sid = (body as any).SID || (body as any).sid;
        }

        // Get the route URL
        const url: string = request.routerPath || request.url;

        // Authorize the request using ApiAuthService
        const acl = new ApiAuthService(fastify);
        const isAuthorized = await acl.authorize(url, method, sid);

        // Log authorization
        console.log("isAuthorized ===>", isAuthorized, method, sid, url);

        // Handle unauthorized requests
        if (!isAuthorized) {
            return reply.status(403).send({
                status: false,
                message: "Unauthorized access request",
                data: {},
                code: 400,
                checksum: null
            });
        }

        const checkMid = acl.authData;
        const checksumService = new ChecksumService();
        let checksumString:string = "";

        // Get checksum from body or query
        if (method === "POST") {
            checksumString = (body as any).Checksum.trim() || (body as any).checksum.trim();
        } else {
            checksumString = (query as any).Checksum.trim() || (query as any).checksum.trim();
        }

        let checksumCheck:boolean | string = false;
        const requestData = method === "POST" ? body : query;
        
        // Check if checksum exists
        if (checksumString) {
            const version = url.split('/')[2].toLowerCase();

            // Check if version is v4 and perform checksum verification
            if (version === 'v4') {
                checksumCheck = checkIfV4ChecksumVerified(requestData, checkMid.secret);
                if (!checksumCheck) {
                    checksumCheck = checksumService.buildChecksumRecursiveV4(requestData  as Record<string, any>, checkMid.secret, true);
                    if (!checksumCheck) {
                        checksumCheck = checksumService.buildChecksumRecursiveV4(requestData  as Record<string, any>, checkMid.secret);
                    }
                }
            } else {
                // For non-v4 versions, use the custom checksum match
                checksumCheck = customChecksumMatch(requestData, checkMid.secret, true);
                if (!checksumCheck) {
                    checksumCheck = checksumService.buildChecksumRecursive(requestData  as Record<string, any>, checkMid.secret, true);
                }
            }

            // Final fallback for checksum verification
            if (!checksumCheck) {

                checksumCheck = checksumService.buildChecksumRecursive(requestData as Record<string, any>, checkMid.secret);//+
                if (!checksumCheck) {
                    checksumCheck = checksumService.simpleChecksumVerification(requestData  as Record<string, any>, checksumString, checkMid.secret);
                }
            }

            // Handle checksum verification results
            if (checksumCheck) {
                const apiSource = url.split('/')[1] === 'apiintegration' ? 'apiintegration' : 'credit-line';
                
                // Attach authData and api-source to the request body or query
                if (method === "POST") {
                    (request.body as any).authData = checkMid;
                    (request.body as any)["api-source"] = apiSource;
                } else {
                    (request.query as any).authData = checkMid;
                    (request.query as any)["api-source"] = apiSource;
                }

                // Mark V4 checksum as verified
                if (version === 'v4') {
                    request.headers['CHECKSUM_VERIFIED_V4'] = 'true';
                }
            } else {
                return reply.status(403).send({
                    status: false,
                    message: "Checksum Mismatch!",
                    data: {},
                    code: 400,
                    checksum: null
                });
            }
        }

        // Log the request method, URL, and Fastify instance
        console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
        console.log(`Fastify instance:`, url, method, body, sid);
    });
});

// Export the plugin
export default requestLoggerPlugin;
