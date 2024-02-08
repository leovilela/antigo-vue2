export const SET_COEFFICIENTS = "SET_COEFFICIENTS//SIMULATION//LOAN"
export const SET_TRANSACTION_DATA = "SET_TRANSACTION_DATA//SIMULATION//LOAN"
export const SET_PINPAD_DATA = "SET_PINPAD_DATA//SIMULATION//LOAN"
export const SET_LIMITS = "SET_LIMITS//SIMULATION//LOAN"
export const SET_SERVICES = "SET_SERVICES//SIMULATION//LOAN"
export const SET_TRANSACTION_TYPES = "SET_TRANSACTION_TYPES//SIMULATION//LOAN"
export const SET_SIGNATURE_STATUS = "SET_SIGNATURE_STATUS//SIMULATION//LOAN"
export const CLEAN_SIMULATION = "CLEAN_SIMULATION//SIMULATION//LOAN"
export const CLEAN_SERVICES = "CLEAN_SERVICES//SIMULATION//LOAN"
export const SIGN_SIMULATION = "SIGN_SIMULATION//SIMULATION//LOAN"
export const UNSIGN_SIMULATION = "UNSIGN_SIMULATION//SIMULATION//LOAN"
export const SET_CONTRACT_ID = "SET_CONTRACT_ID//SIMULATION//LOAN"
export const SET_SIMULATION_SIGN_KEY = "SET_SIMULATION_SIGN_KEY//SIMULATION//LOAN"
export const SET_CET_RESUME = "SET_CET_RESUME//SIMULATION//LOAN"
export const SET_RESUME_FICHA_CADASTRAL = "SET_RESUME_FICHA_CADASTRAL//LOAN"

export default {
  [SET_LIMITS](state, payload) {
    state.limits = payload
  },
  [SET_SIMULATION_SIGN_KEY](state, payload) {
    state.simulationSignKey = payload
  },
  [SET_LIMITS](state, payload) {
    state.limits = payload
  },
  [SET_PINPAD_DATA](state, payload) {
    state.pinpadData = payload
  },
  [SET_COEFFICIENTS](state, payload) {
    state.coefficients = payload
  },
  [SET_CONTRACT_ID](state, payload) {
    state.contractId = payload
  },
  [SIGN_SIMULATION](state) {
    state.hasSimulationSigned = true
  },
  [SET_SIGNATURE_STATUS](state, payload) {
    state.signatureStatus = payload
  },
  [UNSIGN_SIMULATION](state) {
    state.hasSimulationSigned = false
  },
  [SET_TRANSACTION_DATA](state, payload) {
    state.transactionData = payload
  },
  [SET_SERVICES](state, payload) {
    state.services = payload
  },
  [SET_TRANSACTION_TYPES](state, payload) {
    state.transactionTypes = payload
  },
  [CLEAN_SERVICES](state) {
    state.limits = {};
    state.services = {};
  },
  [CLEAN_SIMULATION](state) {
    state.coefficients = [];
    state.hasSimulationSigned = false;
    state.transactionData = {};
    state.limits = {};
    state.services = {}
    state.transactionTypes ={}
    state.signatureStatus = {}
  },
  [SET_CET_RESUME](state, payload) {
    state.cetResume = payload
  },
  [SET_RESUME_FICHA_CADASTRAL](state, payload) {
    state.getResumeFichaCadastral = payload
  }
}
