
export const SET_CONNECTION = "SET_CONNECTION//SIMULACAO";
export const UPDATE_STEP_SIMULACAO = "UPDATE_STEP_SIMULACAO//SIMULACAO";
export const CLOSE_SIMULATION = "CLOSE_SIMULATION//SIMULACAO";
export const OPEN_SIMULATION = "OPEN_SIMULATION//SIMULACAO";
export default {
  [SET_CONNECTION](state, payload) {
    state.connectionSignalR = payload;
  },
  [UPDATE_STEP_SIMULACAO](state, payload) {
    state.actualStep = {
      ...payload,
    };
  },
  [CLOSE_SIMULATION](state) {
    state.isSimulationClosed = true;
  },
  [OPEN_SIMULATION](state) {
    state.isSimulationClosed = false;
  },
};
