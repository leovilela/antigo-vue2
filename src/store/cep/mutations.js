export const UPDATE_STATES = "UPDATE_STATES//CEP";
export const UPDATE_CITIES = "UPDATE_CITIES//CEP";
export const UPDATE_CITY = "UPDATE_CITY//CEP";
export const UPDATE_ADDRESS = "UPDATE_ADDRESS//CEP";
export const UPDATE_ADDRESS_FOUND = "UPDATE_ADDRESS_FOUND//CEP";


export default {
  [UPDATE_STATES](state, payload) {
    state.states = payload;
  },
  [UPDATE_CITIES](state, payload) {
    state.cities = payload;
  },
  [UPDATE_CITY](state, payload) {
    state.city = payload
  },
  [UPDATE_ADDRESS](state, payload) {
    state.address = payload
  },
  [UPDATE_ADDRESS_FOUND](state, payload) {
    state.addresFound = payload
  }
};
