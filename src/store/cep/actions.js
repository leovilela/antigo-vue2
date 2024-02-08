import {
  UPDATE_STATES, UPDATE_CITIES, UPDATE_ADDRESS, UPDATE_ADDRESS_FOUND,
} from "./mutations";

const ADDRESS_FOUND_STATUS = Object.freeze({
  FOUND: 1,
  NOT_FOUND: 2,
})

export default {
  async getStates({ commit }) {
    try {
      const simulation = await this.$services.cep.getStates();
      commit(UPDATE_STATES, simulation);
      return simulation;
    } catch (error) {
      throw error;
    }
  },
  async getCities({ commit }, stateID) {
    try {
      const simulation = await this.$services.cep.getCities(stateID);
      commit(UPDATE_CITIES, simulation);
      return simulation;
    } catch (error) {
      throw error;
    }
  },

  async getAddress({commit}, postalCode) {
    const code = postalCode.replace(/\D/g, '')
    try {
      commit('startLoading', null, {root: true})
      const address = this.$services.cep.getAddress(code)
      commit(UPDATE_ADDRESS, address)
      commit(UPDATE_ADDRESS_FOUND, ADDRESS_FOUND_STATUS.FOUND)
      return Promise.resolve(address)
    } catch (error) {
      commit(UPDATE_ADDRESS, {})
      if (error.response === 204) {
        commit(UPDATE_ADDRESS_FOUND, ADDRESS_FOUND_STATUS.NOT_FOUND)
        return
      }
      this.$services.swal("Erro", `Falha ao carregar endereço associado ao cep ${postalCode}`)
    }
  }

};
