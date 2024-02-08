import { BaseService }from "./base.service";
import endpoints from '../utils/endpoints/loan'
import transactionEndpoints from '../utils/endpoints/transaction'

const { loan: transactionLoan } = transactionEndpoints
const { register, simulation, form, status, clickSign } = endpoints

const REGISTER_FORM_TYPE = 1
const CONTRACT_TYPE = 2

export class LoanService extends BaseService {

  async getRegisterStatus(registerFormId) {
    return this.get(status.getStatusAndStep(registerFormId))
  }

  async getSignatureStatus() {
    return this.get(form.SignatureStatus())
  }

  async setRegisterStatus(registerStatus) {
    return this.post(status.pointFulfillmentCadastral(), registerStatus)
  }

  async updateRegisterStatus(registerFormId, registerStatus) {
    const baseUrl = status.pointFulfillmentCadastral()
    return this.put(`${baseUrl}/${registerFormId}`, registerStatus)
  }

  async signRegisterForm(registerFormId) {
    const baseUrl = clickSign.documentSign()
    return this.get(`${baseUrl}/?productType=${REGISTER_FORM_TYPE}&registrationFormId=${registerFormId}`)
  }

  async signContract(contractId, registerFormId) {
    const baseUrl = clickSign.documentSign()
    return this.get(`${baseUrl}/?productType=${CONTRACT_TYPE}&contractId=${contractId}&registrationFormId=${registerFormId}`)
  }

  /**
   * Get Block with specific name
   * @param {string} name
   */
  async getBlockWithName(name, registerFormId = 0) {
    const baseUrl = register[name]()
    return this.get(`${baseUrl}/${registerFormId}`)
  }

  /**
   * Create a block returning the id
   * @param {string} name
   * @param {Object} blockData
   * @return {number} id
   */
  async saveBlockWithName(name, blockData) {
    const baseUrl = register[name]()
    return this.post(baseUrl, blockData)
  }

  /**
   * Update a block with a id
   * @param {string} name
   * @param {number} id
   * @param {Object} blockData
   */
  async updateBlockWithName(name, registerFormId, blockData) {
    const baseUrl = register[name]()
    if (Array.isArray(blockData)) {
      return Promise.all(blockData.map(block => {
        return this.put(`${baseUrl}/${block.id}`, block)
      }))
    }
    return this.put(`${baseUrl}/${registerFormId}`, blockData)
  }

  async sendSimulation(transactionData) {
    return this.post(simulation.sendSimulation(), transactionData)
  }

  async getServices() {
    return this.get(transactionLoan.services())
  }

  async getTransactionTypes(serviceId) {
    return this.get(transactionLoan.transactionTypes(serviceId))
  }

  async getBlocksAggregationData(formTypeId, registerFormId) {
    return this.get(`${form.clickSign(formTypeId)}?id=${registerFormId}`)
  }

  async getCetResume(registrationFormId, amountRequest, installments, installmentsValue) {
    return this.get(`${form.cetResume()}?RegistrationFormId=${registrationFormId}&AmountRequest=${amountRequest}&Installments=${installments}&InstallmentsValue=${installmentsValue}`)
  }

  async getResumeFichaCadastral(registerFormId) {
    return this.get(form.resumeFichaCadastral(registerFormId));
  }

  /**
   *
   * @param {{
   * transactionTypeId,
   * rType,
   * releasedValue,
   * serviceType,
   * }} coefficientPayload
   */
  async getCoefficients(coefficientPayload) {
    return this.post(transactionLoan.coefficients(), coefficientPayload)
  }

  /**
   *
   * @param {{
   * serviceType,
   * coefficient,
   * rType,
   * rAliquot,
   * releasedValue,
   * transactionTypeId,
   * fieldKeys,
   * installmentModeId,
   * transactionValue,
   * paidInstallment,
   * cardBrandType,
   * }} transactionData
   */
  async createTransaction(transactionData) {
    return this.post(transactionLoan.create(), transactionData)
  }
}
