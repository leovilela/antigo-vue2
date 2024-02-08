import {
  CLEAN_SERVICES,
  CLEAN_SIMULATION,
  SET_CET_RESUME,
  SET_COEFFICIENTS,
  SET_CONTRACT_ID,
  SET_LIMITS,
  SET_PINPAD_DATA,
  SET_RESUME_FICHA_CADASTRAL,
  SET_SERVICES,
  SET_SIGNATURE_STATUS,
  SET_SIMULATION_SIGN_KEY,
  SET_TRANSACTION_DATA,
  SET_TRANSACTION_TYPES,
  SIGN_SIMULATION,
} from './mutations'

import { errorTreatment } from "~/utils/store.utils"
import isEmpty from 'lodash/isEmpty'

const DEFAULT_RTYPE_COEFFICIENT = 0
const DEFAULT_ALIQUOT = 0

export default {
  async getCoefficients({ commit, state }) {
    try {
      commit('startLoading', null, { root: true })
      const coefficients = await this.$services.loan.getCoefficients({
        transactionTypeId: state.transactionTypes.id,
        serviceType: state.services.id,
        releasedValue: state.transactionData.simulationValue,
        rType: DEFAULT_RTYPE_COEFFICIENT
      })
      commit(SET_COEFFICIENTS, coefficients)
      return Promise.resolve(coefficients)
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_COEFFICIENTS, payload: [] })) {
        return
      }
      this.$services.swal('Erro', `Falha ao carregar parcelas do empréstimo`).callDanger()
      throw error
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  cleanState({ commit }) {
    commit(CLEAN_SERVICES)
    commit(CLEAN_SIMULATION)
  },
  async getSignatureStatus({ commit }) {
    commit('startLoading', null, { root: true })
    try {
      const response = await this.$services.loan.getSignatureStatus()
      if (response.contract.hasPendingContract) {
        commit(SET_SIGNATURE_STATUS, response)
        commit(SET_CONTRACT_ID, response.contract.contractId)
      } else {
        commit(SET_SIGNATURE_STATUS, {})
      }
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_SIGNATURE_STATUS, payload: {} })) {
        commit(SET_SIGNATURE_STATUS, {})
        return
      }
      return this.$services.swal('Erro', `Falha ao resgatar o status da assinatura`).callDanger()
    } finally {
     commit('finishLoading', null, { root: true })
    }
  },
  async getServices({ commit, dispatch, state }) {
    commit('startLoading', null, { root: true })
    try {
      const services = await this.$services.loan.getServices()
      const service = services[0]
      commit(SET_SERVICES, { id: service.serviceId, name: service.serviceName })
      commit(SET_LIMITS, {
        available: service.available,
        maximum: service.maximum,
        minimum: service.minimum,
      })
      await dispatch('getTransactionTypes')
      await dispatch('getSignatureStatus');
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: CLEAN_SERVICES })) {
        commit(SET_LIMITS, {})
        commit(SET_SERVICES, {})
        return
      }
      return this.$services.swal('Erro', `Falha ao carregar os serviços de empréstimo`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async getTransactionTypes({ commit, state }) {
    try {
      const transactionTypes = await this.$services.loan.getTransactionTypes(state.services.id)
      const transactionType = transactionTypes[0]
      commit(SET_TRANSACTION_TYPES, { id: transactionType.transactionTypeID, name: transactionType.transactionTypeName });
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_TRANSACTION_TYPES, payload: {} })) {
        return
      }
      return this.$services.swal('Erro', `Falha ao carregar os tipos de transação de empréstimo`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async signContract({ state, commit, rootState }) {
    try {
      commit('startLoading', null, { root: true })
      const response = await this.$services.loan.signContract(state.contractId, rootState.loan.registerFormId)
      commit(SET_SIMULATION_SIGN_KEY, response)
      commit(SIGN_SIMULATION)
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_SIMULATION_SIGN_KEY, payload: {} })) {
        this.$services.swal('Erro', `Falha ao buscar dados de assinatura`).callDanger()
        return
      }
      this.$services.swal('Erro', `Falha ao buscar dados de assinatura`).callDanger()
      throw error
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async createTransaction({ commit, state, dispatch }, { selectedInstament, documentNumber, date, fullName }) {
    commit('startTransactionLoading', null, { root: true })
    try {
      await dispatch('getSignatureStatus')
      const transactionRequest = {
        serviceType: state.services.id,
        coefficient: selectedInstament.coefficientTotal,
        rType: DEFAULT_RTYPE_COEFFICIENT,
        rAliquot: DEFAULT_ALIQUOT,
        releasedValue: state.transactionData.simulationValue,
        transactionTypeId: state.transactionTypes.id,
        fieldKeys: [
          {
            fieldKey: 2209,
            typeContent: 'Text',
            fieldValue: documentNumber
          },
          {
            fieldKey: 2210,
            typeContent: 'Text',
            fieldValue: date
          },
          {
            fieldKey: 2211,
            typeContent: 'Text',
            fieldValue: fullName
          },
          {
            fieldKey: 2212,
            typeContent: 'Numeric',
            fieldValue: state.transactionData.simulationValue
          },
        ],
        installmentModeId: selectedInstament.installmentModeId,
        transactionValue: selectedInstament.transactionValue,
        paidInstallment: selectedInstament.transactionValue / selectedInstament.installmentModeId,
        cardBrandType: state.transactionData.cardBrandType
      }
      if (!isEmpty(state.signatureStatus) && state.signatureStatus.contract.hasPendingContract) {
        return
      }
      const pinpadData = await this.$services.loan.createTransaction(transactionRequest)
      commit(SET_PINPAD_DATA, pinpadData.connectorRequest)
      commit(SET_CONTRACT_ID, pinpadData.contractId)
      const resultTransaction = await dispatch('sendTransaction')
      if (!resultTransaction) {
        throw new Error('Connector Error')
      }
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_COEFFICIENTS, payload: [] })) {
        return
      }
      if (error.message = 'CONNECTOR_ERROR') {
        throw error;
      }
      this.$services.swal('Erro', `Falha ao carregar a transação de empréstimo`).callDanger()
      throw error;
    } finally {
      commit('finishTransactionLoading', null, { root: true })
    }
  },

  setTransactionData({ commit }, { simulationValue, cardBrandType }) {
    commit(SET_TRANSACTION_DATA, { simulationValue, cardBrandType })
  },

  async sendTransaction({ state }) {
    let connectorResponseVerify = {
      AppVersion: "0",
      Answer: "0",
      Code: state.pinpadData.id,
      Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
    }
    try {
      const connectorResponse = await this.$services.transaction.getPinPadConnection(
        state.pinpadData,
        true
      );
      const connectorResponseJson = await connectorResponse.json()
      connectorResponseVerify = connectorResponseJson

      if (connectorResponseJson.Code > 0) {
        this.$services.swal(`Status de transação: ${connectorResponseJson.Code}`, connectorResponseJson.Message).callDanger()
        return false
      }

      this.$services.swal('Transação realizada com sucesso', '').callSuccess()
      return true;

    } catch (error) {
      console.error(error);
      this.$services.swal(`Falha ao realizar a transação`, "Favor reiniciar o Listo Fácil").callDanger()
      throw {message: 'CONNECTOR_ERROR'};
    } finally {
      await this.$services.transaction.verifyTransaction(connectorResponseVerify);
    }
  },

  async getCetResume({ commit, state, rootState }, { selectedInstament }) {
    try {
      commit('startLoading', null, { root: true })
      const {installmentModeId, releasedValue } = selectedInstament;
      const payload = {
        registrationFormId: rootState.loan.registerFormId,
        amountRequest: state.transactionData.simulationValue,
        installments: installmentModeId,
        installmentsValue: releasedValue,
      }

      const response = await this.$services.loan.getCetResume(payload.registrationFormId, payload.amountRequest, payload.installments, payload.installmentsValue);

      commit(SET_CET_RESUME, response);
    } catch(error) {
      this.$services.swal(`Falha ao realizar a transação`, "Favor reiniciar o Listo Fácil").callDanger()
      throw error
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },

  async getResumeFichaCadastral({ commit, state, rootState }) {
    try {
      const id = rootState.loan.registerFormId;
      const response = await this.$services.loan.getResumeFichaCadastral(id);
      commit(SET_RESUME_FICHA_CADASTRAL, response);
    } catch(error) {
      console.error(error);
      this.$services.swal("Resumo não disponível", "").callDanger();
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
}
