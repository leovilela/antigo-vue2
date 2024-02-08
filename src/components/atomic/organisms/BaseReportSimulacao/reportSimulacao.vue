<template>
  <section class="report-ficha-cadastral">
    <Base-FieldSet
      class="report-ficha-cadastral__field"
      title="Custo Efetivo total"
    >
      <Base-ReportList :list="model" />
    </Base-FieldSet>

    <h3 class="report-ficha-cadastral__title">Todas as informações do seu Contrato estão CORRETAS?</h3>

    <nav class="report-ficha-cadastral__buttons">
      <Base-Button
        class="report-ficha-cadastral__button report-ficha-cadastral__button-not"
        @click="$emit('onNotEdit')"
      >Não, editar</Base-Button>
      <Base-Button
        class="report-ficha-cadastral__button report-ficha-cadastral__button-yes"
        @click="$emit('onYesNext')"
      >Sim, continuar</Base-Button>
    </nav>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { moneyFormatter } from "~/utils/currency.utils";
import dayjs from "dayjs";

const {
  mapState: loanState,
} = createNamespacedHelpers("loan");

export default {
  computed: {
    ...loanState(['simulation']),
    fieldSets() {
      return this.simulation.cetResume;
    },
    model() {
      const payload = this.fieldSets;
      const model = {
        "Data da Contratação": this.formatDate(payload.contractDate),
        "Valor Solicitado": this.formatCashe(payload.amountRequest),
        "TC3": this.formatCashe(payload.tC3),
        "IOF": this.formatCashe(payload.iof),
        "Quantidade Financiado": this.formatCashe(payload.financedAmount),
        "Quantidade de Prestações": `${payload.installments}x`,
        "Juros": this.formatPorcent(payload.interest, "a.m"),
        "CET ao Mês": this.formatPorcent(payload.cetMonth, "a.m"),
        "CET ao ano": this.formatPorcent(payload.cetYear, "a.a"),
      }

      return model;
    }
  },
  methods: {
    formatCashe(value) {
      return moneyFormatter(value);
    },
    formatDate(value) {
      return dayjs(value).format("DD/MM/YYYY");
    },
    formatPorcent(value, prefix) {
      return `${(value * 100).toFixed(2)}% ${prefix}`
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
