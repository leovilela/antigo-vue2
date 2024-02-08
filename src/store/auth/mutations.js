export const SET_TOKEN = "SET_TOKEN//AUTH";
export const SET_USER = "SET_USER//AUTH";
export const SET_DOCUMENT_NUMBER = "SET_DOCUMENT_NUMBER//AUTH";
export const SET_SYSTEM_TOKEN = "SET_SYSTEM_TOKEN//AUTH";
export const SET_ANONYMOUS_USER = "SET_ANONYMOUS_USER//AUTH";
export const SET_FIREBASE_USER_REF = "SET_FIREBASE_USER_REF//AUTH";
export const SET_FIREBASE_PASSWORD_CHANGED = "SET_FIREBASE_PASSWORD_CHANGED//AUTH";
export const CLEAN_TOKEN = "CLEAN_TOKEN//AUTH";
export const CLEAN_DOCUMENT_NUMBER = "CLEAN_DOCUMENT_NUMBER//AUTH";

export default {
  [SET_TOKEN](state, payload) {
    state.token = payload;
  },
  [SET_USER](state, payload) {
    state.user = payload
  },
  [SET_DOCUMENT_NUMBER](state, payload) {
    state.documentNumber = payload;
  },
  [SET_SYSTEM_TOKEN](state, payload) {
    state.systemToken = payload;
  },
  [SET_ANONYMOUS_USER](state, payload) {
    state.anonymousUser = payload;
  },
  [SET_FIREBASE_USER_REF](state, payload) {
    state.firebaseUserRef = payload;
  },
  [SET_FIREBASE_PASSWORD_CHANGED](state, payload) {
    state.firebasePasswordChanged = payload;
  },
  [CLEAN_TOKEN](state) {
    state.token = "";
  },
  [CLEAN_DOCUMENT_NUMBER](state) {
    state.documentNumber = "";
  },
};
