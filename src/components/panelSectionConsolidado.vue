<template>
  <div id="consolidado">
    <h3 id="consolidadoTitle">{{ consolidadoTitle }}</h3>
    <table :class="tableClass">
      <tr v-for="(row, index) in rows" :key="index" :class="row.class">
        <td>{{ row.title }}</td>
        <td v-if="row.type === 'currency'" :class="{negativo: row.value < 0}">{{ showNumberAsCurrency(row.value) }}</td>
        <td v-else>{{ row.value }}</td>
      </tr>
    </table>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #consolidado {
    width: 100%;
    color: @color5;
    font-size: @ftSizeNormal;
    line-height: 21px;

    #consolidadoTitle {
      font-family: @mainFontBold;
      font-size: @ftSizeLarge;
      line-height: 24px;
      text-align: left;
      margin: 5px 0;
    }

    table {
      width: 100%;
      border-spacing: 0 5px;
      border-collapse: separate;
      font-size: 1.4rem;

      #consolidadoTitle {
        text-align: left;
        margin: 0;
        margin-bottom: 10px;
        font-family: @mainFontRegular;
        font-size: @ftSizeLarge;
      }

      tr {
        td {
          &:nth-child(odd) {
            text-align: left;
          }
          &:nth-child(even) {
            text-align: right;
          }
        }
      }
    }
  }

  &.extrato,
  &.relatoriosPagamento,
  &.conciliacao,
  &.historicoTransacoes,
  &.contaListo {
    tr {
      td {
        &.negativo {
          color: @color24;
        }
      }
      &:last-child {
        height: 35px;

        td {
          border-top: 1px solid @color22;
          border-bottom: 1px solid @color22;
          padding: 10px 0;
          font-family: @mainFont;
        }
      }
      &.total {
        td {
          &:last-child {
            color: @color11;
            // font-size: @ftSizeLarge;

            &.negativo {
              color: @color24;
            }
          }
        }
      }
    }
  }
</style>

<script>
export default {
  data() {
    return {
      consolidadoTitle: "",
      rows: [],
      tableClass: "",
    };
  },

  methods: {
    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
  },

  created() {
    this.$nuxt.$on("consolidado", (data) => {
      this.consolidadoTitle = data.title;
      this.rows = data.rows;
      this.tableClass = data.tableClass;
    });
  },
};
</script>
