export default {
  isAuthenticated(state) {
    return !!state.auth.accessToken;
  },
  loanFormCompleted(state) {
    return state.emprestimos.completed;
  },
  loanFormSigned(state) {
    return state.emprestimos.signed;
  },
  loanFormActive(state) {
    return state.emprestimos.active;
  },
  showCCBtoSign(state) {
    return state.emprestimos.ccbStatus;
  },
};
