<template>
  <section class="base-simulation-finance">
    <Base-CarSimulatorForm
      @onSimulation="getSimulation"
      @onClearSimulation="onClearSimulation"
    />
    <article
      class="base-simulation-finance__installment"
      v-if="hasEntranceTable"
    >
      <header class="base-simulation-finance__installment__header">
        Entrada parcelada
      </header>
      <Base-InstallmentsTable
        :rows="installmentsEntranceRows"
        :columns="columns"
        @onSelectedInstallment="onSelectedInstallmentEntrance"
        installmentModePrefix="entrance"
      />
    </article>
    <article
      class="base-simulation-finance__installment"
      v-if="showInstallments"
    >
      <header class="base-simulation-finance__installment__header">
        Condições de financiamento
      </header>
      <Base-InstallmentsTable
        :rows="installmentsRowsMapped"
        :columns="columns"
        @onSelectedInstallment="onSelectedInstallment"
      />
    </article>
    <Base-ActionButtonList
      :disabled="!disableActionButtonList"
      :simulationButton="simulationButtonExt"
      @onSimulation="onSimulation"
      @onEmail="onEmail"
      @onImprimir="onImprimir"
    />
  <Base-PrintFinanceSimulation ref="printerSimulation" :transactionObj="printerObj" />
  <Base-SimulacaoNovoFinanciamentoModal :active="modals.simulacaoNovoFinanciamento" :transactionObj="printerObj" @close="modals.simulacaoNovoFinanciamento = false" />
  </section>
</template>

<script>
import columns from "./simulationFinance.columns";
import { mapState, mapActions, mapMutations, createNamespacedHelpers } from "vuex";
import { entranceRows, installmentRows } from "./simulationFinance.factory";
import { moneyFormatter } from '~/utils/currency.utils'

const {mapState: affiliateState} = createNamespacedHelpers('affiliate')

export default {
  computed: {
    ...mapState({
      separatedSimulation: state =>
        state.simulacao.financiamento.separatedSimulation,
      separatedDownPay: state => state.simulacao.financiamento.separatedDownPay
    }),
    ...affiliateState(['affiliateContact', 'affiliate']),
    disableActionButtonList() {
      if (this.hasEntranceTable) {
        return this.entranceInstallmentSelected && this.installmentSelected;
      }
      return !!this.installmentSelected;
    },
    hasEntranceTable() {
      return this.hasEntrancePayment === "yes";
    },
    installmentsEntranceRows() {
      if (this.separatedDownPay.length === 0) {
        return [];
      }
      return entranceRows(this.entranceValue, this.separatedDownPay);
    },
    installmentsRowsMapped() {
      if (this.separatedSimulation.length === 0) {
        return [];
      }
      return installmentRows(this.martketValue - this.entranceValue, this.separatedSimulation);
    },
    showInstallments() {
      return this.installmentsRowsMapped.length > 0;
    }
  },
  data() {
    return {
      columns,
      hasEntrancePayment: "",
      entranceValue: 0,
      martketValue: 0,
      entranceInstallmentSelected: null,
      installmentSelected: null,
      simulationButtonExt: {
        label: "Novo financiamento",
        type: "finance"
      },
      printerObj: {},
      vehicleYear: '',
      modals: {
        simulacaoNovoFinanciamento: false
      }
    };
  },
  beforeMount() {
    this.cleanState();
  },
  methods: {
    ...mapActions({
      getSeparatedSimulationValues:
        "simulacao/financiamento/getSeparatedSimulationValues",
      cleanState: "simulacao/financiamento/cleanState"
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    async getSimulation(simulation) {
      try {
        this.startLoading();
        await this.getSeparatedSimulationValues({
          downPayValue: simulation.vehicle.entranceValue,
          vehicleValue: simulation.vehicle.marketValue,
          vehicleYear: simulation.vehicle.year.manufactureYear,
          automobileType: simulation.vehicle.vehicleType.id
        });
        this.vehicleYear = simulation.vehicle.year.manufactureYear
        this.hasEntrancePayment = simulation.hasInstallmentEntrance;
        this.entranceValue = simulation.vehicle.entranceValue;
        this.martketValue = simulation.vehicle.marketValue;
      } catch (error) {
        console.error(error);
        this.$services
          .swal("Desculpe", "Tivemos problemas ao buscar as parcelas")
          .callDanger();
      } finally {
        this.finishLoading();
      }
    },
    onClearSimulation() {
      this.cleanState();
      this.hasEntrancePayment = "";
      this.installmentSelected = null
      this.entranceInstallmentSelected = null
    },
    onSimulation() {
      this.$router.push('/financiamentos/auto')
    },
    onEmail() {
      this.formatPrinterObj()
      this.modals.simulacaoNovoFinanciamento = true
    },
    formatPrinterObj() {
      const telefone = this.affiliateContact[0].phones[0].value;
        this.printerObj = {
          valorSimulado: moneyFormatter(this.martketValue),
          anoVeiculo: this.vehicleYear,
          numeroParcelasFinanciamento: this.installmentSelected.installmentMode,
          valorParcelaFinanciamento: this.installmentSelected.releasedValue,
          valorTotal: this.installmentSelected.totalValue,
          nomeFantasia: this.affiliate.simpleName,
          telefone
        };
        if (this.hasEntranceTable) {
          this.printerObj = {
            ...this.printerObj,
            numeroParcelas: this.entranceInstallmentSelected.installmentMode,
            valorParcela: this.entranceInstallmentSelected.releasedValue,
          };
        }
    },
    onImprimir() {
        this.formatPrinterObj()
        this.$refs.printerSimulation.imprimir();
    },
    onSelectedInstallment(installment) {
      this.installmentSelected = installment;
    },
    onSelectedInstallmentEntrance(installment) {
      this.entranceInstallmentSelected = installment;
    }
  }
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
