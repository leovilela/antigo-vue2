export const UPDATE_REPORT_DETRAN = "UPDATE_REPORT_DETRAN//REPORT";
export const UPDATE_REPORT_DETRAN_FILE = "UPDATE_REPORT_DETRAN_FILE//REPORT";
export const UPDATE_REPORT_DETRAN_COUPON = "UPDATE_REPORT_DETRAN_COUPON//REPORT";
export const UPDATE_REPORT_DETRAN_TEMPORARY_COUPON = "UPDATE_REPORT_DETRAN_TEMPORARY_COUPON//REPORT";
export const UPDATE_REPORT_DETRAN_TAXES_COUPON = "UPDATE_REPORT_DETRAN_TAXES_COUPON//REPORT";
export const CLEAR_REPORT_DETRAN = "CLEAR_REPORT_DETRAN//REPORT";

export default {
  [UPDATE_REPORT_DETRAN](state, payload) {
    state.reportsDetran = payload;
  },
  [UPDATE_REPORT_DETRAN_FILE](state, payload) {
    state.reportsDetranFile = payload;
  },
  [UPDATE_REPORT_DETRAN_COUPON](state, payload) {
    state.reportsDetranCoupon = payload;
  },
  [UPDATE_REPORT_DETRAN_TEMPORARY_COUPON](state, payload) {
    state.reportsDetranTemporaryCoupon = payload;
  },
  [UPDATE_REPORT_DETRAN_TAXES_COUPON](state, payload) {
    state.reportsDetranTaxesCoupon = payload;
  },
  [CLEAR_REPORT_DETRAN](state) {
    state.reportsDetran = "";
  },
};
