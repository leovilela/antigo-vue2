<template>
  <div id="contentExtrato">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>

    <component-content-section>
      <form-extrato slot="content"></form-extrato>
    </component-content-section>

    <component-content-section :class="{ noBorder: true}">
      <table-extrato slot="content" :showFieldsCheckboxes="false"></table-extrato>
    </component-content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";

import formExtrato from "~/components/formExtrato.vue";
import table from "~/components/searchResultsTable.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-extrato": formExtrato,
    "table-extrato": table,
  },

  data() {
    return {
      text: {
        title_extrato: "Extrato",
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
    this.$nuxt.$emit("setTableType", "extrato");
  },
};
</script>
