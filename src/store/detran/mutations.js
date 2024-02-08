export const UPDATE_DEBITS = "UPDATE_DEBITS//DETRAN";
export const SAVE_DATA = "SAVE_DATA//DETRAN";
export const SAVE_BOLETOS = "SAVE_BOLETOS//DETRAN";
export const SAVE_TRANSACTION = "SAVE_TRANSACTION//DETRAN";
export const CLEAN_CLIENT = "CLEAN_CLIENT//DETRAN";
export const LIST_FILTERS = "LIST_FILTERS//DETRAN";
export const CLEAN_TRANSACTION = "CLEAN_TRANSACTION//DETRAN";
export const CHECKBLOCKTIME = "CHECKBLOCKTIME//DETRAN";
export const REQUIREDFIELDS = "REQUIREDFIELDS//DETRAN";
export const ACTIVEPAYMENTDETRAN = "ACTIVEPAYMENTDETRAN//DETRAN";
export const STATUSBUSCA = "STATUSBUSCA//DETRAN";
export const UPDATE_SERVICEDETRAN = "UPDATE_SERVICEDETRAN//DETRAN";
export const SAVE_TRANSACTIONID = "SAVE_TRANSACTIONID//DETRAN";

export default {
  [STATUSBUSCA](state, payload) {
    state.statusBusca = payload;
  },
  [ACTIVEPAYMENTDETRAN](state, payload) {
    state.activePaymentDetran = payload;
  },
  [CHECKBLOCKTIME](state, payload) {
    state.time = payload;
  },
  [REQUIREDFIELDS](state, payload) {
    state.requiredFields = payload;
  },
  [UPDATE_DEBITS](state, payload) {
    state.debits = payload;
  },
  [UPDATE_SERVICEDETRAN](state, payload) {
    state.serviceId = payload;
  },
  [SAVE_TRANSACTIONID](state, payload) {
    state.transaction = payload;
  },
  [SAVE_DATA](state, payload) {
    state.estado = payload.estado;
    state.placa = payload.placa;
    state.cpfCnpj = payload.cpfCnpj;
    state.email = payload.email;
    state.renavan = payload.renavan;
    state.serviceId = payload.serviceId;
    state.serviceName = payload.serviceName;
  },
  [SAVE_BOLETOS](state, payload) {
    state.boletos = payload.boletos;
    state.fee = payload.fee;
    state.operation = payload.operation;
    state.totalDebits = payload.totalDebits;
    state.generalData = payload.generalData;
    state.typeTransaction = payload.typeTransaction;
    state.installment = payload.installment;
    state.retorno = payload.retorno;
  },
  [SAVE_TRANSACTION](state, payload) {
    state.transaction = payload;
  },
  [CLEAN_TRANSACTION](state) {
    state.transaction = "";
  },
  [CLEAN_CLIENT](state) {
    state.boletos = "";
    state.operation = "";
    state.serviceId = "";
    state.serviceName = "";
    state.estado = "";
    state.placa = "";
    state.cpfCnpj = "";
    state.email = "";
    state.renavan = "";
    state.totalDebits = "";
    state.filters = "";
    state.debits = "";
    state.generalData = "";
    state.fee = "";
  },
  [LIST_FILTERS](state, payload) {
    state.filters = payload;
  },
};
