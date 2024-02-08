<template>
  <div id="tableRelatoriosPagamento">
    <table>
      <thead>
        <th class="codigo">{{ text.codigo }}</th>
        <th class="dataPagamento">{{ text.dataPagamento }}</th>
        <!-- <th class="dataAprovacao">{{ text.dataAprovacao }}</th> -->
        <th class="tipoTransacao">{{ text.tipoTransacao }}</th>
        <th class="autorizacao">{{ text.autorizacao }}</th>
        <th class="status">{{ text.status }}</th>
        <th class="total">{{ text.total }}</th>
        <th class="parcelas">{{ text.parcelas }}</th>
      </thead>
      <tbody>
        <tr v-for="(pag, index) in pagamentos" :key="index">
          <td class="codigo">{{ pag.transactionID }}</td>
          <td class="dataPagamento">{{ showFormattedDate(pag.paymentExpectedDate) }}</td>
          <!-- <td class="dataAprovacao">{{ pag.datas.aprovacao }}</td> -->
          <td class="tipoTransacao">{{ pag.tType }}</td>
          <td class="autorizacao">{{ pag.authorize }}</td>
          <td class="status">{{ pag.status }}</td>
          <td class="total">{{ showCurrency(pag.value) }}</td>
          <td class="parcelas">{{ pag.installment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";
  #tableRelatoriosPagamento {
    table {
      width: 100%;
      display: block;

      thead,
      tbody {
        text-align: center;
        display: inline-table;
        width: 100%;

        td, th {
          width: calc(100% / 7);
          min-width: 100px;
          padding: 5px 10px;

          &:first-child {
              padding-left: 20px;
          }
          &:last-child {
            padding-right: 20px;
          }

        }
      }

      thead {
        th {
          border-top: 1px solid @color10;
          border-bottom: 1px solid @color10;
        }
      }

      tbody {
        tr {
          &:nth-child(odd) {
            background-color: @color18;
          }
          td {
            &.total {
              color: @color11;
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
      text: {
        codigo: "Código",
        data: "Data",
        tipoTransacao: "Tipo de transação",
        autorizacao: "Autorização",
        status: "Status",
        total: "Total",
        parcelas: "Parcelas",
        dataPagamento: "Data de Pagamento",
        dataAprovacao: "Data de Aprovação",
      },
    };
  },
  props: ["pagamentos"],
  methods: {
    // Exibe valor em formato moeda
    showCurrency(val) {
      return `R$ ${val.toFixed(2).replace(".", ",")}`;
    },
    // exibe data formatada
    showFormattedDate(val) {
      const data = new Date(val);
      return `${data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()}/${data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1}/${data.getFullYear()}`;
    },
  },
};
</script>
