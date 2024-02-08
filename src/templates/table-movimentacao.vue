<template>
  <div id="tableMovimentacao">
    <table id="table-result">
      <thead>
        <th class="data">{{text.th_data}}</th>
        <th class="descricao">{{text.th_descricao}}</th>
        <th class="valor">{{text.th_valor}}</th>
        <th class="status">{{text.th_status}}</th>
      </thead>
      <tbody>
        <tr v-for="(transacao, index) in transacoes" :key="index">
          <!-- Codigo prod -->
          <td>{{showFormattedDate(transacao.createDate)}}</td>
          <td>{{transacao.description}}</td>
          <td>{{showCurrency(transacao.entryValue)}}</td>
          <td>{{transacao.entryStatusDescription}}</td>

          <!-- Codigo mock para json-server -->
          <!-- <td>{{showFormattedDate(transacao.data.paymentDate)}}</td> -->
          <!-- <td>{{transacao.type}}</td> -->
          <!-- <td>{{showCurrency(transacao.data.value)}}</td> -->
          <!-- <td>{{transacao.data.taxPayer}}</td> -->

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #tableMovimentacao {
    // display: block;
    // width: 100%;
    table {
      // width: fit-content;
      // max-width: 100%;
      // width: 100%;
      // display: block;
      // overflow-x: auto;
      // margin-top: 10px;
      // font-family: @mainFont;
      width: 100%;
      display: block;

      thead,
      tbody {
        text-align: center;
      }

      thead {
        display: inline-table;
        width: 100%;
        th {
          padding: 5px 10px;
          border-bottom: 1px solid @color10;
          border-top: 1px solid @color10;
          width: 25%;
          display: inline-block;
        }
      }

      tbody {
        display: inline-table;
        width: 100%;
        tr {
          &:nth-child(even) {
            background-color: @color18;
          }
          td {
            padding: 10px 0;
            width: 25%;
          }
        }
      }
    }
  }
</style>

<script>
export default {
  props: ["transacoes"],
  data() {
    return {
      text: {
        th_data: "Data",
        th_descricao: "Descrição",
        th_valor: "Valor",
        th_status: "Status",
      },
    };
  },
  methods: {
    // exibe data formatada
    showFormattedDate(val) {
      const data = new Date(val);
      return `${data.getDate() < 10 ? `0${data.getDate()}` : data.getDate()}/${data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1}/${data.getFullYear()}`;
    },
    // Exibe valor em formato moeda
    showCurrency(val) {
      return `R$ ${val.toFixed(2).replace(".", ",")}`;
    },
  },
};
</script>
