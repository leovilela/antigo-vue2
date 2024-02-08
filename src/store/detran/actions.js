
import {
  UPDATE_DEBITS,
  SAVE_DATA,
  SAVE_BOLETOS,
  CLEAN_CLIENT,
  LIST_FILTERS,
  SAVE_TRANSACTION,
  CLEAN_TRANSACTION,
  CHECKBLOCKTIME,
  REQUIREDFIELDS,
  STATUSBUSCA,
  UPDATE_SERVICEDETRAN,
  SAVE_TRANSACTIONID,
} from "./mutations";
import Ipva from "./ipva";

export default {
  async statusBusca({ commit }, data) {
    commit(STATUSBUSCA, data);
  },
  async activePaymentDetran({ commit }, data) {
    commit(ACTIVEPAYMENTDETRAN, data);
  },
  async saveData({ commit, dispatch }, data) {
    commit(SAVE_DATA, data);
    await dispatch("getDebits", data);
  },
  async requiredFields({ commit }) {
    try {
      const getRequiredFields = await this.$services.detran.getRequiredFields();
      commit(REQUIREDFIELDS, getRequiredFields.result);
    } catch (error) {
      throw error;
    }
  },
  async checkBlockTime({ commit }) {
    try {
      const getTime = await this.$services.detran.getCheckBlockTime();
      const time = getTime.result;
      const originTime = time.serverTime;
      const startTime = time.start_block_time;
      const finishTime = time.finish_block_time;
      let resultComparition = false;

      // originTime = "2019-11-21T21:00:38.403Z";

      const a = startTime;
      const b = finishTime;
      const aa1 = a.split(":");
      const aa2 = b.split(":");

      const dOrigin = new Date(originTime);

      const ddOriginDay = dOrigin.getDate();
      const ddOriginMouth = dOrigin.getMonth();
      const ddOriginYear = dOrigin.getFullYear();

      // console.log({ dOrigin });
      const d1 = new Date(
        ddOriginYear,
        ddOriginMouth,
        ddOriginDay,
        parseInt(aa1[0], 10),
        parseInt(aa1[1], 10),
        parseInt(aa1[2], 10),
      );
      const d2 = new Date(
        ddOriginYear,
        ddOriginMouth,
        ddOriginDay,
        parseInt(aa2[0], 10),
        parseInt(aa2[1], 10),
        parseInt(aa2[2], 10),
      );
      const dd1 = d1.valueOf();
      const dd2 = d2.valueOf();

      const ddOriginHours = dOrigin.getHours();
      const ddOriginMinutes = dOrigin.getMinutes();
      const ddOriginSeconds = dOrigin.getSeconds();

      const d0 = new Date(
        ddOriginYear,
        ddOriginMouth,
        ddOriginDay,
        parseInt(ddOriginHours, 10),
        parseInt(ddOriginMinutes, 10),
        parseInt(ddOriginSeconds, 10),
      );

      const dd0 = d0.valueOf();

      resultComparition = dd2 < dd0 && dd0 < dd1 ? true : false;

      commit(CHECKBLOCKTIME, resultComparition);
    } catch (error) {
      throw error;
    }
  },
  async getDebits({ commit, dispatch }, payload) {
    try {
      const simulation = await this.$services.detran.getListDebits({ payload });
      const trib = simulation.result.tributos;
      const tribAll = simulation;
      const tributos = [];
      const ipvas = {};

      if (!trib) {
        const uniqueSimulationTributs = { result: tribAll.result.mensagem };
        commit(UPDATE_DEBITS, uniqueSimulationTributs);
        return uniqueSimulationTributs;
      }

      trib.forEach((t) => {
        switch (t.operationType) {
          case "IPVA": {
            t.filterOT = "ipva";
            let ipva = ipvas[t.ano];
            if (!ipva) {
              ipvas[t.ano] = new Ipva(t.ano);
              ipva = ipvas[t.ano];
            }
            switch (t.parcela) {
              case 1:
                ipva.parcela1 = t;
                break;
              case 2:
                ipva.parcela2 = t;
                break;
              case 3:
                ipva.parcela3 = t;
                break;
              default:
                ipva.parcelaUnica = t;
                break;
            }
            break;
          }
          case "INFRACAO":
            t.filterOT = "multas";
            tributos.push(t);
            break;
          case "DPVAT":
            t.filterOT = "seguro_obrigatorio";
            tributos.push(t);
            break;
          case "LICENCIAMENTO":
            t.filterOT = "licenciamento";
            tributos.push(t);
            break;
          case "SEGURO_OBRIGATORIO":
            t.filterOT = "seguro_obrigatorio";
            tributos.push(t);
            break;
          default:
            t.filterOT = "outros";
            tributos.push(t);
            break;
        }
      });

      for (const c in ipvas) {
        tributos.push(ipvas[c]);
      }

      simulation.result.tributos = tributos;
      const unique = Array.from(new Set(tributos.map(t => t.filterOT)));
      const uniqueSimulationTributs = { ...simulation };

      // const filters = tributos.filter(filter => filter.operationType === "IPVA");
      commit(UPDATE_DEBITS, uniqueSimulationTributs);
      dispatch("mountedListFilters", unique);
      return uniqueSimulationTributs;
    } catch (error) {
      throw error;
    }
  },
  async newPayment({ commit, dispatch }, payload) {
    try {
      const payment = await this.$services.detran.newPayment({ payload });

      return payment;
    } catch (error) {
      throw error;
    }
  },
  mountedListFilters({ commit }, data) {
    commit(LIST_FILTERS, data);
    return data;
  },
  saveBoletos({ commit }, data) {
    commit(SAVE_BOLETOS, data);
    return data;
  },
  saveTransaction({ commit }, data) {
    commit(SAVE_TRANSACTION, data);
  },
  saveTransactionID({ commit }, data) {
    const dadosTransaction = data;
    commit(SAVE_TRANSACTIONID, dadosTransaction.transaction);
  },
  cleanClient({ commit }) {
    commit(CLEAN_CLIENT);
  },
  cleanTransaction({ commit }) {
    commit(CLEAN_TRANSACTION);
  },
  getServiceDetran({
    commit, rootState,
  }) {
    const idService = rootState.transaction.typesOfservices.find(
      service => service.serviceName === "DETRAN - Pagamento de Taxas",
    );
    commit(UPDATE_SERVICEDETRAN, idService);
  },
  async getTypeTransactions({
    dispatch, state,
  }) {
    dispatch(
      "transaction/getTransactionTypes",
      { serviceId: state.serviceId },
      {
        root: true,
      },
    );
  },
};
