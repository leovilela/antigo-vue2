<template>
  <div id="contentConciliacao">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>

    <component-content-section>
      <form-conciliacao slot="content"></form-conciliacao>
    </component-content-section>

    <component-content-section :class="{ noBorder: true}">
      <table-conciliacao slot="content" :showFieldsCheckboxes="false"></table-conciliacao>
    </component-content-section>
  </div>
</template>

<script>
import contentSection from "~/components/mainContentSection.vue";
import contentTabs from "~/components/mainContentTabs.vue";

import formConciliacao from "~/components/formConciliacao.vue";
import table from "~/components/searchResultsTable.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-content-tabs": contentTabs,
    "form-conciliacao": formConciliacao,
    "table-conciliacao": table,
  },

  data() {
    return {
      text: {
        title_conciliacao: "Conciliação",
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
    this.$nuxt.$emit("setTableType", "conciliacao");
  },
};
</script>
