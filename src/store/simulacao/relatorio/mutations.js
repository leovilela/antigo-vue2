export const UPDATE_CONTRACT_STATUS = "UPDATE_CONTRACT_STATUS//REPORT";
export const UPDATE_REPORT_FINANCING = "UPDATE_REPORT_FINANCING//REPORT";
export const UPDATE_REPORT_FINANCING_FILE = "UPDATE_REPORT_FINANCING_FILE//REPORT";
export const UPDATE_REPORT_FINANCING_DETAILS = "UPDATE_REPORT_FINANCING_DETAILS//REPORT";
export const UPDATE_DOCUMENT_TYPE = "UPDATE_DOCUMENT_TYPE//REPORT";
export const UPDATE_STATUS_LOAN = "UPDATE_STATUS_LOAN//REPORT";
export const CLEAN_STATE = "CLEAN_STATE//REPORT";

export default {
  [UPDATE_CONTRACT_STATUS](state, payload) {
    state.contractsStatus = payload;
  },
  [UPDATE_REPORT_FINANCING](state, payload) {
    state.reportsFinancing = payload;
  },
  [UPDATE_REPORT_FINANCING_FILE](state, payload) {
    state.reportsFinancingFile = payload;
  },
  [UPDATE_REPORT_FINANCING_DETAILS](state, payload) {
    state.reportsFinancingDetails = payload;
  },
  [UPDATE_DOCUMENT_TYPE](state, payload) {
    state.documentType = payload;
  },
  [UPDATE_STATUS_LOAN](state, payload) {
    state.statusLoan = payload;
  },
  [CLEAN_STATE](state) {
    state.contractsStatus = [];
    state.reportsFinancing = [];
    state.reportsFinancingFile = [];
    state.documentsType = [];
    state.statusLoan = [];
  },
};
