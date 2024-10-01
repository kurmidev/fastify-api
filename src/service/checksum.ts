import * as crypto from 'crypto';
import ConfigService from './../utils/config'


export class ChecksumService {
    //   private readonly logger = new Logger(ChecksumService.name);
    private key: string;
    private configService:any;

    constructor() {
        this.configService =  ConfigService();
        this.setKey();
    }

    setKey(key: string = 'NA'): boolean {
        if (key === 'NA') {
            const key = process.env.GLOBAL_API_KEY;
            if (!key) {
                throw new Error('GLOBAL_API_KEY is not set!');
            }
        }
        this.key = key;
        return true;
    }

    buildChecksumString(request: Record<string, any>): string {
        let newRequest = { ...request };
        if ('checksum' in newRequest) {
            delete newRequest['checksum'];
        }
        if ('Checksum' in newRequest) {
            delete newRequest['Checksum'];
        }

        const isReact = this.cleanStr(newRequest['is_react'] || '');

        const sortedKeys = Object.keys(newRequest).sort();
        let checksumString = '';

        for (const key of sortedKeys) {
            const item = newRequest[key];
            if (Array.isArray(item)) {
                if (!(isReact && isReact === 'Yes')) {
                    checksumString += JSON.stringify(item) + '|';
                }
            } else {
                let addItem = true;
                if (isReact && isReact === 'Yes') {
                    const cleanedItem = this.cleanStr(item);
                    if (!cleanedItem) {
                        addItem = false;
                    }
                }
                if (addItem) {
                    checksumString += item + '|';
                }
            }
        }

        // this.logger.log(`Checksum String: ${checksumString}`);
        // console.log(`Checksum String: ${checksumString}`);
        return checksumString + this.key;
    }

    generateChecksum(checksumString: string): string {
        return crypto.createHmac('sha256', this.key).update(checksumString).digest('hex');
    }

    validateChecksum(liquiloansChecksum: string, passedChecksum: string): boolean {
        return liquiloansChecksum === passedChecksum;
    }

    validateApiChecksum(request: Record<string, any>, key: string = 'NA'): boolean {
        let apiChecksum = '';

        if ('checksum' in request) {
            apiChecksum = request['checksum'];
        }
        if ('Checksum' in request) {
            apiChecksum = request['Checksum'];
        }

        if (apiChecksum) {
            if (key !== 'NA') {
                this.setKey(key);
            }

            const checksumString = this.buildChecksumString(request);
            const liquiloansChecksum = this.generateChecksum(checksumString);

            return this.validateChecksum(liquiloansChecksum, apiChecksum);
        } else {
            return false;
        }
    }

    buildApiChecksum(request: Record<string, any>): string {
        const checksumString = this.buildChecksumString(request);
        return this.generateChecksum(checksumString);
    }

    buildChecksumRecursive(
        requestArr: Record<string, any>,
        key: string,
        appendKey: boolean = false,
        returnChecksumInsteadValidate: boolean = false,
    ): boolean | string {
        let newRequestArr = { ...requestArr };
        let checksum = '';
        if ('checksum' in newRequestArr) {
            checksum = newRequestArr['checksum'];
            delete newRequestArr['checksum'];
        }
        if ('Checksum' in newRequestArr) {
            checksum = newRequestArr['Checksum'];
            delete newRequestArr['Checksum'];
        }

        for (let i = 1; i <= 10; i++) {
            delete newRequestArr[`UDF${i}`];
            delete newRequestArr[`udf${i}`];
        }

        delete newRequestArr['OKycXML'];
        delete newRequestArr['liqui_transaction_key'];

        const buildString = this.buildStringFromArray(newRequestArr, '||', 0, true);
        const finalString = appendKey ? buildString + key : buildString;

        return this.checksumCheck(finalString, checksum, key, returnChecksumInsteadValidate);
    }

    buildStringFromArray(
        inArray: Record<string, any>,
        inJoinOperator: string = '||',
        inNestedLevel: number = 0,
        inPerformKSortOnArray: boolean = false,
    ): string {
        let returnString = '';
        if (inPerformKSortOnArray) {
            const sortedKeys = Object.keys(inArray).sort();
            for (const key of sortedKeys) {
                const val = inArray[key];
                if (Array.isArray(val)) {
                    returnString += this.buildStringFromArray(val, inJoinOperator, inNestedLevel + 1, inPerformKSortOnArray);
                } else {
                    returnString += inJoinOperator + val;
                }
            }
        } else {
            for (const key in inArray) {
                const val = inArray[key];
                if (Array.isArray(val)) {
                    returnString += this.buildStringFromArray(val, inJoinOperator, inNestedLevel + 1, inPerformKSortOnArray);
                } else {
                    returnString += inJoinOperator + val;
                }
            }
        }

        if (inNestedLevel === 0) {
            const inJoinOperatorPreg = inJoinOperator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            returnString = returnString.replace(new RegExp(`^${inJoinOperatorPreg}`), '');
            returnString = returnString.replace(new RegExp(`${inJoinOperatorPreg}$`), '');
            returnString = returnString.trim();
        }

        return returnString;
    }

    checksumCheck(
        string: string,
        checksum: string,
        key: string,
        returnChecksumInsteadValidate: boolean,
    ): boolean | string {

        this.setKey(key);
        const liquiChecksum = this.generateChecksum(string);
        const checksumArr = {
            string,
            passed: checksum,
            generated: liquiChecksum,
        };
        // this.logger.log('Checksum', checksumArr);
        console.log('checksumArr', checksumArr);

        if (returnChecksumInsteadValidate) {
            return liquiChecksum;
        }

        if (process.env.APP_ENV !== 'production' && checksum === 'dd') {
            console.log('checksumArr', checksumArr);
        }

        return liquiChecksum === checksum;
    }

    buildChecksumRecursiveV4(
        requestArr: Record<string, any>,
        key: string,
        appendKey: boolean = false,
        returnChecksumInsteadValidate: boolean = false,
    ): boolean | string {
        let newRequestArr = { ...requestArr };
        if ('checksum' in requestArr) {
            delete newRequestArr['checksum'];
        }
        if ('Checksum' in requestArr) {
            delete newRequestArr['Checksum'];
        }

        for (let i = 1; i <= 10; i++) {
            delete newRequestArr[`udf${i}`];
        }

        delete newRequestArr['okyc_xml'];
        delete newRequestArr['liqui_transaction_key'];

        const buildString = this.buildStringFromArray(newRequestArr, '||', 0, true);
        const finalString = appendKey ? buildString + key : buildString;

        return this.checksumCheck(finalString, newRequestArr['checksum'], key, returnChecksumInsteadValidate);
    }

    simpleChecksumVerification(
        request: Record<string, any>,
        checksum: string,
        secretKey: string,
    ): string | boolean {
        const unwantedParamNames = [
            'Checksum', 'File', 'Files', 'UDF1', 'UDF2', 'UDF3', 'UDF4', 'UDF5', 'OKycXML', 'OKycJSON',
        ];

        const finalRequestArr: { [key: string]: any } = {};

        for (const [key, value] of Object.entries(request)) {
            if (unwantedParamNames.includes(key)) {
                continue;
            }

            if (
                typeof value !== 'boolean' &&
                typeof value !== 'number' &&
                typeof value !== 'string'
            ) {
                continue;
            }

            finalRequestArr[key] = value;
        }

        const sortedKeys = Object.keys(finalRequestArr).sort();
        const buildString = sortedKeys.map((key) => finalRequestArr[key]).join('||');

        return this.checksumCheck(buildString, checksum, secretKey, false);
    }

    private cleanStr(str: string): string {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }
}