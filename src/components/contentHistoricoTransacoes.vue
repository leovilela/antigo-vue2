<template>
  <div id="contentHistoricoTransacoes">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>
    <component-content-section>
      <form-historico-transacoes slot="content"></form-historico-transacoes>
    </component-content-section>
    <component-content-section :class="{ noBorder: true }">
      <table-historico slot="content" :showFieldsCheckboxes="true"></table-historico>
    </component-content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";

import formHistoricoTransacoes from "~/components/formHistoricoTransacoes.vue";
import table from "~/components/searchResultsTable.vue";


export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-historico-transacoes": formHistoricoTransacoes,
    "table-historico": table,
  },

  data() {
    return {
      text: {
        contentHistoricoTransacoes_title: "Histórico de transações",
      },
    };
  },

  methods: {
    // uma função "getter" computada (computed getter)
    navegacaoB(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },

  mounted() {
    this.$nuxt.$emit("setTableType", "historicoTransacoes");
  },
};
</script>
