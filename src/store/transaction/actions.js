/* eslint-disable func-names */
// eslint-disable-next-line func-names

import {
  CLEAR_INSTALMENTS,
  CLEAR_SELECTEDINSTALMENT,
  CLEAR_TRANSACTION,
  UPDATE_BTCONCLUIRTRANSACAO,
  UPDATE_CARDBRANDS,
  UPDATE_COEFFICIENTS,
  UPDATE_DADOSVARIAVEIS,
  UPDATE_FIELDS,
  UPDATE_FINANCE_SERVICE,
  UPDATE_FORMDATA2,
  UPDATE_LISTFILTERED,
  UPDATE_OPENTRANSACTION,
  UPDATE_REQUIREDFIELDSKEYS,
  UPDATE_RESPOSTACODE,
  UPDATE_RESPOSTATEXT,
  UPDATE_RETORNOATIVO,
  UPDATE_RETURNLIST,
  UPDATE_SELECTEDCARD,
  UPDATE_SELECTINSTALMENT,
  UPDATE_SIMULATIONINSTALMENT,
  UPDATE_TRANSACTIONOBJ,
  UPDATE_TRANSACTIONTYPE,
  UPDATE_TRANSACTIONTYPES,
  UPDATE_TRANSACTION_TYPES_GROUP_FEE,
  UPDATE_TYPEOFSERVICE,
  UPDATE_VALUETOTAL,
} from "./mutations";

import { HandlerUtil } from "~/utils/handler.utils";
import endpoints from "~/utils/endpoints/transaction";
import uniq from "lodash/uniq";

const Handler = HandlerUtil;

