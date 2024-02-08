import {
  UPDATE_CONTRACT_STATUS, UPDATE_REPORT_FINANCING, UPDATE_REPORT_FINANCING_FILE, UPDATE_REPORT_FINANCING_DETAILS, UPDATE_DOCUMENT_TYPE, UPDATE_STATUS_LOAN,
} from "./mutations";

export default {
  async getContractStatus({ commit }, payload) {
    try {
      const status = await this.$services.report.getContractStatus(payload);
      commit(UPDATE_CONTRACT_STATUS, status);
      return status;
    } catch (error) {
      throw error;
    }
  },
  async getReportFinancing({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportFinancing(payload);
      commit(UPDATE_REPORT_FINANCING, response.data);
      return JSON.parse(response.headers["x-pagination"]).TotalPages;
    } catch (error) {
      throw error;
    }
  },
  async getReportFinancingFile({ commit }, payload) {
    try {
      const response = await this.$services.report.getReportFinancingFile(
        payload,
      );
      commit(UPDATE_REPORT_FINANCING_FILE, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getReportFinancingDetails({ commit }, registerLoanId) {
    try {
      const response = await this.$services.report.getReportFinancingDetails(
        registerLoanId,
      );
      commit(UPDATE_REPORT_FINANCING_DETAILS, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
  async getDocumentType({ commit }, payload) {
    try {
      const response = await this.$services.report.getDocumentType(payload);
      commit(UPDATE_DOCUMENT_TYPE, response);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
