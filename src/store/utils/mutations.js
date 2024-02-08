export const SAVE_DATA = "SAVE_DATA//UTILS";
export const CLEAN_CLIENT = "CLEAN_CLIENT//UTILS";


export default {
  [SAVE_DATA](state, payload) {
    state.historyUrl = payload.historyUrl;
  },
  [CLEAN_CLIENT](state) {
    state.historyUrl = "";
  },
};
