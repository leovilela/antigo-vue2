<template>
  <div class="page-signDocuments" id="signDocuments">
    <div id='container' v-show="!controls.loading"></div>
    <div id="loadImage" v-show="controls.loading">
    <!-- <div id="loadImage"> -->
      <div class="loadingMessage">
        <img src="~assets/img/loading.gif" alt="Carregando">
        <div class="wrapper" v-if="controls.loadingDocument" v-html="text.loadingDocument"></div>
        <div class="wrapper" v-if="controls.loadingSignature" v-html="text.loadingSignature"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default {
  data() {
    return {
      urlDocument: "Sign/GetDocumentKey/registerdata",
      urlCCB: "Sign/GetDocumentKey/CCB",
      url: null,
      controls: {
        loading: false,
        loadingDocument: false,
        loadingSignature: false,
        tokenClicksign: null,
        tokenClicksignSignalR: null,
        load: 0,
      },
      text: {
        loadingDocument: "<h1>Aguarde</h1><h3>Carregando documento. Não saia da página.</h3>",
        loadingSignature: "<h1>Aguarde</h1><h3>Enviando assinatura. Não saia da página.</h3>",
      },
    };
  },
  created() {
    // $nuxt.$store.getters.loanFormCompleted;
    // $nuxt.$store.getters.loanFormSigned;
    // $nuxt.$store.getters.loanFormActive;
    // $nuxt.$store.getters.showCCBtoSign;
  },
  methods: {
    modalControl(data) {
      const self = this;
      const md = self.$nuxt.$emit("toggleModal", data);
    },
    closeModal() {
      this.$nuxt.$emit("toggleModal", null);
    },
    loadPage() {
      const self = this;
      const Click = $nuxt.$options.ClickSign;
      const resposta = null;
      if (!$nuxt.$store.getters.loanFormSigned && !$nuxt.$store.getters.showCCBtoSign) {
        self.url = self.urlDocument;
      }
      if ($nuxt.$store.getters.loanFormSigned && $nuxt.$store.getters.showCCBtoSign) {
        $nuxt.$store.commit("setLoanCurrentTab", "transacao");
        self.url = self.urlCCB;
      }
      self.$axios
        .get(`${process.env.API_SIGNATURE}/${self.url}`)
        .then((response) => {
          // console.log("response get clicksign document", response);
          if (response.status === 200) {
            self.controls.tokenClicksign = response.data.key;
            self.controls.tokenClicksignSignalR = response.data.signerKey;
            const widget = new Click(self.controls.tokenClicksign);
            // Define o endpoint https://sandbox.clicksign.com ou https://app.clicksign.com
            widget.endpoint = process.env.CLICKSIGN;
            // Define a URL de origem (parametro necessário para utilizar através de WebView)
            // widget.origin = process.env.SITE_URL;
            widget.origin = window.location.origin;
            // Monta o widget no div
            if (self.controls.load <= 0) {
              self.controls.load++;
              widget.mount("container");
              self.controls.load++;
            }

            const connection = new HubConnectionBuilder()
              .withUrl(`${process.env.API_SIGNATURE}/notificationClickSign?signerKey=${self.controls.tokenClicksignSignalR}`)
              .build();

            connection.start({ jsonp: true }).catch(err => console.error(err.toString()));


            if ($nuxt.$store.state.emprestimos.completed && !$nuxt.$store.state.emprestimos.signed) {
              connection.on("ReceiveClickSign", (message) => {
                const resposta = JSON.parse(message);
                if (resposta.sign) {
                  self.controls.loading = false;
                  self.controls.loadingSignature = false;
                  $nuxt.$store.commit("setLoanFormSigned", true);
                  $nuxt.$store.commit("setLoanFormActive", true);
                  connection.stop().catch(err => console.error(err.toString()));
                }
              // console.log("teste ", resposta.sign);
              });
            }

            if ($nuxt.$store.state.emprestimos.completed && $nuxt.$store.state.emprestimos.signed && $nuxt.$store.state.emprestimos.active) {
              connection.on("ReceiveClickSign", (message) => {
                let resposta = JSON.parse(message);
                // console.log("resposta", resposta);
                if (resposta.sign) {
                  self.controls.loading = false;
                  resposta = {
                    AppVersion: "0", Answer: "0", Code: "0", Message: "Operação concluída com SUCESSO", document: "CCB",
                  };
                  self.modalControl({ api: "emprestimoresposta", modalContent: resposta });
                  $nuxt.$store.commit("setLoanFormSigned", true);
                  $nuxt.$store.commit("setLoanFormActive", true);
                  $nuxt.$store.commit("setLoanCCBStatus", false);
                  $nuxt.$store.commit("setLoanCurrentTab", "limites");
                  connection.stop().catch(err => console.error(err.toString()));
                // setTimeout(() => self.closeModal(), 3000);
                }
              });
            }
            // Callback que será disparado quando o documento for carregado
            widget.on("loaded", (ev) => {
            // console.log("loaded!");
              self.controls.loading = false;
              self.controls.loadingDocument = false;
            });

            // Callback que será disparado quando o documento for assinado
            widget.on("signed", (ev) => {
              setTimeout(() => {
                const invalid = document.getElementsByClassName("page-signDocuments")[0];
                self.controls.loading = true;
                self.controls.loadingSignature = true;
                invalid.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 50);
            });
          } else {
            const resposta = {
              AppVersion: "0", Answer: "0", Code: "0", Message: "Erro na gravação dos dados. Favor consultar a Listo SCD",
            };
            self.modalControl({ api: "erro", modalContent: resposta.Message });
            $nuxt.$router.push("/emprestimos", () => {});
            self.controls.loading = false;
            self.controls.loadingDocument = false;
            self.controls.loadingSignature = false;
          }
        }).catch(err => console.log("Err:", err));
    },
  },
  mounted() {
    const self = this;

    self.controls.loading = true;
    self.controls.loadingDocument = true;
    self.$nextTick(() => {
      if (self.controls.load <= 0) {
        self.loadPage();
      }
    });
  },
  computed: {
    getLoanFormCompleted() {
      return $nuxt.$store.getters.loanFormCompleted;
    },
    getLoanFormSigned() {
      return $nuxt.$store.getters.loanFormSigned;
    },
    getLoanFormActive() {
      return $nuxt.$store.getters.loanFormActive;
    },
    showCCBtoSign() {
      return $nuxt.$store.getters.showCCBtoSign;
    },
  },
};
</script>

<style lang="less">
@import "~assets/main.less";
@import "~assets/vars.less";

.page-signDocuments {
  #container{
    // height: 5000px;
    height: calc(100vh - 190px);
  }
  #loadImage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 995;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,0.75);
    user-select: none;

    img {
      // position: absolute;
      // margin: auto;
      // right: 0;
      // left: 0;
      // bottom: 0;
      // top: 0;
      @media (max-width: @screen-xs-max) {
        max-width: 160px;
      }

      @media (min-width: @screen-sm-min) {
        max-width: 240px;
      }

      @media (min-width: @screen-md-min) {
        max-width: 320px;
      }

      @media (min-width: @screen-lg-min) {
        max-width: 400px;
      }
    }
    .loadingMessage {
      text-align: center;
      width: 100vw;
      max-height: 300px;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}

</style>
