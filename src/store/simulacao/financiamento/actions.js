import {
  GET_SIMULATION_VALUES, CLEAN_SIMULATION_VALUES, GET_SEPARATED_SIMULATION_VALUES, GET_SEPARATED_DOWN_PAY_VALUES, GET_COEFFICIENTS, AGREE_WITH_FINANCE,
} from "./mutations";

export default {
  async getDownPayValues({ commit }, payload) {
    try {
      const response = await this.$services.transaction.getDownPay(payload);
      commit(GET_SIMULATION_VALUES, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getSeparatedSimulationValues({ commit, dispatch }, payload) {
    try {
      await dispatch("getSeparatedDownPayValues");
      const response = await this.$services.transaction.getSeparatedSimulation(payload);
      commit(GET_SEPARATED_SIMULATION_VALUES, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getSeparatedDownPayValues({ commit, state }) {
    if (state.separatedDownPay.length > 0) {
      return;
    }
    try {
      const response = await this.$services.transaction.getSeparatedDownPay();
      commit(GET_SEPARATED_DOWN_PAY_VALUES, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getCoefficients({ commit }, payload) {
    try {
      const response = await this.$services.transaction.getCoefficients(payload);
      commit(GET_COEFFICIENTS, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  cleanState({ commit }) {
    commit(CLEAN_SIMULATION_VALUES);
  },

  async agreementWithFinance({ commit }, payload) {
    try {
      const response = await this.$services.transaction.createFinancingAgreement(payload);
      commit(AGREE_WITH_FINANCE, response);
      return response;
    } catch (error) {
      throw error;
    }
  },

};
