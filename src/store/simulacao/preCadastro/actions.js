import {
  ADD_CLIENT, UPDATE_CLIENT_CPF, UPDATE_CLIENT, UPDATE_CLIENT_CONTACTS, CLEAN_CLIENT, SET_CLIENT_ID,
} from "./mutations";


export default {
  async savePreRegistration({ commit, dispatch }, payload) {
    try {
      const response = await this.$services.simulation.savePreRegistration({
        name: payload.name,
        cpf: payload.documentNumber,
        cellPhone: payload.cellPhone,
        email: payload.email,
        sendType: payload.sendTypes,
      });
      commit(ADD_CLIENT, { ...payload, id: response });
      await dispatch("simulacao/fipe/getFipeVehiclesTypes");
    } catch (error) {
      commit("finishLoading", null, { root: true });
      throw error;
    }
  },

  async updateContacts({ commit, state }, payload) {
    try {
      await this.$services.simulation.updateContacts(state.id, {
        email: payload.email,
        cellPhone: payload.cellPhone,
      });
      commit(UPDATE_CLIENT_CONTACTS, payload);
    } catch (error) {
      throw error;
    }
  },

  addClientID({ commit }, clientId) {
    commit(SET_CLIENT_ID, clientId);
  },
  async getClient({ commit }, cpf) {
    try {
      commit(UPDATE_CLIENT_CPF, cpf);
      const { hasRestriction } = await this.$services.simulation
        .hasClientRestrictions(cpf);
      if (hasRestriction) {
        throw Object.assign({
          hasRestriction: true,
        });
      }
      const client = await this.$services.simulation.getClientValid(cpf);

      commit(UPDATE_CLIENT, {
        id: client.id,
        documentNumber: client.cpf,
        name: client.name,
        email: client.email.replace(/\s/g,''),
        cellPhone: client.cellPhone,
        confirmApp: client.confirmApp,
        hasUser: client.hasUser,
        hasFinancing: client.hasFinancing,
      });
      return client;
    } catch (error) {
      commit("finishLoading", null, {
        root: true,
      });
      throw error;
    }
  },
  cleanClient({ commit }) {
    commit(CLEAN_CLIENT);
  },
};
