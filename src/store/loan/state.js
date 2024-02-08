export default () => ({
  registerFormId: 0,
  blocksAggregation: [],
  blocks: [
    { name: "registerDataPf", model: {}, order: 1 },
    { name: "registerDataPj", model: {}, order: 1 },
    { name: "spouse", model: {}, order: 2, type: 'personal' },
    { name: "personalAddress", model: {}, order: 3, type: 'personal' },
    { name: "dataProfessional", model: {}, order: 4, type: 'personal' },
    { name: "bankReferences", model: {}, order: 5, type: 'personal' },
    { name: "dataPatrimony", model: {}, order: 6, type: 'personal' },
    { name: "pep", model: {}, order: 7, },
    { name: "shareholder", model: {}, order: 2, type: "legal" },
    { name: "corporatePartnerShareHolder", model: {}, order: 3, type: "legal" },
    { name: "dataPatrimony", model: {}, order: 4, type: "legal" },
    { name: "bankReferences", model: {}, order: 5, type: "legal" },
    { name: "revenues", model: {}, order: 6, type: "legal" },
    { name: "vehicleFinancing", model: {}, order: 7, type: "legal" },
  ],
  status: {
    completed: false,
    signed: false,
    signedCcbCet: false,
    active: false,
  },
  orderFlow: {
    id: 1,
    position: 1
  },
  regiterFormSigned: false,
  hasStepSaved: false,
  registerFormSignKey: {},
  stepsLegalFlow: [
    {
      name: "Dados Cadastrais",
      form: "business",
      id: 1,
      position: 1,
    },
    {
      name: "Acionistas (Sócios, Administradores ou Procuradores)",
      form: "shareholder",
      id: 8,
      position: 2,
    },
    {
      name: "Participação em Outras Empresas",
      form: "corporatePartnerShareHolder",
      id: 9,
      position: 3,
    },
    {
      name: "Dados Patrimoniais",
      form: "dataPatrimony",
      id: 6,
      position: 4,
    },
    {
      name: "Referências Bancárias",
      form: "bankReferences",
      id: 5,
      position: 5,
    },
    {
      name: "Faturamento (Últimos 02 anos)",
      form: "revenues",
      id: 10,
      position: 6,
    },
    {
      name: "Somente para Produto Financiamento de Veículos (Exclusivo para o Segmento de Veículos)",
      form: "vehicleFinancing",
      id: 11,
      position: 7,
    },
    {
      name: "Declaração Obrigatória Pessoa Exposta Politicamente:",
      form: "pep",
      id: 7,
      position: 8,
    }
  ],
  stepsPersonFlow: [
    {
      name: "Dados Cadastrais",
      form: "personal",
      id: 1,
      position: 1
    },
    {
      name: "Cônjuge/ Companheiro (a)",
      form: "spouse",
      id: 2,
      position: 2
    },
    {
      name: "Residência",
      form: "personalAddress",
      id: 3,
      position: 3
    },
    {
      name: "Dados Profissionais",
      form: "dataProfessional",
      id: 4,
      position: 4
    },
    {
      name: "Referências Bancárias",
      form: "bankReferences",
      id: 5,
      position: 5
    },
    {
      name: "Dados Patrimoniais",
      form: "dataPatrimony",
      id: 6,
      position: 6
    },
    {
      name: "Declaração Obrigatória Pessoa Exposta Politicamente",
      form: "pep",
      id: 7,
      position: 7
    }
  ]
});
