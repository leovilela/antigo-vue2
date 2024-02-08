<template>
  <div id="modalNovaTransacao">
    <!-- Exibir versão do LF instalado!! -->
    <h2  v-if="transactionObj.Code === 0" class="modalTitle"></h2>
    <h2  v-if="transactionObj.Code !== 0" class="modalTitle">{{text.tentarNovamente}}</h2>

    <div class="container-fluid ">
      <div class="row">
        <div class="col-xs-12" v-if="transactionObj.Code === 0">
          <h2 style="text-align:center" class="alert alert-success" v-if="serviceName === 'DETRAN - Pagamento de Taxas'">{{text.pedido_concluido}}</h2>
          <h2 style="text-align:center" class="alert alert-success" v-else>{{text.transacaoSucesso}}</h2>
        </div>
        <div class="col-xs-12" v-if="transactionObj.Code !== 0">
          <h2 style="text-align:center" class="alert alert-danger">Code: {{transactionObj.Code}} - {{transactionObj.Message}}</h2>
        </div>
      </div>
    </div>

    <div id="buttons" class="container-fluid pt-15">
      <div class="row">
        <div class="form-group col-xs-12">
          <button id="concluir" @click="closeModal" v-if="transactionObj.Code !== 0"><span>{{text.tentarNovamente}}</span></button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable func-names */

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      timer: "",
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
        pedido_concluido: "Pedido concluído com sucesso",
      },
      formUrl: {
        url: "http://localhost:11573/",
        urlHttps: "https://local.listofacil.com.br:11574",
      },
      printButton: false,
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
    clearTimeout(this.timer);
    this.protocolo = window.location.protocol;
    if (this.transactionObj.Code === 0) {
      this.timer = setTimeout(this.redirectPage, 5000);
    }
    setTimeout(() => {
      this.printButton = true;
    }, 10000);
  },
  methods: {
    ...mapActions({
      cleanClient: "detran/cleanClient",
      clearSimulation: "transaction/clearSimulation",
      externalProductPayment: "externalProductPayment",
    }),
    // emitir toggle Modal
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    redirectPage() {
      this.closeModal();
      if (this.serviceName === "DETRAN - Pagamento de Taxas") {
        this.$router.push("/debitos-veiculares/detran/relatorios", () => {});
        return true;
      }
      this.clearSimulation();
      this.externalProductPayment(false);
      this.$router.push("/painel-do-cliente", () => {});
    },
  },
  computed: {
    ...mapState({
      serviceName: state => state.detran.serviceName,
    }),
  },
  destroyed() {
    clearTimeout(this.timer);
    if (this.transactionObj.Code === 0) {
      this.cleanClient();
    }
  },
};
</script>

<style lang="less" scoped>
@import "../assets/vars.less";
@import "../assets/variables.less";

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
      background: transparent url("../assets/img/ico-cadeado.svg");
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
