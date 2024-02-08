export const GET_SIMULATION_VALUES = "GET_SIMULATION_VALUES//SIMULATION";
export const CLEAN_SIMULATION_VALUES = "CLEAN_SIMULATION_VALUES//SIMULATION";
export const GET_SEPARATED_SIMULATION_VALUES = "GET_SEPARATED_SIMULATION_VALUES//SIMULATION";
export const GET_SEPARATED_DOWN_PAY_VALUES = "GET_SEPARATED_DOWN_PAY_VALUES//SIMULATION";
export const GET_COEFFICIENTS = "GET_COEFFICIENTS//SIMULATION";
export const AGREE_WITH_FINANCE = "AGREE_WITH_FINANCE//SIMULATION";

export default {
  [GET_SIMULATION_VALUES](state, payload) {
    state.simulation = payload;
  },
  [GET_SEPARATED_SIMULATION_VALUES](state, payload) {
    state.separatedSimulation = payload;
  },
  [GET_SEPARATED_DOWN_PAY_VALUES](state, payload) {
    state.separatedDownPay = payload;
  },
  [GET_COEFFICIENTS](state, payload) {
    state.coefficients = payload;
  },
  [AGREE_WITH_FINANCE](state, payload) {
    state.agreement = payload;
  },
  [CLEAN_SIMULATION_VALUES](state) {
    state.simulation = {
    };
    state.separatedDownPay = [];
    state.separatedSimulation = []
    state.hasTC3 = false;
    state.hasInstallments = false;
    state.installments = null;
  },
};
