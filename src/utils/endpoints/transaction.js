export default {
  finance: {
    downPay: () => `${process.env.API_TRANSACTION}/Finance/DownPay`,
    simulation: () => `${process.env.API_TRANSACTION}/Finance/Simulation`,
    coefficients: () => `${process.env.API_TRANSACTION}/Finance/Coefficient`,
    create: () => `${process.env.API_TRANSACTION}/Finance/Create`,
  },
  transaction: {
    coefficients: transactionTypeId => `${process.env.API_TRANSACTION}/Transaction/${transactionTypeId}/Coefficients`,
    cardBrands: () => `${process.env.API_TRANSACTION}/transaction/cardbrands`,
    service: () => `${process.env.API_TRANSACTION}/Finance/Service`,
    create: () => `${process.env.API_TRANSACTION}/transaction/create`,
    verify: () => `${process.env.API_TRANSACTION}/transaction/verify`,
    confirm: () => `${process.env.API_TRANSACTION}/transaction/confirm`,
  },
  loan: {
    services: () => `${process.env.API_TRANSACTION}/Loan/Services`,
    transactionTypes: (serviceId) => `${process.env.API_TRANSACTION}/Loan/${serviceId}/TransactionTypes`,
    coefficients: () => `${process.env.API_TRANSACTION}/Loan/Coefficients`,
    create: () => `${process.env.API_TRANSACTION}/Loan/Create`
  },
  connector: {
    https: `${process.env.CONNECTOR_HTTPS}`,
    http: `${process.env.CONNECTOR_HTTP}`,
  },
  services: {
    base: () => `${process.env.API_TRANSACTION}/affiliate/services`,
    fields: serviceId => `${process.env.API_TRANSACTION}/Service/${serviceId}/Fields`,
    types: serviceOptionType => `${process.env.API_TRANSACTION}/service/${serviceOptionType}/transactionTypes`,
    transactionTypesGroupFee: serviceId => `${process.env.API_TRANSACTION}/service/${serviceId}/TransactionTypesGroupByFee`
  },
};
