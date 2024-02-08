<template>
  <div id="panelConciliacao">
    <component-panel-section>
      <div id="profile" slot="content">
        <div id="profilePicture"></div>
      </div>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='mobile' || $mq === 'tablet'">
      <ul id="links" slot="content">
        <li><a v-on:click="navegacao('conteudo')"><span><img src="~assets/img/ico-conciliacao.png" alt="conciliação"></span>{{ text.panelConciliacao_conciliacao }}</a></li>
      </ul>
    </component-panel-section>

    <component-panel-section v-if="$mq ==='laptop' || $mq === 'desktop' || $mq === 'bigScreen'">
      <component-consolidado slot="content"></component-consolidado>
    </component-panel-section>

    <component-panel-section :class="{ noPadding: true }">
      <component-contato slot="content"></component-contato>
    </component-panel-section>
  </div>

</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #profile {
    #profilePicture {
      background: @color22 url("~assets/img/ico-conciliacao.png");
      background-size: 50%;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      width: 100px;
      height: 100px;
      display: inline-block;
      border: 4px solid @color12;
      border-radius: 100%;
    }
  }

  #links {
    list-style-type: none;
    padding: 0;
    img {
      max-width: 40px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    a {
      color: @color5;
      font-family: @mainFont;
      font-size: @ftSizeLarge;

      &:hover {
        text-decoration: none;
        user-select: none;
      }
    }

    #links {
      list-style-type: none;
      padding: 0;
      img {
        max-width: 40px;
        margin-bottom: 10px;
        margin-right: 10px;
      }
      a {
        color: @color5;
        font-family: @mainFont;
        font-size: @ftSizeLarge;

        &:hover {
          text-decoration: none;
          user-select: none;
        }
      }
    }

    #liquidacoes {
      // margin: 0 25px;

      table {
        width: 100%;
        tr:nth-last-of-type(2) {
          td {
            padding-bottom: 15px;
          }
        }

        td {
          &.title {
            font-family: @mainFont;
            font-size: @ftSizeNormal;
            text-align: left;
          }

          &.value {
            color: @color12;
            font-family: @mainFontRegular;
          }

          &#totalValue {
            color: @color11;
            font-family: @mainFont;
          }

          &.value,
          &#totalValue {
            font-size: @ftSizeLarge;
            text-align: right;
          }
        }

        .total {
          td {
            padding: 10px 0;
            border-top: 1px solid @color23;
            border-bottom: 1px solid @color23;
          }
        }
      }

      #detail {
        text-align: left;
        font-family: @mainFontRegular;
        font-size: 13px;
        line-height: 15px;
      }
    }
  }
</style>

<script>
import panelSection from "~/components/leftPanelSection.vue";
import panelConsolidado from "~/components/panelSectionConsolidado.vue";
import panelContato from "~/components/leftPanelContato.vue";

export default {
  data() {
    return {
      text: {
        panelConciliacao_conciliacao: "Conciliação",
        panelConciliacao_conciliacao_title:
            "Valor bruto das próximas liquidações *",
        panelConciliacao_conciliacao_detail:
            "* Esses valores foram calculados até o presente momento podendo ocorrer alterações.",
        panelConciliacao_conciliacao_credit: "Cartão de crédito",
        panelConciliacao_conciliacao_debit: "Cartão de débito",
        panelConciliacao_conciliacao__seller_credit:
            "Cartão de crédito custo lojista",
        panelConciliacao_conciliacao__seller_debit:
            "Cartão de débito custo lojista",
        panelConciliacao_conciliacao_total: "Total",
      },
    };
  },

  components: {
    "component-panel-section": panelSection,
    "component-contato": panelContato,
    "component-consolidado": panelConsolidado,

  },

  methods: {
    // uma função "getter" computada (computed getter)
    navegacao(pp) {
      this.$nuxt.$emit("navMobileInternal", pp);
    },
  },
};
</script>
