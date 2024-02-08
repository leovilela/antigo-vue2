import Actions from "./actions";
import Getters from "./getters";
import Mutations from "./mutations";
import State from "./state";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  key: 'listoLS',
  storage: window.localStorage,
  reducer: function (val) {
    if(!val.auth.token) {
      return {}
    }
    return val
  }
});

export const state = State;
export const mutations = Mutations;
export const actions = Actions;

export const getters = Getters;

export const plugins = [
  vuexLocal.plugin,
];

export const strict = false;
