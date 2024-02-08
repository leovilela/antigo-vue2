<template>
  <div id="contentPainelCliente">
    <component-content-section>
      <form-relatorios-pagamento slot="content"></form-relatorios-pagamento>
    </component-content-section>

    <component-content-section :class="{ noBorder: true }">
      <table-relatorios-pagamento slot="content" :showFieldsCheckboxes="false"></table-relatorios-pagamento>
    </component-content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";

import form from "~/components/formRelatoriosPagamento.vue";
import table from "~/components/searchResultsTable.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-relatorios-pagamento": form,
    "table-relatorios-pagamento": table,
  },

  data() {
    return {
      text: {},
    };
  },

  methods: {
    formatMoney(val) {
      return val.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    formatNumber(val) {
      // console.log(val.toLocaleString("pt-BR"));
      return val.toLocaleString("pt-BR");
    },
    // uma função "getter" computada (computed getter)
    navegacaoB(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
    abreModalPai(id) {
      this.$nuxt.$emit("toggleModal", id);
    },
  },
  mounted() {
    this.$nuxt.$emit("setTableType", "relatoriosPagamento");
  },
};
</script>
