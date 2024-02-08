<template>
  <div id="modalSucesso">

    <div class="alert alert-success formatTxt" role="alert"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;&nbsp;&nbsp;{{msgErr(transactionObj.response)}}</div>

  </div>
</template>

<script>
/* eslint-disable func-names */


export default {
  data() {
    return {
      modalTimeOut: null,
      text: {
        err200: "OK",
        err201: "Gravado com sucesso",
        err204: "Gravado com sucesso",
      },

    };
  },
  props: {
    transactionObj: {
      type: Object,
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
    msgErr(err) {
      let msg;
      switch (err) {
        case (200):
          msg = this.text.err400;
          break;
        case (201):
          msg = this.text.err401;
          break;
        case (204):
          msg = this.text.err500;
          break;
        default:
          msg = "OK!";
      }

      return msg;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalErros {
  height: 100%;

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
