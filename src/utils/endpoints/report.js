export default {
  list: {
    contractStatus: `${process.env.API_ACCOUNT}/List/ContractStatus`,
    financing: `${process.env.API_ACCOUNT}/Report/Financing`,
    reportFile: `${process.env.API_ACCOUNT}/Report/Financing/File`,
    details: registerLoanId => `${process.env.API_ACCOUNT}/Report/Contract/${registerLoanId}/Details`,
    documentType: `${process.env.API_ACCOUNT}/List/DocumentType`,
    detranReport: `${process.env.API_CORBAN}/api/Report/`,
    reportDetranFile: `${process.env.API_REPORT}/Detran/VehicleDebt/file`,
    reportDetranCoupon: `${process.env.API_REPORT}/Detran/VehicleDebt/coupon`,
    reportDetranSendEmail: `${process.env.API_CORBAN}/api/Email/DetranReceipt`,
    reportDetranTaxesCoupon: `${process.env.API_CORBAN}/api/Report/DetranReceipt`,

    transfer: `${process.env.API_REPORT}/Transaction/Transfer/`,
    transferFile: `${process.env.API_REPORT}/Transaction/Transfer/file`,

    conciliation: `${process.env.API_REPORT}/Transaction/Conciliation/`,
    conciliationFile: `${process.env.API_REPORT}/Transaction/Conciliation/file`,

    historic: `${process.env.API_REPORT}/Transaction/Historic/`,
    historicFile: `${process.env.API_REPORT}/Transaction/Historic/file`,

    settlement: `${process.env.API_REPORT}/Settlement/Settlement/`,
    settlementFile: `${process.env.API_REPORT}/Settlement/Settlement/file`,
  },
};
