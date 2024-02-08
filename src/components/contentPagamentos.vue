<template>
  <div id="contentPagamentos" slot="content">
    <a class="page-back-arrow glyphicon glyphicon-arrow-left" v-on:click="navegacaoB('painel')" v-if="$mq === 'mobile' || $mq === 'tablet'"></a>
    <ul id="tabsNav" v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen'">
      <li v-for="(tab, index) in content.tabs" :key="index" @click="alteraTabs(tab.label)" :class="{active:tab.status, available: tab.available}">{{tab.label}}</li>
    </ul>

    <component-content-section>
      <component-detran v-if="controls.tabAtual.trim().toLowerCase() == 'detran'" slot="content"></component-detran>
    </component-content-section>

    <component-content-section>
      <component-form-pagamentos slot="content"></component-form-pagamentos>
    </component-content-section>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";
#tabsNav {
  padding: 0px;
  margin: 0;
  li {
    display: inline-block;
    font-size: @ftSizeLarge;
    color: @color10;
    padding: 5px 20px;
    border-bottom: 2px solid @color2;
    user-select: none;
    cursor: pointer;

    &.active {
      color: @color5;
    }

    &:not(.available) {
      pointer-events: none;
      opacity: 0.5;
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
</style>

<script>
import contentSection from "~/components/mainContentSection.vue";
import formPagamentos from "~/components/pagamentos/formPagamentos.vue";
import Detran from "~/components/pagamentos/Detran.vue";

export default {
  components: {
    "component-content-section": contentSection,
    "component-detran": Detran,
    "component-form-pagamentos": formPagamentos,
  },

  data() {
    return {
      controls: {
        tabAtual: "DETRAN",
      },
      content: {
        text: {
        },
        tabs: [
          {
            label: "DETRAN",
            status: true,
            available: true,
          },
          /* {
            label: "Código de Barras",
            status: false,
            available: false,
          },
          {
            label: "Impostos e tributos",
            status: false,
            available: false,
          }, */
        ],
      },
    };
  },

  mounted() {
    this.alteraTabs(this.controls.tabAtual);
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
    alteraTabs(val) {
      this.controls.tabAtual = val;

      this.content.tabs.map((t) => {
        t.label.trim().toLowerCase() == this.controls.tabAtual.trim().toLowerCase() ? t.status = true : t.status = false;
      });

      this.$nuxt.$emit("hidePayment");
    },
  },
};
</script>
