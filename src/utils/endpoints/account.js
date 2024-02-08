export default {
  client: {
    base: `${process.env.API_ACCOUNT}/Client`,
    clientValid: cpf => `${process.env.API_ACCOUNT}/Client/${cpf}/BasicData`,
    hasRestriction: cpf => `${process.env.API_ACCOUNT}/Client/${cpf}/Restriction`,
    address: {
      base: `${process.env.API_ACCOUNT}/ClientAddress`,
      byAddress: `${process.env.API_ACCOUNT}/ClientAddress/Address`,
      byClient: `${process.env.API_ACCOUNT}/ClientAddress/Client`,
    },
    resendSMS: cpf => `${process.env.API_ACCOUNT}/Client/${cpf}/ResendLinkApp`,
    contact: {
      base: `${process.env.API_ACCOUNT}/ClientContact`,
      byClient: `${process.env.API_ACCOUNT}/Client`,
      byContact: `${process.env.API_ACCOUNT}/Contact`,
    },
    contacts: clientId => `${process.env.API_ACCOUNT}/Client/${clientId}/Contacts`,
    contractSignaturePush: cpf => `${process.env.API_ACCOUNT}/Client/${cpf}/ContractSignaturePush`,
  },
  login: {
    validateRequest: guid => `${process.env.API_ACCOUNT}/Login/ValidateRequest/${guid}`,
    changePassword: () => `${process.env.API_ACCOUNT}/Login/ChangePassword`,
  },
  infobip: {
    resendPin: `${process.env.API_ACCOUNT}/ResendPin`,
    verifyPin: `${process.env.API_ACCOUNT}/VerifyPin`,
  },
  form: {
    blockTypes: `${process.env.API_ACCOUNT}/AutoSaveForm/formBlockTypes`,
    autoSave: `${process.env.API_ACCOUNT}/AutoSaveForm`,
    summaryCET: registerLoanId => `${process.env.API_ACCOUNT}/Form/ShortCET/Client/${registerLoanId}`,
    docs: () => `${process.env.API_ACCOUNT}/Form/ContractGeneration`,
    chassi: () => `${process.env.API_ACCOUNT}/Form/ApproveShortCet`,
  },
  notification: {
    register: `${process.env.API_ACCOUNT_WS}`,
  },
  list: {
    gender: `${process.env.API_ACCOUNT}/Gender`,
    maritalStatus: `${process.env.API_ACCOUNT}/MaritalStatus`,
    profession: `${process.env.API_ACCOUNT}/Profession`,
    function: `${process.env.API_ACCOUNT}/Function`,
    contactType: `${process.env.API_ACCOUNT}/ContactType`,
    homeType: `${process.env.API_ACCOUNT}/HomeType`,
    houseTime: `${process.env.API_ACCOUNT}/HouseTime`,
    cardBrand: `${process.env.API_ACCOUNT}/CardBrand`,
    companyTime: `${process.env.API_ACCOUNT}/CompanyTime`,
    financialBank: `${process.env.API_ACCOUNT}/FinancialBank`,
  },
};
