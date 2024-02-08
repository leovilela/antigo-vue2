import { SET_STATUS_REGISTER, SET_ORDER_REGISTER, CLEAN_STATUS, CLEAN_REGISTER, SET_BLOCK_ID, UPDATE_BLOCK_MODEL, SET_REGISTER_FORM_ID, SET_BLOCKS_AGGREGATION, SET_SIMULATION_SIGN_KEY, SET_REGISTER_FORM_SIGN_KEY, SET_STATUS_REGISTER_ID, SET_HAS_STEP_SAVED } from "./mutations"
import { errorTreatment } from "../../utils/store.utils"

const blocksMapped = new Map()

blocksMapped.set("registerDataPf", "Dados Cadastrais")
blocksMapped.set("registerDataPj", "Dados Cadastrais")
blocksMapped.set("spouse", "Cônjuge/ Companheiro (a)")
blocksMapped.set("personalAddress", "Residência")
blocksMapped.set("dataProfessional", "Dados Profissionais")
blocksMapped.set("bankReferences", "Referências Bancárias")
blocksMapped.set("dataPatrimony", "Dados Patrimoniais")
blocksMapped.set("pep", "Declaração Obrigatória Pessoa Exposta Politicamente")
blocksMapped.set("shareholder", "Acionistas (Sócios, Administradores)")
blocksMapped.set("corporatePartnerShareHolder", "Participação em Outras Empresas")
blocksMapped.set("dataPatrimony", "Dados Patrimoniais")
blocksMapped.set("bankReferences", "Referências Bancárias")
blocksMapped.set("revenues", "Faturamento (Últimos 02 anos)")
blocksMapped.set("vehicleFinancing", "Financiamento de Veículos")

export default {

  /**
   *
   * @param {number} formTypeID  = 1 - RegistrationData
   * @param {number} formTypeID  = 2 - CET
   * @param {number} formTypeID  = 3 - CCB
   */
  async getBlocksAggregation({ commit, state }, formTypeID) {
    commit('startLoading', null, { root: true })
    try {
      const blocksAggregated = this.$services.loan.getBlocksAggregation(formTypeID, state.registerFormId)
      commit(SET_BLOCKS_AGGREGATION, blocksAggregated)
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_BLOCKS_AGGREGATION, payload: [] })) {
        return
      }
      return this.$services.swal('Falha ao resgatar', `${blocksMapped.get(name)}`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },

  async getRegistrationFormData({ commit, state }) {
    try {
      commit('startLoading', null, { root: true })
      let content = await this.$services.loan.getSignatureStatus();     
      let formId = !content.registrationForm.registrationFormId ? 0 : content.registrationForm.registrationFormId;       
      commit(SET_REGISTER_FORM_ID, formId)
    } catch (error) {      
      return this.$services.swal('Falha ao resgatar', `RegistrationFormID`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },

  async getBlockWithName({ commit, state }, name) {
    try {
      commit('startLoading', null, { root: true })
      let content = await this.$services.loan.getBlockWithName(name, state.registerFormId)
      commit(UPDATE_BLOCK_MODEL, { name, content })
      if (!content.registrationFormID || state.registerFormId) {
        return Promise.resolve(content)
      }
      commit(SET_REGISTER_FORM_ID, content.registrationFormID || content.registrationFormId)
      return Promise.resolve(content)
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: UPDATE_BLOCK_MODEL, payload: { name, content: {} } })) {
        return
      }
      return this.$services.swal('Falha ao resgatar', `${blocksMapped.get(name)}`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async createOrUpdateBlockWithName({ commit, state, dispatch }, { name, blockData, hasToUpdate = true }) {
    let response;
    const id = blockData.ID ? blockData.ID : blockData.RegistrationFormID
    try {
      commit('startLoading', null, { root: true })
      if (id && hasToUpdate) {
        response = await this.$services.loan.updateBlockWithName(name, id, blockData)
      } else {
        response = await this.$services.loan.saveBlockWithName(name, blockData)
        if (response.registrationFormId) {
          commit(SET_REGISTER_FORM_ID, response.registrationFormId)
        }

      }

      return Promise.resolve(response)
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: UPDATE_BLOCK_MODEL, payload: { name, content: {} } })) {
        return
      }
      console.warn(`${blocksMapped.get(name)}`);
      // this.$services.swal("Falha ao atualizar", `${blocksMapped.get(name)}`).callDanger()
      this.$services.swal("Dados inválidos", '').callDanger()
      throw error
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async signRegisterForm({ state, commit }) {
    try {
      commit('startLoading', null, { root: true })
      const response = await this.$services.loan.signRegisterForm(state.registerFormId)
      commit(SET_REGISTER_FORM_SIGN_KEY, response)
    } catch (error) {
      if (!errorTreatment(error, commit, { mutationName: SET_REGISTER_FORM_SIGN_KEY, payload: {} })) {
        return
      }
      this.$services.swal('Erro', `Falha ao buscar dados de assinatura`).callDanger()
      throw error
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  async setRegisterStep({ state, commit }) {
    try {
      if (state.hasStepSaved) {
        await this.$services.loan.updateRegisterStatus(state.registerFormId, {
          CadastralFileID: state.registerFormId,
          StepsCadastralFileID: state.orderFlow.id,
        })
        return
      }
      await this.$services.loan.setRegisterStatus({
        CadastralFileID: state.registerFormId,
        StepsCadastralFileID: state.orderFlow.id,
      })
      commit(SET_HAS_STEP_SAVED)
    } catch (error) {
      if (error.status === 204) {
        return
      }
      throw error
    }
  },
  async getRegisterStatus({ commit, state, getters }) {
    try {
      commit('startLoading', null, { root: true })
      const response = await this.$services.loan.getRegisterStatus(state.registerFormId)
      const status = {
        completed: response.completed,
        signed: response.signed,
        signedCcbCet: response.signedCcbCet,
        active: response.active,
        transaction: response.transaction
      }
      commit(SET_STATUS_REGISTER, status)
      if (!response.step) {
        return Promise.resolve(status)
      }
      commit(SET_ORDER_REGISTER, {
        id: response.step.stepsCadastralFileID,
        position: getters.steps.find(step => step.id === response.step.stepsCadastralFileID).position,
      })
      commit(SET_HAS_STEP_SAVED)
      return Promise.resolve(status)
    } catch (error) {
      if (errorTreatment(error, commit)) {
        return
      }
      return this.$services.swal('Erro', `Falha ao carregar o status da ficha cadastral`).callDanger()
    } finally {
      commit('finishLoading', null, { root: true })
    }
  },
  cleanState({ commit }) {
    commit(CLEAN_REGISTER)
    commit(CLEAN_STATUS)
  }
}
