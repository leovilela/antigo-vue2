<template>
  <div id="modalNovaTransacao">
    <!-- Exibir versão do LF instalado!! -->
    <p id="versaoListoFacil">Listo Fácil v2.0</p>
    <h2 class="modalTitle">{{ text.modalNovaTransacao_title }}</h2>
    <!-- <p>{{transactionObj}}</p> -->
    <table id="dadosTransacao" v-if="respostaCode !== 0">
      <tbody>
        <tr>
          <td>{{text.label_valorTransacao}}</td>
          <td>{{showNumberAsCurrency(transactionObj.transactionValue)}}</td>
        </tr>
        <tr>
          <td>{{text.label_valorLiberado}}</td>
          <td>{{showNumberAsCurrency(transactionObj.releasedValue)}}</td>
        </tr>
        <tr v-show="transactionObj.installmentModeId != 0">
          <td>{{text.label_parcelas}}</td>
          <td>{{transactionObj.installmentModeId}}x {{showNumberAsCurrency(transactionObj.paidInstallment)}}</td>
        </tr>
        <tr>
          <td>{{text.label_bandeira}}</td>
          <td>{{getCardBrandName(transactionObj.cardBrandType)}}</td>
        </tr>
      </tbody>
    </table>
    <div class="container-fluid ">
      <div class="row">
        <div v-if="respostaCode === 0">
          <h2 style="text-align:center" class="alert alert-success">{{text.transacaoSucesso}}</h2>
        </div>
        <div v-else-if="respostaCode !== 0 && respostaCode !== null">
          <h2 style="text-align:center" class="alert alert-danger">{{text.transacaoErro}}{{respostaText}}<br><code>Erro codigo: {{respostaCode}}</code></h2>
        </div>
      </div>
    </div>

    <div id="buttons" class="container-fluid pt-15">
      <div class="row">
        <!-- <div class="col-xs-7" v-if="respostaCode !== 0" >
          <button id="concluir" @click="concluirTransacao()"><span v-if="retentativa === null">{{text.concluirTransacao}}</span><span v-else>{{text.tentarNovamente}}</span></button>
        </div>
        <div class="col-xs-5" v-if="respostaCode !== 0">
          <button id="novaTransacao" @click="novaTransacao()">{{text.novaTransacao}}</button>
        </div>
        <div class="col-xs-7" v-if="respostaCode === 0">
          <button id="novaTransacao" @click="novaTransacao()">{{text.novaTransacao}}</button>
        </div>
        <div class="col-xs-5" v-if="respostaCode === 0">
          <button id="fecharModal" @click="novaTransacao()">{{text.fechar_modal}}</button>
        </div> -->
        <div class="col-xs-7" v-if="respostaCode !== 0">
          <button id="concluir" @click="concluirTransacao" :disabled="pagando"><span v-if="retentativa === null">{{text.concluirTransacao}}</span><span v-else>{{text.tentarNovamente}}</span></button>
        </div>
        <div class="col-xs-5" v-if="respostaCode !== 0">
          <button id="editarTransacao" @click="closeModal" :disabled="pagando">{{text.editar_transacao}}</button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
/* eslint-disable func-names */

const Handler = (function () {
  let i = 1;


  const listeners = {};

  return {
    addListener(element, event, handler, capture) {
      element.addEventListener(event, handler, capture);
      listeners[i] = {
        element,
        event,
        handler,
        capture,
      };
      return i++;
    },
    removeListener(id) {
      if (id in listeners) {
        const h = listeners[id];
        h.element.removeEventListener(h.event, h.handler, h.capture);
        delete listeners[id];
      }
    },
  };
}());


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
    // define o nome da bandeira do cartão baseado no ID
    getCardBrandName(brand) {
      if (brand == 1) {
        return "Visa";
      } if (brand == 2) {
        return "Mastercard";
      } if (brand == 4) {
        return "Elo";
      } if (brand == 9) {
        return "Hipercard";
      } if (brand == 10) {
        return "Banricompras";
      }
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
    // exibe numero no formato monetário
    showNumberAsCurrency(number) {
      if (number) {
        const numero = number.toFixed(2).split(".");
        numero[0] = `R$ ${numero[0].split(/(?=(?:...)*$)/).join(".")}`;
        return numero.join(",");
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
        // envio hardcoded
        // self.formdata2 = JSON.stringify({
        //   site: "p6wVz3XpULErz5FcFa0BtfDonrxPsoUigEykzc2+bglta/fNN3ldXk6gxFdqstTN",
        //   verifyPath: "Gkxf2rj7dNQ71ELL5EJnpkX2yLr39tstw3CmpFRlfn8=",
        //   cookie: "gVcKD/akwMet2aLa/pR0qA==",
        //   userId: 1,
        //   logicalNumber: "041003500000100",
        //   storeCode: "00000001",
        //   terminalCode: "00001000",
        //   document: "20250105000106",
        //   name: "Listo Interno",
        //   address: "AV DOUTOR HELIO PALERMO",
        //   city: "Franca",
        //   state: "SP",
        //   zipCode: "14405-130",
        //   mcc: "9311",
        //   phone: "(16) 3722-8184",
        //   id: 3211151,
        //   acquirerId: 2,
        //   total: 6.0,
        //   installmentQty: 4,
        //   installmentAmount: 4,
        //   installmentValue: 1.5,
        //   value: 6.0,
        //   storeId: "00000001",
        //   terminal: "00000001",
        // });
        this.sendServerHeaders(self.formdata2);
      }).catch(err => console.log("Err:", err));
    },

    sendServerHeaders() {
      const self = this;
      let objVerify;

      const url = this.protocolo === "http:" ? self.formUrl.url : self.formUrl.urlHttps;
      let resposta;
      const formData = new FormData();
      this.activateWindowBlock();
      formData.append("data", self.formdata2);
      const request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          resposta = JSON.parse(this.response);

          self.respostaText = resposta.Message;
          self.respostaCode = resposta.Code;

          // resposta.Code -12 = aguarde o programa
          self.pagando = false;

          self.$axios.post(`${process.env.API_TRANSACTION}/transaction/verify`, resposta).then((res) => {

          }).catch(err => console.log("Err:", err));

          // console.log(resposta);
          if (self.respostaCode !== 0) {
            self.retentativa = true;
          }
        }
      };

      request.open("POST", url, true);
      request.setRequestHeader("Accept", "*/*");
      request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      request.send(self.formdata2);
    },

    activateWindowBlock() {
      const unloadWindowEvent = window.attachEvent ? "onbeforeunload" : "beforeunload"; // / make IE7, IE8 compatible
      this.confirmExitlistenerID = Handler.addListener(window, unloadWindowEvent, this.confirmExitHandler);
    },

    confirmExitHandler(e) { // For >=IE7, Chrome, Firefox
      this.exited = true;
      setTimeout(() => {
        setTimeout(() => {
          // run only if user cancel exit
          this.exited = false;
        }, 1000);
      }, 1);

      (e || window.event).returnValue = confirmExitMessage;
      return confirmExitMessage;
    },

  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#modalNovaTransacao {
  height: 100%;

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
