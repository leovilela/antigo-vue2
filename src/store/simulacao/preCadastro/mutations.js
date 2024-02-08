export const ADD_CLIENT = "ADD_CLIENT//PRE_CADASTRO";
export const SET_CLIENT_ID = "SET_CLIENT_ID//PRE_CADASTRO";
export const UPDATE_CLIENT = "UPDATE_CLIENT//PRE_CADASTRO";
export const UPDATE_CLIENT_CONTACTS = "UPDATE_CLIENT_CONTACTS//PRE_CADASTRO";
export const UPDATE_CLIENT_CPF = "UPDATE_CLIENT_CPF//PRE_CADASTRO";
export const CLEAN_CLIENT = "CLEAN_CLIENT//PRE_CADASTRO";

export default {
  [ADD_CLIENT](state, {
    id = "",
    email = "",
    documentNumber = "",
    cellPhone = "",
    name = "",
  }) {
    state.id = id;
    state.email = email;
    state.cellPhone = cellPhone;
    state.documentNumber = documentNumber;
    state.name = name;
    state.hasUser = false;
    state.hasFinancing = false;
    state.confirmApp = false;
  },
  [SET_CLIENT_ID](state, payload) {
    state.id = payload;
  },
  [UPDATE_CLIENT](state, {
    id = "",
    email = "",
    documentNumber = "",
    cellPhone = "",
    name = "",
    confirmApp = false,
    hasUser = false,
    hasFinancing = false,
  }) {
    state.id = id;
    state.email = email;
    state.cellPhone = cellPhone;
    state.documentNumber = documentNumber;
    state.name = name;
    state.hasUser = hasUser;
    state.hasFinancing = hasFinancing;
    state.confirmApp = confirmApp;
  },
  [UPDATE_CLIENT_CONTACTS](state, {
    cellPhone = "",
    email = "",
  }) {
    state.cellPhone = cellPhone;
    state.email = email;
  },
  [UPDATE_CLIENT_CPF](state, payload) {
    state.documentNumber = payload;
  },
  [CLEAN_CLIENT](state) {
    state.id = "";
    state.email = "";
    state.cellPhone = "";
    state.documentNumber = "";
    state.name = "";
    state.hasUser = false;
    state.hasFinancing = false;
    state.confirmApp = false;
  },
};
