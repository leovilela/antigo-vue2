<template>
  <tr class="itemTabelaExtrato">
    <!-- <td>{{liquidacao}}</td> -->
    <td class="data">{{ showFormattedDate(liquidacao.paymentEffectiveDate) }}</td>
    <td class="banco">{{ liquidacao.bank}}</td>
    <td class="agencia">{{ liquidacao.agency}}-{{ liquidacao.agencyCode }} / {{liquidacao.account}}-{{liquidacao.accountCode}}</td>
    <td class="valorDebitar">{{ showNumberAsCurrency(liquidacao.retentionValue) }}</td>
    <td class="valorCreditar">{{ showNumberAsCurrency(liquidacao.totalValue) }}</td>
    <td class="valorPago">{{ showNumberAsCurrency(liquidacao.transferValue) }}</td>
    <!-- <td class="detalhes"><a @click="modalControl({api:'conciliacao', modalContent: liquidacao })">{{ text.visualizar }}</a></td> -->
  </tr>
</template>

<script>
export default {
  props: ["liquidacao"],
  methods: {
    // abre modal de detalhes da transação
    modalControl(id) {
      // console.log("modal control");
      this.$nuxt.$emit("toggleModal", id);
    },

    // exibe valores numéricos no formato de moeda
    showNumberAsCurrency(number) {
      return number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },

    // exibe data formatada
    showFormattedDate(val) {
      const formatted = new Date(val);
      const day = formatted.getDate() >= 10 ? formatted.getDate() : `0${formatted.getDate()}`;
      const month = formatted.getMonth() + 1 >= 10 ? formatted.getMonth() + 1 : `0${formatted.getMonth() + 1}`;
      const year = formatted.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  data() {
    return {
      text: {
        visualizar: "Visualizar",
      },
    };
  },
};
</script>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";
  .itemTabelaExtrato {
    // &:nth-child(odd) {
    //   background-color: rgba(225, 225, 225, 0.25);
    // }

    // &:hover {
    //   background-color: rgba(225, 225, 225, 0.5);
    // }
    td {
      // font-family: @mainFontRegular;
      // font-size: @ftSizeTiny;
      // color: @color3;
      padding: 5px 10px;
      text-align: center;
    }
  }
</style>
