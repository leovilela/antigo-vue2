<template>
  <div id="modalErros">

    <div class="alert alert-danger formatTxt" role="alert">
      <p class="glyphicon glyphicon-exclamation-sign"></p>
      <div v-if="transactionObj.response">
        <div v-if="transactionObj.response.status == 400">
          <p v-if="!transactionObj.response.data.error">{{transactionObj.response.data.detail}}</p>
          <p v-if="transactionObj.response.data.error">{{paymentError(transactionObj.response.data.detail)}}</p>
          <p v-else>{{transactionObj.response.data}}</p>
        </div>
      </div>
      <div v-else>
        <p>{{transactionObj}}</p>
      </div>
      <p><button v-if="btRecarregue" @click.prevent="reloadPage">{{ text.recarregar_pagina}}</button></p>
    </div>

  </div>
</template>

<script>
/* eslint-disable func-names */


export default {
  data() {
    return {
      modalTimeOut: null,
      btRecarregue: false,
      text: {
        err400: "Erro nos dados enviados",
        err401: "Erro na autenticação.<br>Recarregue sua página",
        err403: "Não autorizado",
        err415: "Arquivo não suportado",
        err500: "Erro no processamento",
        recarregar_pagina: "Recarregar página",
        paymentError: {
          scheduleDate: "A data de pagamento não é um dia útil.",
          paymentData: "Erro nos dados enviados.",
        },
      },

    };
  },
  props: {
    transactionObj: {
      required: true,
    },
  },
  mounted() {
    this.protocolo = window.location.protocol;
    // if (this.transactionObj.Code === 0) {
    //   myVar = setTimeout(this.redirectPage, 5000);
    // }
  },
  methods: {
    // emitir toggle Modal
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    redirectPage() {
      this.closeModal();
      this.$router.push("/login", () => {});
    },
    reloadPage() {
      this.$router.go({ path: "$nuxt.$route.path", force: true });
    },
    msgErr(err) {
      let msg;
      switch (err) {
        case (400):
          msg = this.text.err400;
          break;
        case (401):
          msg = this.text.err401;
          this.btRecarregue = true;
          break;
        case (403):
          msg = this.text.err403;
          this.$warehouse.remove("refresh_token");
          this.$warehouse.remove("access_token");
          this.$warehouse.remove("Authorization");
          this.$warehouse.remove("expiresToken");
          setTimeout(this.redirectPage, 2000);
          break;
        case (415):
          msg = this.text.err415;
          break;
        case (500):
          msg = this.text.err500;
          break;
        default:
          msg = "Error";
      }

      return msg;
    },
    paymentError(err) {
      const self = this;

      if (err) {
        if (err.indexOf("scheduleDate") > -1) {
          return self.text.paymentError.scheduleDate;
        }
        return self.text.paymentError.paymentData;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalErros {
  height: 100%;
  text-align: center;

  .formatTxt{
    font-size: @ftSizeExtraLarge;
  }

  #loadImage{
    text-align: center;
  }

  #buttons {
    button {
      width: 100%;

      &#concluir {
        color: @color7;
      }
    }
  }
}
</style>
