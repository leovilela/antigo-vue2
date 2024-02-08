import { BaseService }from "./base.service";
import account from "../utils/endpoints/account";
import report from "../utils/endpoints/report";

export class ReportService extends BaseService {
  async getContractStatus() {
    try {
      return await this.get(`${report.list.contractStatus}`);
    } catch (error) {
      throw error;
    }
  }

  async getReportFinancing(requestObj) {
    try {
      return await this.post(`${report.list.financing}`, requestObj, {
        headers: {
          "Access-Control-Expose-Headers": "X-Pagination",
        },
        getHeaders: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getReportFinancingFile(response) {
    try {
      return await this.post(`${report.list.reportFile}`, response, {
        responseType: "blob",
        getHeaders: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async getReportDetranFile(response) {
    try {
      return await this.post(`${report.list.reportDetranFile}`, response, {
        responseType: "blob",
      });
    } catch (error) {
      throw error;
    }
  }

  async getReportDetranCoupon(response) {
    try {
      return await this.post(`${report.list.reportDetranCoupon}`, response, {
        responseType: "blob",
      });
    } catch (error) {
      throw error;
    }
  }

  async getReportDetranTaxesCoupon(response) {
    try {
      return await this.$axios.post(`${report.list.reportDetranTaxesCoupon}`, response, {
        responseType: "blob",
      });
    } catch (error) {
      throw error;
    }
  }

  async getReportDetranSendEmail(response) {
    try {
      return await this.$axios.post(`${report.list.reportDetranSendEmail}`, response, {
        responseType: "blob",
      });
    } catch (error) {
      throw error;
    }
  }

  async getReportFinancingDetails(contractId) {
    try {
      return await this.get(report.list.details(contractId));
    } catch (error) {
      throw error;
    }
  }

  async getDocumentType() {
    try {
      return await this.get(report.list.documentType);
    } catch (error) {
      throw error;
    }
  }

  async getReportDetran(requestObj) {
    try {
      return await this.post(`${report.list.detranReport}`, requestObj, {
        headers: {
          "Access-Control-Expose-Headers": "X-Pagination",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async pushNotification(cpf) {
    try {
      return await this.post(`${account.client.contractSignaturePush(cpf)}`);
    } catch (error) {
      throw error;
    }
  }
}
