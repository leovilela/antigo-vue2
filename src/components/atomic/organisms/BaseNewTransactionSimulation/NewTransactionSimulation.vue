<template>
  <section class="base-new-transaction-simulation">
    <Base-FormMoneyGroup
      v-bind="money"
      :placeholder="$t('pages.client-panel.placeholders.simulationValue')"
      :label="$t('pages.client-panel.labels.simulationValue')"
      name="simulationValue"
      type="text"
      class="base-new-transaction-simulation__input"
      v-model.trim="simulationValue"
    >
    </Base-FormMoneyGroup>
    <Base-Tab
      expanded
      animated
      @change="changeSimulationView"
      v-show="showActiveSimulationView"
    >
      <Base-TabItem label="Parcelas" />
      <Base-TabItem label="Transação" />
    </Base-Tab>

    <main class="base-new-transaction-simulation_costs">
      <Base-RtypeList
        :rtypeList="rTypeList"
        v-show="showRTypeList"
        @onSelectRtype="onSelectRtype"
      />
      <Base-Custos
        :options="transactionTypesGroupByFee"
        @onCustoSelected="onCustoSelected"
      />
      <section class="base-new-transaction-simulation_costs__table">
        <Base-InstallmentsTable
          :isUniqRow="isUniqRow"
          :rows="simulationInstallmentsRows"
          v-if="showSimulationTable"
          :columns="simulationColumns"
          @onSelectedInstallment="onSelectedInstallment"
        />
      </section>
      <Base-ActionButtonList
        :disabled="!disableActionButtonList"
        :simulationButton="simulationButtonExt"
        @onSimulation="onSimulation"
        @onEmail="onEmail"
        @onImprimir="onPrint"
      />
    </main>
  </section>
</template>

<script>
import { createNamespacedHelpers, mapMutations } from "vuex";
import { money } from "~/utils/currency.utils";
import columns from "./simulationTransaction.columns";
import installmentsRowsFactory from "./InstallmentsRows.factory";

const INSTALLMENT_TAB_ID = 0;
const TRANSACTION_TAB_ID = 1;

const {
  mapActions: transactionActions,
  mapState: transactionState
} = createNamespacedHelpers("transaction");

const { mapState: authState } = createNamespacedHelpers("auth");

const {
  mapState: affiliateState,
  mapActions: affiliateActions,
  mapMutations: affiliateMutations
} = createNamespacedHelpers("affiliate");

export default {
  computed: {
    ...affiliateState(["affiliate", "affiliateContact"]),
    ...transactionState([
      "typesOfservices",
      "transactionTypes",
      "valueTotal",
      "simulationInstalment",
      "listaRetornos",
      "coefficients",
      "transactionTypesGroupByFee",
    ]),
    ...authState(["user"]),
    rTypeList() {
      const rTypes = this.listaRetornos.map(rType => ({
        label: `R${rType}`,
        value: rType
      }));
      if (rTypes.length === 0) {
        return [];
      }
      rTypes[0].active = true;
      return rTypes;
    },
    showRTypeList() {
      return (
        this.rTypeList.length > 1 &&
        this.activeSimulationView === TRANSACTION_TAB_ID
      );
    },
    showSimulationTable() {
      return this.simulationValue > 0 && this.transactionTypeIDSelected > 0;
    },
    isUniqRow() {
      return this.simulationInstallmentsRows.length === 1;
    },
    simulationColumns() {
      return this.columns.filter(column =>
        column.transactionTypesEnabled.includes(this.transactionTypeIDSelected)
      );
    },
    simulationInstallmentsRows() {
      return installmentsRowsFactory(
        this.transactionTypeIDSelected,
        this.simulationInstalment
      );
    },
    showActiveSimulationView() {
      return this.transactionTypeIDSelected === 4 && this.rTypeList.length > 1;
    },
    disableActionButtonList() {
      return !!this.selectedInstallment;
    }
  },
  data() {
    return {
      transactionTypeIDSelected: 0,
      money,
      columns,
      rTypeSelected: 0,
      selectedInstallment: null,
      simulationButtonExt: {
        label: "Nova transação",
        type: "transaction"
      },
      simulationValue: 0,
      activeSimulationView: 0,
    };
  },
  beforeMount() {
    this.clearTransaction();
    this.getTransactionTypesGroupFee(this.typesOfservices[0].serviceId)
  },
  methods: {
    ...transactionActions([
      "getTransactionCoefficients",
      "updateTypeOfService",
      "saveTotalValue",
      "mountListInstallment",
      "updateRetornoAtivo",
      "clearTransaction",
      "installmentSelect",
      "getTransactionTypesGroupFee",
    ]),
    ...mapMutations(['startLoading', 'finishLoading']),
    changeSimulationView(index) {
      this.activeSimulationView = index;
    },
    onCustoSelected($event) {
      this.transactionTypeIDSelected = $event.transactionTypeID;
      this.updateRetornoAtivo(0);
      this.selectedInstallment = null;
      this.getTransactionCoefficients($event.transactionTypeID);
    },
    onSelectRtype(rType) {
      this.rTypeSelected = rType.value;
      this.updateRetornoAtivo(rType.value);
    },
    onSelectedInstallment(installment) {
      this.selectedInstallment = installment;
      this.installmentSelect(installment.meta);
    },
    onSimulation() {
      const valores = {
        retorno: this.rTypeSelected,
        tipo_transacao: this.transactionTypeIDSelected,
        number_valor_transacao: this.simulationValue,
        parcelaSelecionada: this.selectedInstallment.meta,
        affiliateID: this.user.id
      };
      this.$store.commit("novaTransacao", valores);
      this.$store.commit("criaSimulacao", true);
      this.updateTypeOfService(this.typesOfservices[0]);
      this.$router.push("/nova-transacao");
    },
    onEmail() {
      const printObj = {
        valorSimulado: this.simulationValue,
        tipoTransacao: this.transactionTypeIDSelected,
        dadosParcela: [this.selectedInstallment.meta],
      };

      this.$nuxt.$emit("toggleModal", {
        api: "send",
        code: "200",
        modalContent: printObj,
      });
    },
    async onPrint() {
      let nomeFantasia = null;
      this.startLoading();
      try {
        nomeFantasia = this.affiliate.simpleName;
        const telefone = this.affiliateContact[0].phones[0].value;
        const printObj = {
          valorSimulado: this.simulationValue,
          tipoTransacao: this.transactionTypeIDSelected,
          dadosParcela: [this.selectedInstallment.meta],
          parcelas: this.simulationInstalment,
          parcelaSelecionada: this.selectedInstallment.meta,
          nomeFantasia,
          telefone
        };
        this.$nuxt.$emit("printComponent", {
          printElement: true,
          printObject: printObj,
          printType: "simulacao"
        });
      } catch (error) {
        console.warn(error);
        return this.$swal({
          title: "Desculpe",
          text:
            "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo"
        });
      } finally {
        this.finishLoading();
      }
    }
  },
  watch: {
    simulationValue(value) {
      this.saveTotalValue(value);
      this.mountListInstallment(this.coefficients);
    }
  }
};
</script>

<style lang="less" scoped >
@import "./style.less";
</style>
