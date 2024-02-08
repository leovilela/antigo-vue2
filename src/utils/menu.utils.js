import { ROLES } from "../enums/Roles";

const text = {
  fazer_transacao: "Nova transação",
  fazer_simulacao: "Fazer simulacao",
  painel_cliente: "Painel do cliente",
  meus_dados: "Meus dados cadastrais",
  agenda: "Agenda",
  extrato: "Extrato",
  conciliacao: "Conciliação",
  historico_transacao: "Histórico de transações",
  relatorio_pagamento: "Relatórios de pagamento",
  transacoes_externas: "Transações externas",
  conta_listo: "Conta Listo",
  mensagens: "Mensagens e notificações",
  configuracoes: "Configurações",
  debitosVeiculares: "Débitos Veiculares",
  solicitacoes: "Solicitações",
  emprestimos: "Empréstimos",
  financiamentos: "Financiamentos"
};

export const menuItensOptions = [
  {
    desktop: true,
    textPtBr: text.solicitacoes,
    className: "exchangeApproval",
    isEnabled: true,
    url: "/interno/cadastro/aprovacoes",
    roles: ["lf_cadastro", "lf_admin"],
    responsive: true,
    code: ROLES.REQUESTS
  },

  {
    desktop: false,
    textPtBr: text.painel_cliente,
    className: "clientPanel",
    isEnabled: true,
    url: "/painel-do-cliente",
    roles: ["ec_owner", "ec_login", "lf_ec", "lf_admin", "ec_read"],
    responsive: false,
    code: ROLES.CUSTOMER_PANEL
  },

  {
    desktop: true,
    textPtBr: text.fazer_transacao,
    className: "newTransaction",
    isEnabled: true,
    url: "/nova-transacao",
    roles: ["ec_owner", "ec_login", "lf_ec", "lf_admin"],
    responsive: false,
    code: ROLES.NEW_TRANSACTION
  },
  {
    desktop: false,
    textPtBr: text.financiamentos,
    className: "financing",
    isEnabled: true,
    url: "/financiamentos/auto",
    roles: ["lf_admin", "scd_trader"],
    responsive: false,
    code: ROLES.FINANCING
  },
  {
    desktop: false,
    textPtBr: text.debitosVeiculares,
    className: "payments",
    isEnabled: true,
    url: "/debitos-veiculares/detran/ipva",
    roles: ["ec_owner", "lf_admin"],
    responsive: false,
    code: ROLES.VEHICLE_DEBITS
  },
  {
    desktop: true,
    textPtBr: text.emprestimos,
    className: "loans",
    isEnabled: true,
    url: "/emprestimos",
    roles: ["lf_admin", "ec_kgc"],
    responsive: true,
    code: ROLES.LOANS
  },
  {
    desktop: false,
    textPtBr: text.meus_dados,
    className: "register",
    isEnabled: true,
    url: "/meus-dados-cadastrais",
    roles: ["ec_owner", "ec_operador", "lf_admin", "ec_read"],
    responsive: false,
    code: ROLES.CADASTRAL_DATA
  },

  {
    desktop: false,
    textPtBr: text.extrato,
    className: "settlement",
    isEnabled: true,
    url: "/extrato",
    roles: ["ec_owner", "lf_admin", "ec_read"],
    responsive: false,
    code: ROLES.EXTRACT
  },

  {
    desktop: false,
    textPtBr: text.conciliacao,
    className: "conciliation",
    isEnabled: true,
    url: "/conciliacao",
    roles: ["ec_owner", "lf_admin", "ec_read"],
    responsive: false,
    code: ROLES.CONCILIATION
  },

  {
    desktop: false,
    textPtBr: text.historico_transacao,
    className: "transactions",
    isEnabled: true,
    url: "/historico-transacoes",
    roles: ["ec_owner", "lf_admin", "ec_read"],
    responsive: false,
    code: ROLES.TRANSACTION_HISTORY
  },

  {
    desktop: false,
    textPtBr: text.relatorio_pagamento,
    className: "paymentReports",
    isEnabled: true,
    url: "/relatorios-de-pagamento",
    roles: ["ec_owner", "lf_admin", "ec_read"],
    responsive: false,
    code: ROLES.PAYMENT_REPORTS
  }
]
