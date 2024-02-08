<template>
  <div id="modalNovaTransacao">
    <!-- Exibir versão do LF instalado!! -->
    <h2  v-if="transactionObj.Code == 0" class="modalTitle"></h2>
    <h2  v-if="transactionObj.Code != 0 || transactionObj.Code === 'err'" class="modalTitle">{{text.tentarNovamente}}</h2>

    <div class="container-fluid ">
      <div class="row">
        <div class="col-xs-12" v-if="transactionObj.Code == 0">
          <div style="text-align:center; margin-top: 20px" v-if="transactionObj.document == 'CCB'" class="alert alert-success" v-html="text.assinaturaCCB"></div>
          <div style="text-align:center; margin-top: 20px" v-else class="alert alert-success" v-html="text.transacaoSucesso"></div>
        </div>
        <div class="col-xs-12" v-if="transactionObj.Code != 0">
          <h2 style="text-align:center" class="alert alert-danger">Code: {{transactionObj.Code}} - {{transactionObj.Message}}</h2>
        </div>
      </div>
    </div>

    <div id="buttons" class="container-fluid pt-15" v-if="transactionObj.Code != 0 || transactionObj.Code === 'err'">
      <div class="row">
        <div class="form-group col-xs-12">
          <button id="concluir" @click="closeModal"><span>{{text.tentarNovamente}}</span></button>
        </div>
      </div>
    </div>
    <div id="buttons" class="container-fluid pt-15" v-else-if="transactionObj.Code == 0">
      <div class="row">
        <div class="form-group col-xs-12">
          <button id="concluir" @click="continuarEmprestimo"><span>{{text.btnContinuar}}</span></button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable func-names */


export default {
  data() {
    return {
      text: {
        tentarNovamente: "Tentar novamente",
        transacaoSucesso: "<h2>Solicitação Autorizada.</h2><h3>Favor assinar o contrato para conclusão e pagamento do Empréstimo.</h3><h3>OBS.: Os valores serão creditados em conta apenas após a assinatura do CET e CCB.</h3>",
        assinaturaCCB: "<h2>Operação concluída com SUCESSO.</h2><br><h2>O pagamento dos valores referente a Empréstimos serão creditados no seu fluxo normal de recebimento.</h2>",
        transacaoErro: "Erro na transação. ",
        fechar_modal: "Fechar",
        editar_transacao: "Editar empréstimo",
        em_andamento: "Transação em andamento",
        btnContinuar: "Continuar",
      },
      formUrl: {
        url: "http://localhost:11573/",
        urlHttps: "https://local.listofacil.com.br:11574",
      },
      // protocolo: null,
      formdata: null,
      formdata2: null,
      confirmExitlistenerID: null,
      exited: null,
      respostaText: null,
      respostaCode: null,
      retentativa: null,
      pagando: false,
    };
  },
  props: {
    transactionObj: {
      type: Object,
      required: true,
    },
  },
  // mounted() {
  //   let myVar;
  //   this.protocolo = window.location.protocol;
  //   if (this.transactionObj.Code === 0) {
  //     myVar = setTimeout(this.redirectPage, 5000);
  //   }
  // },
  methods: {
    // emitir toggle Modal
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    redirectPage() {
      this.closeModal();
    },
    continuarEmprestimo() {
      this.closeModal();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalNovaTransacao {
  height: 100%;

  #loadImage{
    text-align: center;
  }

  #versaoListoFacil {
    color: @color16;
    font-size: 18px;
    text-align: center;
    margin: 0;
    margin-top: 10px;
    font-family: @mainFontLight;
  }

  .modalTitle {
    font-family: @mainFontBold;
    font-size: @ftBigTitSize;
    margin: 5px 0;
    text-align: center;

    #titleIcon {
      display: inline-block;
      width: 60px;
      height: 60px;
      background: transparent url("~assets/img/ico-cadeado.svg");
      background-size: contain;
      background-repeat: no-repeat;
      margin-right: 15px;
      vertical-align: text-bottom;
    }
  }

  #dadosTransacao {
    border-collapse: separate;
    border-spacing: 10px 5px;
    display: block;
    width: 100%;

    tbody {
      width: inherit;
      display: block;
      tr {
        width: inherit;
        display: inline-block;

        td {
          text-align: center;
          display: inline-block;
          width: calc(50% - 2px);
          font-size: @ftSizeLarge;

          &:nth-child(odd) {
            font-weight: bold;
          }
        }
      }
    }
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
