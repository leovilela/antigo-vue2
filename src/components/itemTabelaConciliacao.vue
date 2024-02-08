<template>
  <tr class="itemTabelaConciliacao">
    <!-- <td>{{conciliacao}}</td> -->
    <td class="extrato">
      <table>
        <thead v-show="index == 0">
          <th>{{text.itemTabelaConciliacao_data}}</th>
          <th>{{text.itemTabelaConciliacao_saldoReceber}}</th>
        </thead>
        <tbody>
          <tr>
            <td>{{showFormattedDate(conciliacao.transferDate)}}</td>
            <td>{{showNumberAsCurrency(conciliacao.transferValue)}}</td>
          </tr>
        </tbody>
      </table>
    </td>

    <td class="transacoes">
      <table>
        <thead v-show="index == 0">
          <th>{{text.itemTabelaConciliacao_data}}</th>
          <th>{{text.itemTabelaConciliacao_autorizacao}}</th>
          <th>{{text.itemTabelaConciliacao_tipoTransacao}}</th>
          <th>{{text.itemTabelaConciliacao_valorTransacao}}</th>
        </thead>
        <tbody>
          <tr>
            <td colspan="10">
              <table v-for="(transacao, index) in conciliacao.transactions" :key="index">
                <tr class="transaction-row">
                  <td width="25%">{{showFormattedDate(transacao.transactionDate)}}</td>
                  <td width="25%">{{transacao.authorize}}&nbsp;</td>
                  <td width="25%">{{transacao.transactionType}}&nbsp;</td>
                  <td width="25%">{{showNumberAsCurrency(transacao.transactionValue)}}&nbsp;<span v-if="transacao.installments.length > 0" class="glyphicon glyphicon-plus showInstallmentsIcon" @click="toggleInstallmentsRow($event)"></span></td>
                </tr>
                <tr class="installments-row">
                  <td colspan="3"></td>
                  <td colspan="1">
                    <table class="installments-table">
                      <tr v-for="(installment, index) in transacao.installments" :key="index">
                        <!-- <td width="30%">&nbsp;</td> -->
                        <td width="50%">{{installment.installmentNumber}} de {{installment.installmentTotal}}</td>
                        <td width="50%">{{showNumberAsCurrency(installment.installmentValue)}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  .itemTabelaConciliacao {
    text-align: left;
    margin-bottom: 25px;

    &:not(:first-child) {
      border-top: 2px solid @color10;
    }

    .extrato,
    .transacoes {
      vertical-align: top;
      padding-bottom: 8px;

      table {
        width: 100%;
        thead {
          border-bottom: 2px solid @color20;
        }
      }
    }

    .extrato {
      width: 25%;

      thead {
        th {
          &:first-child {
            padding-left: 10px;
          }

          &:last-child {
            padding-right: 10px;
          }
        }
      }
      tbody {
        tr {
          &:first-of-type {
            background-color: @color22;
          }
          td {
            width: 50%;
            padding: 8px;
          }
        }
      }
    }

    .transacoes {
      width: 75%;

      table {
        thead {
          border-left: 2px solid @color10;
          th {
            text-align: center;
            &:last-child {
              padding-right: 10px;
            }
          }
        }
        tbody {

          tr {

            table {
              &:nth-of-type(odd) {
                background-color: @color18;
              }
            }

            &.transaction-row {
              border-left: 2px dashed @color12;

              td {
                text-align: center;
                padding: 8px;

                .showInstallmentsIcon {
                  cursor: pointer;
                }
              }
            }

            &.installments-row {
              display: none;

              &.showInstallments {
                display: table-row;
              }

              .installments-table {
                background-color: @color2;
                border-left: 1px dashed @color1;
                border-bottom: 1px dashed @color1;
                tr {
                  td {
                    text-align: center;
                    padding: 8px;
                  }
                }
              }
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
        itemTabelaConciliacao_data: "Data",
        itemTabelaConciliacao_saldoReceber: "Valor pago",
        itemTabelaConciliacao_autorizacao: "Autorização",
        itemTabelaConciliacao_tipoTransacao: "Tipo",
        itemTabelaConciliacao_valorTransacao: "Total",
      },
    };
  },
  props: ["conciliacao", "index"],
  methods: {
    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    // exibe data no formato amigável
    showFormattedDate(val) {
      const date = new Date(val);

      const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
      const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },

    toggleInstallmentsRow(ev) {
      event.target.classList.toggle("glyphicon-plus");
      event.target.classList.toggle("glyphicon-minus");

      const nodes = Array.from(event.target.parentElement.parentElement.parentElement.childNodes);
      const installments = nodes.filter(n => n.classList && n.classList.contains("installments-row"))[0];

      installments.classList.toggle("showInstallments");
    },
  },
};
</script>