export default {
  requiredFieldsKeys({ commit }, payload) {
    commit(UPDATE_REQUIREDFIELDSKEYS, payload);
    return payload;
  },
  async getTransactionTypes({ commit }, payload) {
    const serviceId = payload.serviceId;
    try {
      const transactionTypes = await this.$services.transaction.getTransactionTypes(
        serviceId,
      );
      commit(UPDATE_TRANSACTIONTYPES, transactionTypes);
      return transactionTypes;
    } catch (error) {
      throw error;
    }
  },
  selectedCard({ commit }, payload) {
    commit(UPDATE_SELECTEDCARD, payload);
  },
  updateTypeOfService({ commit }, payload) {
    try {
      commit(UPDATE_TYPEOFSERVICE, payload);
      return payload;
    } catch (error) {
      throw error;
    }
  },
  clearTransactionTypes({ commit }) {
    commit(UPDATE_TRANSACTIONTYPES, []);
  },

  async getTransactionTypesGroupFee({commit}, serviceId) {
    try {
      const response = await this.$services.transaction.getTransactionTypesGroupFee(serviceId)
      commit(UPDATE_TRANSACTION_TYPES_GROUP_FEE, response)
    } catch (error) {
      console.error(error);
      commit(UPDATE_TRANSACTION_TYPES_GROUP_FEE, [])
    }
  },

  async getTransactionCoefficients({ commit, dispatch }, payload) {
    try {
      if (!payload) return false;
      const result = await this.$services.transaction.getTransactionCoefficients(
        payload,
      );
      if (!result) {
        return false;
      }
      commit(UPDATE_COEFFICIENTS, result);
      dispatch("mountListInstallment", result);
      return result;
    } catch (error) {
      throw error;
    }
  },
  async mountListInstallment({ commit, dispatch }, payload) {
    let numeroParcelas = payload.length;
    const listaCoeficientes = payload.map((value, index) => {
      value.posicao = index
      return value
    });
    let numeroRetornos = 0;
    let retornoAtivo = 0;

    const rtypes = listaCoeficientes.map(x => x.rType);
    const listaRetornos = uniq(rtypes);

    if (numeroParcelas > 12) {
      numeroRetornos = numeroParcelas / 12;
      numeroParcelas = 12;
    }

    commit(UPDATE_RETURNLIST, listaRetornos);
    dispatch("simulationTable", retornoAtivo);
  },

  updateRetornoAtivo({ commit, dispatch }, payload) {
    commit(UPDATE_RETORNOATIVO, payload);
    dispatch("simulationTable", payload);
  },
  clearRetornoAtivo({ commit }, payload) {
    commit(UPDATE_RETORNOATIVO, payload);
  },
  getGroupReturn({ commit, state }, payload) {
    if (!state.coefficients) return;
    const filteredList = state.coefficients.filter(
      elementoatual => elementoatual.rType == payload,
    );
    commit(UPDATE_LISTFILTERED, filteredList);
    return filteredList;
  },

  saveTransactionType({ commit }, payload) {
    commit(UPDATE_TRANSACTIONTYPE, payload);
  },

  saveTotalValue({ commit }, payload) {
    commit(UPDATE_VALUETOTAL, payload);
    return payload;
  },

  clearSelectInstalment({ commit }) {
    commit(CLEAR_SELECTEDINSTALMENT);
  },

  clearTotalDebits({ commit }) {
    commit(UPDATE_VALUETOTAL, 0);
  },
  clearSimulation({ commit, rootState }) {
    if (rootState.criouSimulacao == true) {
      commit("criaSimulacao", false, { root: true });
    }
  },
  saveDadosVariaveis({ commit }, payload) {
    commit(UPDATE_DADOSVARIAVEIS, payload);
    return payload;
  },
  updateBtConcluirTransacao({ commit }, payload) {
    commit(UPDATE_BTCONCLUIRTRANSACAO, payload);
    return payload;
  },
  updateOpenTransaction({ commit }, payload) {
    commit(UPDATE_OPENTRANSACTION, payload);
    return payload;
  },
  novaTransacao(state, el) {
    el.retorno = el.retorno == null ? "" : el.retorno;

    state.novaTransacao.valorTotal = el.number_valor_transacao;
    state.novaTransacao.tipo_transacao = el.tipo_transacao;
    state.novaTransacao.parcelas = el.parcelaSelecionada;
    state.novaTransacao.retorno = el.retorno;
    state.novaTransacao.afiliado = el.affiliateID;
  },
  async enviarDadosTransacao({
    commit, dispatch, state, rootState,
  }) {
    let switchreleasedValue;
    let switchtransactionValue;
    let parcela;
    let tratParcela;
    let installmentModeId;

    if (state.openTransaction) {
      return;
    }
    commit(UPDATE_BTCONCLUIRTRANSACAO, true);
    commit(UPDATE_OPENTRANSACTION, true);

    let selectArr = !state.selectInstalment.length
      ? state.selectInstalment
      : state.selectInstalment[state.selectInstalment.length - 1];

    let centroCusto = state.transactionType == 1 || state.transactionType == 4
      ? "cliente"
      : "lojista";

    let coefficient = selectArr.coeficienteTotal;

    installmentModeId = selectArr.parcela;

    if (state.transactionType == 1 || state.transactionType == 8) {
      installmentModeId = 0;
    }

    if (centroCusto == "cliente") {
      switchreleasedValue = state.valueTotal * (1 + selectArr.rAliquot / 100);
      switchtransactionValue = state.valueTotal * coefficient;
      parcela = selectArr.ParcelaComCoeficiente;
    } else {
      tratParcela = selectArr.parcela == 0 ? 1 : selectArr.parcela;
      switchtransactionValue = state.valueTotal;
      switchreleasedValue = state.valueTotal * coefficient;
      parcela = state.valueTotal / tratParcela;
    }

    let finalizaTransacao = {
      affiliateId: rootState.usuario.clientID,
      serviceType: state.typeOfservice,
      rType: state.retornoAtivo,
      rAliquot: selectArr.rAliquot,
      coefficient, // coeficiente total utilizado
      installmentModeId,
      transactionValue: switchtransactionValue, // valor que o cliente pagará
      releasedValue: switchreleasedValue, // valor que o EC receberá
      paidInstallment: parcela, // valor da parcela
      transactionTypeId: state.transactionType,
      cardBrandType: state.selectedCard,
      fees: 0,
      discount: 0, // campo prevendo descontos
      transactionData: {},
      fieldKeys: [],
    };

    state.fields.map((f) => {
      finalizaTransacao.transactionData[f.fieldKey] = {
        fieldKey: f.fieldKey,
        typeContent: f.typeContent,
        fieldValue: state.dadosVariaveis.dadosTransacao[f.fieldKey],
      };
    });

    state.fields.map((f) => {
      finalizaTransacao.fieldKeys.push({
        fieldKey: f.fieldKey,
        typeContent: f.typeContent,
        fieldValue: state.dadosVariaveis.dadosTransacao[f.fieldKey],
      });
    });

    commit(UPDATE_TRANSACTIONOBJ, finalizaTransacao);
    await dispatch("concluirTransacao", finalizaTransacao);
  },

  async newPayment({ commit, dispatch }, payload) {
    try {
      const payment = await this.$services.detran.newPayment({ payload });

      // throw Object.assign({}, {
      //   status: 412,
      //   msg: "CLIENT_NOT_VALID",
      // });

      return payment;
    } catch (error) {
      throw error;
    }
  },

  async concluirTransacao({
    commit, dispatch, state, rootState,
  }, payload) {
    // remove mensagens de alerta da resposta
    commit(UPDATE_RESPOSTATEXT, null);
    commit(UPDATE_RESPOSTACODE, null);

    // limpa simulação
    if (rootState.criouSimulacao == true) {
      commit("criaSimulacao", false, { root: true });
    }

    try {
      const result = await this.$services.transaction.createTransaction(
        payload,
      );
      if (!result) {
        return false;
      }
      try {
        if (
          rootState.utils.historyUrl == "/debitos-veiculares/detran/ipva"
        ) {
          const payment = await dispatch("newPayment", result);
          if (!payment) return;
        }
        const jsonResult = JSON.stringify(result);
        dispatch("detran/saveTransactionID", result, { root: true });
        commit(UPDATE_FORMDATA2, jsonResult);

        await dispatch("sendServerHeaders", state.formdata2);

        await dispatch("modalControl", {
          api: "transacaostatus",
          modalContent: result,
        });
        commit(UPDATE_BTCONCLUIRTRANSACAO, false);
        commit(UPDATE_OPENTRANSACTION, false);

        return result;
      } catch (err) {
        commit(UPDATE_BTCONCLUIRTRANSACAO, false);
        commit(UPDATE_OPENTRANSACTION, false);

        await dispatch("modalControl", {
          api: "erro",
          modalContent: "Erro do servidor",
        });

        console.log(err);
      }
    } catch (error) {
      commit(UPDATE_BTCONCLUIRTRANSACAO, false);
      commit(UPDATE_OPENTRANSACTION, false);

      throw error;
    }
  },

  modalControl({ commit }, payload) {
    $nuxt.$emit("openModal", payload);
  },

  async sendServerHeaders({ commit, dispatch, state }, payload) {
    const self = this;
    const url = endpoints.connector.https;
    const formdata2 = state.formdata2.length > 0 ? state.formdata2 : payload
    let respostaServer;
    let resposta;
    const dadosTransaction = JSON.parse(formdata2);
    const formData = new FormData();
    await dispatch("activateWindowBlock");
    formData.append("data", formdata2);
    const request = new XMLHttpRequest();

    request.onreadystatechange = async function readyStateChangeHandler() {
      if (this.readyState == 4 && this.status == 200) {
        resposta = JSON.parse(this.response);

        dispatch("closeModal");

        // if (resposta.Message) {
        await self.$services.transaction.verifyTransaction(resposta);
        // }
        dispatch("modalControl", {
          api: "transacaoresposta",
          modalContent: resposta,
        });

        commit(UPDATE_RESPOSTATEXT, resposta.Message);
        commit(UPDATE_RESPOSTACODE, resposta.Code);
      } else if (this.readyState == 4 && this.status == 0) {

        resposta = {
          AppVersion: "0",
          Answer: "0",
          Code: "0",
          Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
        };
        respostaServer = {
          AppVersion: "0",
          Answer: "0",
          Code: dadosTransaction.id,
          Message: "Aplicativo não responde. Favor reiniciar o Listo Fácil.",
        };
        dispatch("closeModal");
        await self.$services.transaction.verifyTransaction(respostaServer);
        dispatch("modalControl", {
          api: "transacaoresposta",
          modalContent: resposta,
        });

        commit(UPDATE_RESPOSTATEXT, "Aplicativo sem resposta");
        commit(UPDATE_RESPOSTACODE, "0");
      }
    };

    request.open("POST", url, true);
    request.setRequestHeader("Accept", "*/*");
    request.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded",
    );
    request.send(formdata2);
  },

  activateWindowBlock() {
    const unloadWindowEvent = window.attachEvent
      ? "onbeforeunload"
      : "beforeunload"; // / make IE7, IE8 compatible
    this.confirmExitlistenerID = Handler().addListener(
      window,
      unloadWindowEvent,
      this.confirmExitHandler,
    );
  },

  confirmExitHandler(e) {
    // For >=IE7, Chrome, Firefox
    this.exited = true;
    setTimeout(() => {
      setTimeout(() => {
        // run only if user cancel exit
        this.exited = false;
      }, 1000);
    }, 1);

    (e || window.event).returnValue = confirmExitMessage;
    return confirmExitMessage;
  },

  simulationTable({ commit, dispatch, state }) {
    let valorParcela;
    let valorParcelaComCoeficiente;
    let valorParcelaComCoeficienteNoRound;
    let totalComvalorParcelaComCoeficiente;
    const parcelasSimulacao = [];
    dispatch("getGroupReturn", state.retornoAtivo);
    const retornoAtivo = state.filteredList;

    const valueTotal = state.valueTotal;
    if (!retornoAtivo) return;
    for (const value of retornoAtivo) {
      const installmentModeId = value.installmentModeId == 0 ? 1 : value.installmentModeId;
      valorParcela = valueTotal / installmentModeId;
      valorParcelaComCoeficiente = valueTotal * value.coefficient;
      totalComvalorParcelaComCoeficiente = valorParcelaComCoeficiente * installmentModeId;
      valorParcelaComCoeficienteNoRound = valueTotal * value.coefficient;
      parcelasSimulacao.push({
        value: valueTotal,
        parcela: installmentModeId,
        ParcelaComCoeficiente: valorParcelaComCoeficiente,
        valorParcelaOriginal: valorParcela,
        totalParcelas: totalComvalorParcelaComCoeficiente,
        parcelaOriginal: value.posicao,
        coeficienteTotal: value.coefficientTotal,
        rAliquot: value.rAliquot,
        coeficiente: value.coefficient,
        liberadoComCoeficiente: valueTotal * (1 + value.rAliquot / 100),
      });
    }
    commit(UPDATE_SIMULATIONINSTALMENT, parcelasSimulacao);
  },

  closeModal({ commit, dispatch, state }) {
    $nuxt.$emit("toggleModal", null);
  },

  clearInstalments({ commit }) {
    commit(CLEAR_INSTALMENTS);
  },

  clearTransaction({ commit }) {
    commit(CLEAR_TRANSACTION);
  },

  installmentSelect({ commit }, payload) {
    commit(UPDATE_SELECTINSTALMENT, payload);
    return payload;
  },

  async getFields({ commit }, payload) {
    let pos = 0;
    try {
      if (typeof payload === "object") {
        pos = payload[0].serviceId;
      } else {
        pos = payload;
      }
      const fields = await this.$services.transaction.getFields(pos);
      commit(UPDATE_FIELDS, fields);
      return fields;
    } catch (error) {
      throw error;
    }
  },

  async getCardBrands({ commit }, payload) {
    try {
      const cardBrands = await this.$services.transaction.getCardBrands();
      commit(UPDATE_CARDBRANDS, cardBrands);
      return cardBrands;
    } catch (error) {
      throw error;
    }
  },
  clearFields({ commit }) {
    commit(UPDATE_FIELDS, []);
  },
  async getFinanceService({ commit }) {
    try {
      const financeServices = await this.$services.transaction.getFinanceService();
      commit(UPDATE_FINANCE_SERVICE, financeServices);
      return Promise.resolve(financeServices);
    } catch (error) {
      throw error;
    }
  },
};
