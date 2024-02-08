import { BaseService }from "./base.service";
import account from "../utils/endpoints/account";
import endpoints from "../utils/endpoints/transaction";
import https from "https";

export class TransactionService extends BaseService {
  async getTypesOfServices() {
    try {
      return await this.get(endpoints.services.base());
    } catch (error) {
      throw error;
    }
  }

  async getTransactionTypesGroupFee(serviceId) {
    return this.get(endpoints.services.transactionTypesGroupFee(serviceId))
  }

  async getTransactionTypes(serviceOptionType) {
    try {
      return await this.get(
        endpoints.services.types(serviceOptionType),
      );
    } catch (error) {
      throw error;
    }
  }

  async getFields(serviceOptionType) {
    try {
      return await this.get(
        endpoints.services.fields(serviceOptionType),
      );
    } catch (error) {
      throw error;
    }
  }

  async getDownPay(requestObj) {
    try {
      return await this.post(
        `${endpoints.finance.downPay()}`,
        requestObj,
      );
    } catch (error) {
      throw error;
    }
  }

  async getSeparatedSimulation(requestObj) {
    try {
      return await this.post(
        `${endpoints.finance.simulation()}`,
        requestObj,
      );
    } catch (error) {
      throw error;
    }
  }

  async getSeparatedDownPay(transactionTypeId = 4) {
    try {
      return await this.get(
        `${endpoints.transaction.coefficients(
          transactionTypeId,
        )}`,
      );
    } catch (error) {
      throw error;
    }
  }

  async getTransactionCoefficients(transactionType) {
    try {
      return await this.get(
        endpoints.transaction.coefficients(transactionType),
      );
    } catch (error) {
      throw error;
    }
  }

  async createTransaction(data) {
    try {
      return await this.post(endpoints.transaction.create(), data);
    } catch (error) {
      throw error;
    }
  }

  async verifyTransaction(data) {
    try {
      return await this.put(endpoints.transaction.verify(), data);
    } catch (error) {
      throw error;
    }
  }

  async verifyConfirm(data) {
    try {
      return await this.put(
        endpoints.transaction.confirm(data),
      );
    } catch (error) {
      throw error;
    }
  }

  async getCoefficients(requestObj) {
    try {
      return await this.post(
        `${endpoints.finance.coefficients()}`,
        requestObj,
      );
    } catch (error) {
      throw error;
    }
  }

  async getCETSummary(registerLoanId) {
    try {
      return await this.get(`${account.form.summaryCET(registerLoanId)}`);
    } catch (error) {
      throw error;
    }
  }

  async createContractsFinancing(requestObj) {
    try {
      return await this.post(
        `${account.form.docs()}`,
        requestObj,
      );
    } catch (error) {
      throw error;
    }
  }

  async createFinancingAgreement(requestObj) {
    try {
      return await this.post(
        `${endpoints.finance.create()}`,
        requestObj,
      );
    } catch (error) {
      throw error;
    }
  }

  getPinPadOldConnection(req, onProgressCb, onErrorCb, onAbortCb, onLoadCb) {
    const xmlRequest = new XMLHttpRequest();
    const formData = new FormData()
    Object.keys(req).forEach(key => formData.append(key, object[key]));
    xmlRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlRequest.open('POST', `${endpoints.connector.https}`, true);
    xmlRequest.onload = onLoadCb
    xmlRequest.onerror = onErrorCb
    xmlRequest.onAbort = onAbortCb
    xmlRequest.onProgress = onProgressCb
    return {request: xmlRequest, formData}
  }

  async getPinPadConnection(req, isUrlEncoded = false) {
    try {
      if (isUrlEncoded) {
        return fetch(endpoints.connector.https, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: JSON.stringify(req)
        })
      }
      return this.post(`${endpoints.connector.https}`, req, {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
    } catch (error) {
      throw error;
    }
  }

  async getServices(serviceId) {
    try {
      return await this.get(
        `${endpoints.services.fields(serviceId)}`,
      );
    } catch (error) {
      throw error;
    }
  }

  async getFinanceService() {
    try {
      return await this.get(`${endpoints.transaction.service()}`);
    } catch (error) {
      throw error;
    }
  }

  async getCardBrands() {
    try {
      return await this.get(`${endpoints.transaction.cardBrands()}`);
    } catch (error) {
      throw error;
    }
  }
}
