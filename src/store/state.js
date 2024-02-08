import profileImage from "~/assets/img/profile.jpg";

export default () => ({
  aceite: false,

  autenticado: false,
  isScd: false,
  language: "ptbr",
  score: 0,
  pictureUrl: profileImage,
  isLoading: false,
  isLoadingTransaction: false,

  podeTransacionar: true,

  passwordGuide: null,

  novoCadastro: {
    cpfcnpj: "",
    cpf: false,
    cnpj: false,
    login: "",
    telefone: "",
    email: "",
    password: "",
  },

  novaTransacao: {
    valorTotal: null,
    tipo_transacao: null,
    parcelas: null,
    retorno: null,
    afiliado: null,
  },

  novaSimulacaoEmprestimo: {
    valorTotal: null,
    tipo_transacao: null,
    parcelas: null,
    retorno: null,
    afiliado: null,
  },

  afiliado: {
    affiliate: null,
    contacts: null,
    banks: null,
    status: null,
  },

  usuario: {
    clientID: "",
    userName: "",
  },

  roles: [],

  criouSimulacao: false,

  externalProductPayment: false,

  tabDadosCadastrais: null,

  comprovantes: {
    Identification: false,
    AddressCheck: false,
    FinancialCheck: false,
    CPFCheck: false,
    CNPJCheck: false,
    BusinessCard: false,
    EquipmentSerialNumber: false,
    SocialContract: false,
  },

  emprestimos: {
    enabled: false,
    onlyReport: null,
    completed: false,
    signed: false,
    active: false,
    selectedLoanType: null,
    ccbStatus: null,
    currentTab: null,
  },

  listaEmprestimos: [],

  affiliateStatusInterval: "start",
  renewJWTInterval: null,
});
