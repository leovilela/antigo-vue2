import { SET_FUNCTIONS, SET_MARITAL_STATUS, SET_PROFESSIONS } from "./mutations"

export default {
  async getFunctions({ commit, state }) {
    commit('startLoading', null, { root: true })
    try {
      const content = await this.$services.customerData.getFunction()
      commit(SET_FUNCTIONS, content)
    } catch (error) {

      return this.$services.swal('Falha ao resgatar', `Cargos`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },

  async getProfessions({ commit, state }) {
    commit('startLoading', null, { root: true })
    try {
      const content = await this.$services.customerData.getProfession()
      commit(SET_PROFESSIONS, content)
    } catch (error) {

      return this.$services.swal('Falha ao resgatar', `Profissões`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async getMaritalStatus({ commit, state }) {
    commit('startLoading', null, { root: true })
    try {
      const content = await this.$services.customerData.getMaritalStatus()
      commit(SET_MARITAL_STATUS, content)
    } catch (error) {

      return this.$services.swal('Falha ao resgatar', `Estados Civis`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
}
