
export const SET_FUNCTIONS = "SET_FUNCTIONS//CUSTOMERDATA"
export const SET_PROFESSIONS = "SET_PROFESSIONS//CUSTOMERDATA"
export const SET_MARITAL_STATUS = "SET_MARITAL_STATUS//CUSTOMERDATA"

export default {
  [SET_FUNCTIONS](state, payload) {
    state.functions = payload
  },
  [SET_PROFESSIONS](state, payload) {
    state.professions = payload
  },
  [SET_MARITAL_STATUS](state, payload) {
    state.maritalStatus = payload
  }
}

