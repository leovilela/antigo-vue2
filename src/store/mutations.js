export default {
  aceiteListo(state) {
    state.aceite = state.aceite ? false : true;
  },
  cpfValido(state) {
    state.cpfValido = state;
  },
  cnpjValido(state) {
    state.cnpjValido = state;
  },
  ajusteScoreSenha(state) {
    state.score = state;
  },
  autenticado(state, valor) {
    state.autenticado = valor;
    // console.log('autenticado',valor);
  },
  language(state) {
    //  console.log("linguagem",state.language)
  },
  updateDocumentNumberType(state, payload) {
    state.documentNumberType = payload;
  },
  limpaRetornoNovaSimulacaoEmprestimo(state) {
    state.novaSimulacaoEmprestimo.retorno = null;
  },
  gravaCadastro(state, el) {
    // console.log(el);
    state.novoCadastro.cpfcnpj = el.cpfcnpj;
    state.novoCadastro.cpf = el.cpf;
    state.novoCadastro.cnpj = el.cnpj;
    state.novoCadastro.login = el.login;
    state.novoCadastro.telefone = el.telefone;
    state.novoCadastro.email = el.email;
    state.novoCadastro.password = el.password;
  },
  novaTransacao(state, el) {
    // console.log("nova transacao", el);
    el.retorno = el.retorno == null ? "" : el.retorno;

    state.novaTransacao.valorTotal = el.number_valor_transacao;
    state.novaTransacao.tipo_transacao = el.tipo_transacao;
    state.novaTransacao.parcelas = el.parcelaSelecionada;
    state.novaTransacao.retorno = el.retorno;
    state.novaTransacao.afiliado = el.affiliateID;
  },

  criaSimulacao(state, el) {
    state.criouSimulacao = el;
  },

  externalProductPayment(state, payload) {
    state.externalProductPayment = payload;
  },

  /*   dadosServico(state, el) {
    state.novaTransacao.tipo_servico = el.serviceType;
    state.novaTransacao.valores.honorarios = el.fee;
  }, */

  code(state, el) {
    state.code = el;
  },
  deletecode(state, el) {
    delete state.code;
  },
  limpaTransacao(state) {
    state.novaTransacao.valorTotal = null;
    state.novaTransacao.retorno = null;
    state.novaTransacao.tipo_transacao = null;
    state.novaTransacao.parcelas = null;
    state.novaTransacao.afiliado = null;
  },

  setToken(state, token) {
    state.auth.accessToken = token.access_token;
    state.auth.refreshToken = token.refresh_token;
    state.auth.tokenType = token.token_type;
    state.auth.expiresTimeToken = token.expiresTimeToken;
    state.auth.expiresDiffTime = token.diffTime;
  },

  removeAllAuth(state) {
    state.auth = {};
  },

  redirectLogin(state) {
    $nuxt.$router.push("/login", () => { });
  },

  removeAuth(state) {
    state.auth = {};
  },

  gravaUsuario(state, el) {
    state.usuario.clientID = el.clientID;
    state.usuario.userName = el.userName;
  },

  gravaAfiliado(state, el) {
    state.afiliado.affiliate = el.affiliate;
  },

  gravaContatos(state, el) {
    state.afiliado.contacts = el.contacts;
  },


  gravaBancos(state, el) {
    state.afiliado.banks = el.banks;
  },

  gravaStatusAfiliado(state, el) {
    state.afiliado.status = el;
  },

  limpaLoginAll(state) {
    // console.log("mutations limpaLogin");
    state.afiliado = {};
    state.usuario = {};
    state.affiliateStatusInterval = null;
    state.auth = {};
  },

  limpaLogin(state) {
    state.afiliado = {};
    state.usuario = {};
    state.affiliateStatusInterval = null;
  },


  updateTabDadosCadastrais(state, el) {
    state.tabDadosCadastrais = el;
  },

  setPasswordGuide(state, el) {
    state.passwordGuide = el.guide;
  },

  clearPasswordGuide(state) {
    state.passwordGuide = null;
  },

  setRoles(state, el) {
    state.roles = el.roles;
  },

  setComprovanteState(state, el) {
    state.comprovantes[el.type] = el.status;
  },

  toggleTransactions(state, el) {
    state.podeTransacionar = el;
  },

  toggleLoans(state, el) {
    state.emprestimos.enabled = el;
  },

  setLoanType(state, el) {
    state.emprestimos.selectedLoanType = el;
  },

  setLoanFormCompleted(state, el) {
    state.emprestimos.completed = el;
  },

  setLoanFormSigned(state, el) {
    state.emprestimos.signed = el;
  },

  setLoanFormActive(state, el) {
    state.emprestimos.active = el;
  },

  setLoanOnlyReport(state, el) {
    state.emprestimos.onlyReport = el;
  },

  setLoanCCBStatus(state, el) {
    state.emprestimos.ccbStatus = el;
  },

  setLoanCurrentTab(state, el) {
    state.emprestimos.currentTab = el;
  },

  startInterval(state, el) {
    state.affiliateStatusInterval = el;
  },
  clearIntervalFc(state) {
    clearInterval(state.affiliateStatusInterval);
  },
  pictureLoad(state, el) {
    state.pictureUrl = el;
  },
  startTransactionLoading(state) {
    state.isLoadingTransaction = true;
  },
  finishTransactionLoading(state) {
    state.isLoadingTransaction = false;
  },
  startLoading(state) {
    state.isLoading = true;
  },

  finishLoading(state) {
    state.isLoading = false;
  },
  addContactToAffiliate(state, payload) {
    state.afiliado.contacts[0][payload.key].push(payload.value);
  },
  delContactToAffiliate(state, payload) {
    state.afiliado.contacts[0][payload.key].splice(payload.value, 1);
  },
  updateContactAffiliate(state, {
    attributeContactAffiliate, attributeInsideContactAffiliate, indexContactAffiliate, valueToInsert,
  }) {
    state.afiliado.contacts[0][attributeContactAffiliate][indexContactAffiliate][attributeInsideContactAffiliate] = valueToInsert;
  },

  enableScd(state) {
    state.isScd = true;
  },
  disableScd(state) {
    state.isScd = false;
  },
};
