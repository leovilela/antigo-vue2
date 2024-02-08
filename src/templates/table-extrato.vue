<template>
  <div id="tableExtrato">
    <table>
      <thead>
        <th id="data">{{ content.text.formExtrato_table_head_data }}</th>
        <th id="banco">{{ content.text.formExtrato_table_head_banco }}</th>
        <th id="agencia">{{ content.text.formExtrato_table_head_agencia }}</th>
        <th id="valorDebitar">{{ content.text.formExtrato_table_head_valorDebitar }}</th>
        <th id="valorCreditar">{{ content.text.formExtrato_table_head_valorCreditar }}</th>
        <th id="valorPago">{{ content.text.formExtrato_table_head_valorPago }}</th>
        <!-- <th id="detalhe">{{ content.text.formExtrato_table_head_detalhe }}</th> -->
      </thead>
      <tbody id="listaLiquidacoes">
        <item-tabela v-for="(liq, index) in liquidacoes" :liquidacao="liq" :key="index"></item-tabela>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#tableExtrato {
  table {
    width: 100%;
    display: block;
    & > thead {
      border-bottom: 1px solid @color10;
      border-top: 1px solid @color10;

      th {
        // text-align: left;
        padding: 5px 10px;
        // padding-right: 15px;
        // padding-left: 15px;

        &#data {
          min-width: 100px;
        }

        &#banco, &#agencia {
          min-width: 225px;

          @media (min-width: @screen-lg-min) {
            width: 33%;
          }
        }

        &#valorCreditar, &#valorDebitar, &#valorPago {
          min-width: 120px;
        }
      }
    }

    &> tbody {
      tr {
        &:nth-child(odd) {
          background-color: @color18;
        }
      }
    }
  }
}

</style>

<script>
import itemTabelaExtrato from "~/components/itemTabelaExtrato.vue";

export default {
  data() {
    return {
      content: {
        text: {
          formExtrato_table_head_data: "Data",
          formExtrato_table_head_banco: "Banco",
          formExtrato_table_head_agencia: "Agência/Conta ou Nº Boleto",
          formExtrato_table_head_valorDebitar: "Valor a debitar",
          formExtrato_table_head_valorCreditar: "Valor a creditar",
          formExtrato_table_head_valorPago: "Valor pago",
          formExtrato_table_head_detalhe: "Detalhe",
        },
      },

    };
  },
  props: ["liquidacoes"],
  components: {
    "item-tabela": itemTabelaExtrato,
  },
};
</script>
