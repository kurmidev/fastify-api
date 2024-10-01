const commonConfig = {
    DEALER_DASHBOARD_IDS: [2, 10],
    DEALER_ROLE_IDS: [8, 9, 10, 16],
    APPLICATION_STATUS: {
        Approved: 2,
        Approved_level_1: 32,
        Rejected: 3,
        Pending: 1,
        Disbursed: 48,
        Closed: 55,
        Withdraw: 4,
        Created: 83,
        Ops_Verification: 61,
        Ops_TBD: 62,
        Ops_Pending: 63,
        Ops_Hold: 121,
        Ops_Failed_To_Push: 64,
    }
};
const developConfig = {
    NonLmsDealers: [
        853,
        1167, //PostPe
        1027, //Khatabook
        479, // CRED ID for Push to LMS // UAT
        706, //Niro STG
        1186, //Indialends
        1231, //NIYO
        1273, //ET money
        1275, //Bilcut
        1276, //EPIFI 
        867,  //Moneyview
        1388, //Betterplace
        1399,  //Epifi Early salary
        1421, // Razorpay TL
        1372, // Razorpay LL
        1074, // Payme
        1515, // Razorpay EDI
        1503, // Ninjacart EMI,EDI
        1519, // Ninjacart EMI
        1530, // Scapia STG
        1518, // Rupeek STG
        1573, // Kosh STG
        1554, //Rupifi STG
        1787, // Loantap STG
        1817, //Snapmint NC STG
        1804, //Moneycontrol STG
        1848, //Jain Online Stage
        1826, //CheQ NonCaptive STG
        1847, //Carepal STG
        1583, //Betterplace EWA
        1816, //CashE STG
        1825, //Kissht STG
        1849, //Ascent HR STG
        1860, //SaveIn STG
    ],
    DealerListToGetRPS: [
        700,
        1390,
    ]
};
const productionConfig = {
    NonLmsDealers: [
        700, //Cred
        929, //BharatPe Dealer 1
        930, //BharatPe Dealer 2
        1390, //Cred Demand
        1416, //BP P2P Open Loop
        1667, //KhataBook
        1727, //PostPe
        1089, //Niro Money Term Loan
        1644, //Niro Money Credit Line
        1746, //Go Niyo
        1593, //Ola PL
        1752, //India Lends
        1755, //Bilcut
        1806, //Epifi
        1808, //Moneyview
        727, //Uniorbit Technologies Private Limited (Uni)
        1232, //Pocketly
        1454, //Jify
        1681, //Payme
        1890, //Betterplace
        1871, //Creditvidya
        1963, //Uni PL
        1971, //Razorpay LL
        1972, //Razorpay TL
        2055, //Razorpay EDI
        2034, //Epifi Non Captive
        1914, //Epifi Early Salary
        2409, //Epifi
        2181, //Ninjacart EDI
        1636, //Rupeek
        2237, //SalarySe
        2276, //Razorpay NC Checkout
        2312, //Indialends
        2337, //CheQ
        2172, //Rupifi
        2439, //Betterplace EWA
        2442, //Loantap
        1568, //BharatX
        2494, //Snapmint
        2497, //CashE
    ],
    DealerListToGetRPS: [
        700,
        1390,
    ]
};


const ENV = process.env.NODE_ENV;
export default () => ({...commonConfig, ...(ENV === 'production' ? productionConfig : productionConfig)});