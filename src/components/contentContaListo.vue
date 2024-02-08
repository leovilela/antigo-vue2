<template>
  <div id="contentContaListo">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="controleMobile('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>

    <component-content-section>
      <form-extrato slot="content"></form-extrato>
    </component-content-section>

    <component-content-section :class="{ noBorder: true }">
      <table-movimentacao slot="content" :showFieldsCheckboxes="false"></table-movimentacao>
    </component-content-section>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#contentContaListo {
  #controles {
    #tabsNav {
      padding: 0px;
      margin: 0;
      li {
        display: inline-block;
        font-size: @ftSizeLarge;
        color: @color10;
        padding: 5px 20px;
        border-bottom: 2px solid @color2;
        cursor: pointer;

        &.active {
          color: @color5;
        }

        &:hover {
          color: @color5;
        }

        &:hover {
          border-bottom: 2px solid @color5;
        }

        &.active {
          border-bottom: 2px solid @color5;
        }
      }
    }
  }
}
</style>

<script>
import contentSection from "~/components/mainContentSection.vue";
import formMovimentacao from "~/components/formMovimentacao";
import table from "~/components/searchResultsTable.vue";

export default {
  data() {
    return {
      text: {
        tab_extrato: "Extrato",
        tab_pagamentos: "Pagamentos",
      },
      controls: {
        activeTab: null,
      },
      content: {
        tabs: [{ label: "Extrato", active: true }, { label: "Pagamentos", active: false }],
      },
    };
  },
  components: {
    "component-content-section": contentSection,
    "form-extrato": formMovimentacao,
    "table-movimentacao": table,
  },
  methods: {
    // uma função "getter" computada (computed getter)
    controleMobile(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },
  mounted() {
    this.$nuxt.$emit("setTableType", "movimentacao");
  },
};
</script>
