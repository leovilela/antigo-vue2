import {
  UPDATE_REPORT_DETRAN,
  UPDATE_REPORT_DETRAN_FILE,
  UPDATE_REPORT_DETRAN_COUPON,
  UPDATE_REPORT_DETRAN_TEMPORARY_COUPON,
  UPDATE_REPORT_DETRAN_TAXES_COUPON,
  CLEAR_REPORT_DETRAN,
} from "./mutations";

export default {
  async getReportDetran({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportDetran(payload);
      commit(UPDATE_REPORT_DETRAN, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async clearReportDetran({ commit }) {
    try {
      commit(CLEAR_REPORT_DETRAN);
    } catch (error) {
      throw error;
    }
  },
  async getReportDetranFile({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportDetranFile(payload);
      commit(UPDATE_REPORT_DETRAN_FILE, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getReportDetranCoupon({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportDetranCoupon(payload);
      commit(UPDATE_REPORT_DETRAN_COUPON, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getReportDetranTaxesCoupon({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportDetranTaxesCoupon(payload);
      commit(UPDATE_REPORT_DETRAN_TAXES_COUPON, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getReportDetranSendEmail({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportDetranSendEmail(payload);
      commit(UPDATE_REPORT_DETRAN_TEMPORARY_COUPON, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
