<template>
  <div id="impressao" style="border: 1px solid red; position: relative">
      <div>
        <div class="header"  style="background: #343a40"><img src="~assets/img/logo-listo.jpg" width="151" height="22"></div>
        <div>
          <table width="100%">
            <tr>
              <td>Valor a simular:</td>
              <td>{{showNumberAsCurrency(valor)}}</td>
            </tr>
             <tr>
              <td>Tipo de transação:</td>
              <td>{{transacao }}</td>
            </tr>
            <tr>
              <td>Parcela: </td>
              <td>{{parcela}}x de {{showNumberAsCurrency(valorParcela)}}</td>
            </tr>
            <tr>
              <td>Total: </td>
              <td>{{showNumberAsCurrency(totalParcelas)}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      text: {

      },
      parcela: 0,
      coeficiente: 1,
      valor: 0,
      valorParcela: 0,
      totalParcelas: 0,
      dados: 0,
      tipoTransacaoLabel: [],
      transacao: "",
    };
  },
  mounted() {
    // this.printElement();
  },
  props: {
    printObject: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
      }
    },
    printElement() {
      // console.log("this.printObject", this.printObject);
      const self = this;
      this.valor = this.printObject.valorSimulado;
      this.coeficiente = this.printObject.dadosParcela[0].coeficiente === null ? 1 : this.printObject.dadosParcela[0].coeficiente;
      this.coeficienteTotal = this.printObject.dadosParcela[0].coeficiente === null ? 1 : this.printObject.dadosParcela[0].coeficiente;
      this.parcela = this.printObject.dadosParcela[0].parcela === null ? 1 : this.printObject.dadosParcela[0].parcela;
      this.dados = this.printObject;
      this.tipoTransacao = this.printObject.tipoTransacao;

      if (this.tipoTransacao === 2 || this.tipoTransacao === 8) {
        this.valorParcela = this.valor / this.parcela;
        this.totalParcelas = this.valor;
      } else {
        this.valorParcela = this.valor * this.coeficiente;
        this.totalParcelas = this.valor * this.printObject.dadosParcela[0].coeficienteTotal;
      }

      this.tipoTransacaoLabel[1] = "Cartão de débito";
      this.tipoTransacaoLabel[4] = "Cartão de crédito";
      this.tipoTransacaoLabel[8] = "Cartão de débito";
      this.tipoTransacaoLabel[2] = "Cartão de crédito";

      this.transacao = this.tipoTransacaoLabel[this.tipoTransacao];

      // setTimeout(() => { self.imprimir(); }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";


</style>
