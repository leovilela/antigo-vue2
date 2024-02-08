<template>
  <div id="modalNovaTransacao">
    <!-- Exibir versão do LF instalado!! -->
    <h2 class="modalTitle">{{text.em_andamento}}</h2>

    <div class="container-fluid ">
      <div class="row">
        <div v-if="respostaCode === 0">
          <h2 style="text-align:center" class="alert alert-success">{{text.em_andamento}}</h2>
        </div>
        <div id="loadImage">
          <img src="~assets/img/loading.gif" alt="Carregando">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable func-names */


export default {
  data() {
    return {
      text: {
        modalNovaTransacao_title: "Confirmar transação",
        concluirTransacao: "Concluir transação",
        novaTransacao: "Nova transação",
        label_valorTransacao: "Valor da Transação",
        label_valorLiberado: "Valor Liberado",
        label_parcelas: "Parcelas",
        label_bandeira: "Bandeira",
        tentarNovamente: "Tentar novamente",
        transacaoSucesso: "Transacao realizada com sucesso.",
        transacaoErro: "Erro na transação. ",
        fechar_modal: "Fechar",
        editar_transacao: "Editar transação",
        em_andamento: "Transação em andamento",
      },
      formUrl: {
        url: "http://localhost:11573/",
        urlHttps: "https://local.listofacil.com.br:11574",
      },
      protocolo: null,
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
  mounted() {
    this.protocolo = window.location.protocol;
  },
  methods: {
    // emitir toggle Modal
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    novaTransacao() {
      const self = this;
      let varconfirm;
      if (self.respostaCode !== 0) {
        varconfirm = confirm("Deseja cancelar essa transação?");
      } else {
        varconfirm = true;
        self.retentativa = null;
      }

      if (varconfirm) {
        self.$router.go({ path: "/nova-transacao", force: true });
      }
    },

    concluirTransacao() {
      // bloqueia botoes no modal
      this.pagando = true;

      // remove mensagens de alerta da resposta
      this.respostaText = null;
      this.respostaCode = null;

      // limpa simulação
      if ($nuxt.$store.state.criouSimulacao == true) {
        $nuxt.$store.commit("criaSimulacao", false);
      }
      // https://local.listofacil.com.br:11574/

      const self = this;
      let externalForm;
      self.$axios.post(`${process.env.API_TRANSACTION}/transaction/create`, this.transactionObj).then((response) => {
        self.formdata2 = JSON.stringify(response.data);

        this.sendServerHeaders(self.formdata2);
      }).catch(err => console.log("Err:", err));
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
