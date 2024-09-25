interface IRequest {
    RequestId:string,
    Checksum:string,
    MID:string,
    Timestamp:Date,
    InvestorId:number,
}

interface IResponse {
    status:boolean,
    message:string,
    data:any,
    code:number,
    checksum:string
}