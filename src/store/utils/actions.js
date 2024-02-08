import {
  SAVE_DATA,
  CLEAN_CLIENT,
} from "./mutations";

export default {
  saveData({ commit }, data) {
    commit(SAVE_DATA, data);
  },
  cleanClient({ commit }) {
    commit(CLEAN_CLIENT);
  },
};
