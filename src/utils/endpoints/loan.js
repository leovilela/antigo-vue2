export default {
  status: {
    getStatusAndStep: (registrationFormId) => `${process.env.API_CUSTOMER_DATA}/PointFulfillmentCadastral/GetStatusAndStep/${registrationFormId}`,
    pointFulfillmentCadastral: () => `${process.env.API_CUSTOMER_DATA}/PointFulfillmentCadastral`
  },
  register: {
    registerDataPj: () => `${process.env.API_CUSTOMER_DATA}/RegistrationData/pj`,
    registerDataPf: () => `${process.env.API_CUSTOMER_DATA}/RegistrationData/pf`,
    spouse: () => `${process.env.API_CUSTOMER_DATA}/SpousePF`,
    personalAddress: () => `${process.env.API_CUSTOMER_DATA}/Address`,
    dataProfessional: () => `${process.env.API_CUSTOMER_DATA}/Profession`,
    bankReferences: () => `${process.env.API_CUSTOMER_DATA}/BankReference`,
    dataPatrimony: () => `${process.env.API_CUSTOMER_DATA}/Equity`,
    shareholder: () => `${process.env.API_CUSTOMER_DATA}/CorporateStructurePJ`,
    pep: () => `${process.env.API_CUSTOMER_DATA}/DeclarationPEP`,
    corporatePartnerShareHolder: () => `${process.env.API_CUSTOMER_DATA}/ParticipationsOtherCompanyPJ`,
    revenues: () => `${process.env.API_CUSTOMER_DATA}/RevenuePJ`,
    vehicleFinancing: () => `${process.env.API_CUSTOMER_DATA}/ProductionMotorVehiclesPJ`,
  },
  clickSign: {
    documentSign: () => `${process.env.API_SIGNATURE}/Sign/GetDocumentKey`
  },
  form: {
    clickSign: (formTypeId) => `${process.env.API_CUSTOMER_DATA}/Form/ClickSign/${formTypeId}`,
    cetResume: () => `${process.env.API_CUSTOMER_DATA}/Form/CetResume`,
    SignatureStatus: () => `${process.env.API_CUSTOMER_DATA}/Form/SignatureStatus`,
    resumeFichaCadastral: (registrationFormId) => `${process.env.API_CUSTOMER_DATA}/Form/${registrationFormId}`,
  }
}
