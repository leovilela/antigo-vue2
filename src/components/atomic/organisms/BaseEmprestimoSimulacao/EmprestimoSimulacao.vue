<template>
  <section class="base-emprestimo-simulacao">
    <Base-FieldSet
      title="Simulação"
      titleMaxWidth="50%"
      contentFlex="block"
      contentHeight="359px"
    >
      <Base-InstallmentsTable
        :isUniqRow="isUniqRow"
        :rows="simulationInstallmentsRows"
        v-if="showSimulationTable"
        :columns="columns"
        :hasHighlightInstallment="true"
        @onSelectedInstallment="onSelectedInstallment"
      >
      </Base-InstallmentsTable>
    </Base-FieldSet>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { installmentRows } from "../BaseSimulationFinance/simulationFinance.factory";
import columns from "../BaseSimulationFinance/simulationFinance.columns";

const { mapState: simulationLoanState } = createNamespacedHelpers('loan/simulation')

export default {
  data() {
    return {
      columns,
      isUniqRow: false,
      showSimulationTable: true
    };
  },
  computed: {
    ...simulationLoanState(['coefficients', 'transactionData']),
    simulationInstallmentsRows() {
      if (this.coefficients.length === 0) {
        return
      }
      return installmentRows(this.transactionData.simulationValue, this.coefficients)
    }
  },
  methods: {
    onSelectedInstallment(selectedSimulation) {
      this.$emit("onSelectedInstallment", selectedSimulation);
    }
  }
};
</script>

<style lang='less'>
@import "./style.less";
</style>
