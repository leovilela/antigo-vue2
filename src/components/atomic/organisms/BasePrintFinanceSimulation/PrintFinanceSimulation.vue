<template>
  <div
    id="impressao"
    style="border: 1px solid red; position: relative;"
    v-show="printer"
  >
    <div class="header" style="background: #343a40">
      <img src="~assets/img/logo-listo.jpg" width="151" height="22" />
    </div>
    <div>
      <table width="100%" class="tabelavalores">
        <tr>
          <td>Valor a simular:</td>
          <td>{{ transactionObj.valorSimulado }}</td>
        </tr>
        <tr v-if="transactionObj.numeroParcelas" class="installment-row">
          <td>Parcela de Entrada:</td>
          <td>
            {{ transactionObj.numeroParcelas }} de
            {{ transactionObj.valorParcela }}
          </td>
        </tr>
        <tr class="installment-row">
          <td>Parcela de Financiamento:</td>
          <td>
            {{ transactionObj.numeroParcelasFinanciamento }} de
            {{ transactionObj.valorParcelaFinanciamento }}
          </td>
        </tr>
        <tr class="total-row">
          <td>Total:</td>
          <td>{{ transactionObj.valorTotal }}</td>
        </tr>
      </table>
    </div>
    <div>
      <p style="text-align: center; font-family: Arial, sans-serif">
        Simulação realizada em
        <strong>{{ transactionObj.nomeFantasia }}</strong>
      </p>
      <p style="text-align: center; font-family: Arial, sans-serif">
        Telefone: <strong>{{ transactionObj.telefone }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
import Printd from "printd";

export default {
  props: {
    transactionObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      printer: false
    };
  },
  methods: {
    imprimir() {
      this.printer = true;
      const p = new Printd();
      const css = `
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
      #impressao{
        display:inline;
        };
        .total-row {
          display: none;
        }
      #impressao div.header{
        /* background: #343a40; width: 100%; display:block*/
        }
      #impressao table tr td{
        font-family: arial;
        background: #e4e4e4;
      }

      #impressao .tabelavalores {
        width: 100%;
      }
      #impressao .tabelavalores thead th {
        text-align: center;
      }
      #impressao .tabelavalores thead th:first-child {
        padding-left: 10px;
        text-align: left;
      }
      #impressao .tabelavalores thead th:last-child {
        text-align: right;
      }
      #impressao .tabelavalores tbody tr .valorTotalParcela {
        text-align: center;
      }
      #impressao .tabelavalores tbody tr .optionValorParcela {
        padding-left: 8px;
        font-family: arial;
        font-size: 12px;
        position: relative;
      }
      #impressao .tabelavalores tbody tr .valorParcela {
        font-family: arial;
        font-size: 12px;
        text-align: right;
      }
      #impressao .tabelavalores tbody tr td {
        text-align: center;
      }
      #impressao .tabelavalores tbody tr td:first-child {
        text-align: left;
      }
      #impressao .tabelavalores tbody tr td:last-child {
        padding-right: 10px;
        text-align: right;
      }
      #impressao .tabelavalores tbody tr:nth-child(odd) {
        background-color: #cfd2d3 ;
      }
      #impressao .tabelavalores tbody tr:last-child:nth-child(even) {
        border-bottom: 1px solid #f0f0f0;
      }
        `;
      const element = document.getElementById("impressao");

      this.$nextTick(() => {
        p.print(element, [css]);
        this.printer = false;
      });
    }
  }
};
</script>

<style>
</style>
