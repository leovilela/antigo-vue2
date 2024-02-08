export const GET_AFFILIATE = "GET_AFFILIATE//AFFILIATES";
export const SET_AFFILIATE_PICTURE = "SET_AFFILIATE_PICTURE//AFFILIATES";
export const GET_AFFILIATECONTACT = "GET_AFFILIATECONTACT//AFFILIATES";
export const GET_AFFILIATE_RESPONSIBLE = "GET_AFFILIATE_RESPONSIBLE//AFFILIATES";
export const GET_AFFILIATE_RESPONSIBLE_PICTURE = "GET_AFFILIATE_RESPONSIBLE_PICTURE//AFFILIATES";
export const CLEAR_AFFILIATE = "CLEAR_AFFILIATE//AFFILIATES";
export const GET_BANKS = "GET_BANKS//AFFILIATES";

export default {
  [GET_AFFILIATE](state, payload) {
    state.affiliate = payload;
  },
  [SET_AFFILIATE_PICTURE](state, payload) {
    state.picture = payload;
  },
  [GET_AFFILIATECONTACT](state, payload) {
    state.affiliateContact = payload;
  },
  [GET_AFFILIATE_RESPONSIBLE](state, payload) {
    state.responsible = payload;
  },
  [GET_AFFILIATE_RESPONSIBLE_PICTURE](state, payload) {
    state.responsible.picture = payload
  },
  [GET_BANKS](state, payload) {
    state.banks = payload
  },
  [CLEAR_AFFILIATE](state) {
    state.affiliate = [];
    state.affiliateContact = [];
  },
};
