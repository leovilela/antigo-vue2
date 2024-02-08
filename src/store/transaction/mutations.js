export const UPDATE_TYPESOFSERVICES = "UPDATE_TYPESOFSERVICES//TRANSACTION";
export const UPDATE_CARDBRANDS = "UPDATE_CARDBRANDS//TRANSACTION";
export const CLEAR_TYPESOFSERVICES = "CLEAR_TYPESOFSERVICES//TRANSACTION";
export const UPDATE_TRANSACTIONTYPES = "UPDATE_TRANSACTIONTYPES//TRANSACTION";
export const UPDATE_FIELDS = "UPDATE_FIELDS//TRANSACTION";
export const UPDATE_COEFFICIENTS = "UPDATE_COEFFICIENTS//TRANSACTION";
export const UPDATE_RETORNOATIVO = "UPDATE_RETORNOATIVO//TRANSACTION";
export const UPDATE_LISTFILTERED = "UPDATE_LISTFILTERED//TRANSACTION";
export const UPDATE_VALUETOTAL = "UPDATE_VALUETOTAL//TRANSACTION";
export const UPDATE_TRANSACTIONTYPE = "UPDATE_TRANSACTIONTYPE//TRANSACTION";
export const UPDATE_TRANSACTION_TYPES_GROUP_FEE = "UPDATE_TRANSACTION_TYPES_GROUP_FEE//TRANSACTION";
export const UPDATE_SIMULATIONINSTALMENT = "UPDATE_SIMULATIONINSTALMENT//TRANSACTION";
export const CLEAR_TRANSACTION = "CLEAR_TRANSACTION//TRANSACTION";
export const UPDATE_SELECTINSTALMENT = "UPDATE_SELECTINSTALMENT//TRANSACTION";
export const CLEAR_SELECTEDINSTALMENT = "CLEAR_SELECTEDINSTALMENT//TRANSACTION";
export const CLEAR_RETORNOATIVO = "CLEAR_RETORNOATIVO//TRANSACTION";
export const UPDATE_TYPEOFSERVICE = "UPDATE_TYPEOFSERVICE//TRANSACTION";
export const UPDATE_FINANCE_SERVICE = "UPDATE_FINANCE_SERVICE//TRANSACTION";
export const UPDATE_RETURNLIST = "UPDATE_RETURNLIST//TRANSACTION";
export const UPDATE_DADOSVARIAVEIS = "UPDATE_DADOSVARIAVEIS//TRANSACTION";
export const UPDATE_TRANSACTIONOBJ = "UPDATE_TRANSACTIONOBJ//TRANSACTION";
export const UPDATE_RESPOSTATEXT = "UPDATE_RESPOSTATEXT//TRANSACTION";
export const UPDATE_RESPOSTACODE = "UPDATE_RESPOSTACODE//TRANSACTION";
export const UPDATE_SELECTEDCARD = "UPDATE_SELECTEDCARD//TRANSACTION";
export const UPDATE_BTCONCLUIRTRANSACAO = "UPDATE_BTCONCLUIRTRANSACAO//TRANSACTION";
export const UPDATE_OPENTRANSACTION = "UPDATE_OPENTRANSACTION//TRANSACTION";
export const UPDATE_FORMDATA2 = "UPDATE_FORMDATA2//TRANSACTION";
export const UPDATE_REQUIREDFIELDSKEYS = "UPDATE_REQUIREDFIELDSKEYS//TRANSACTION";
export const CLEAR_INSTALMENTS = "CLEAR_INSTALMENTS//TRANSACTION";

export default {
  [UPDATE_REQUIREDFIELDSKEYS](state, payload) {
    state.requiredFieldKeys = payload;
  },
  [UPDATE_FORMDATA2](state, payload) {
    state.formdata2 = payload;
  },
  [UPDATE_OPENTRANSACTION](state, payload) {
    state.openTransaction = payload;
  },
  [UPDATE_BTCONCLUIRTRANSACAO](state, payload) {
    state.btConcluirTransacao = payload;
  },
  [UPDATE_SELECTEDCARD](state, payload) {
    state.selectedCard = payload;
  },
  [UPDATE_RESPOSTATEXT](state, payload) {
    state.respostaText = payload;
  },
  [UPDATE_RESPOSTACODE](state, payload) {
    state.respostaCode = payload;
  },
  [UPDATE_TRANSACTIONOBJ](state, payload) {
    state.transactionObj = payload;
  },
  [UPDATE_DADOSVARIAVEIS](state, payload) {
    state.dadosVariaveis = payload;
  },
  [UPDATE_RETURNLIST](state, payload) {
    state.listaRetornos = payload;
  },
  [UPDATE_CARDBRANDS](state, payload) {
    state.cardBrands = payload;
  },
  [UPDATE_TYPESOFSERVICES](state, payload) {
    state.typesOfservices = payload;
  },
  [UPDATE_TYPEOFSERVICE](state, payload) {
    state.typeOfservice = payload;
  },
  [CLEAR_TYPESOFSERVICES](state) {
    state.typesOfservices = [];
  },
  [UPDATE_TRANSACTIONTYPES](state, payload) {
    state.transactionTypes = payload;
  },
  [UPDATE_TRANSACTION_TYPES_GROUP_FEE](state, payload) {
    state.transactionTypesGroupByFee = payload;
  },
  [UPDATE_FIELDS](state, payload) {
    state.fields = payload;
  },
  [UPDATE_COEFFICIENTS](state, payload) {
    state.coefficients = payload;
  },
  [UPDATE_RETORNOATIVO](state, payload) {
    state.retornoAtivo = payload;
  },
  [CLEAR_RETORNOATIVO](state, payload) {
    state.retornoAtivo = 0;
  },
  [UPDATE_LISTFILTERED](state, payload) {
    state.filteredList = payload;
  },
  [UPDATE_VALUETOTAL](state, payload) {
    state.valueTotal = payload;
  },
  [UPDATE_TRANSACTIONTYPE](state, payload) {
    state.transactionType = payload;
  },
  [CLEAR_INSTALMENTS](state) {
    state.simulationInstalment = [];
  },
  [UPDATE_SIMULATIONINSTALMENT](state, payload) {
    state.simulationInstalment = payload;
  },
  [UPDATE_SELECTINSTALMENT](state, payload) {
    state.selectInstalment = payload;
  },
  [CLEAR_TRANSACTION](state) {
    // state.typesOfservices = "";
    // state.transactionTypes = [];
    state.fields = [];
    state.coefficients = [];
    state.retornoAtivo = 0;
    state.filteredList = [];
    state.transactionType = false;
    state.simulationInstalment = [];
    state.selectInstalment = [];
    state.valueTotal = 0;
    state.cardBrands = [];
    state.typeOfservice = "";
    state.financeService = [];
    state.listaRetornos = [];
    state.dadosVariaveis = [];
    state.transactionObj = [];
    state.respostaText = [];
    state.respostaCode = [];
    state.criouSimulacao = [];
    state.selectedCard = [];
    state.btConcluirTransacao = [];
    state.openTransaction = [];
    state.formdata2 = [];
    state.requiredFieldKeys = [];
  },
  [CLEAR_SELECTEDINSTALMENT](state) {
    state.selectInstalment = "";
  },
  [UPDATE_FINANCE_SERVICE](state, payload) {
    state.financeService = payload;
  },
};
