<template>
  <section
    class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid"
  >
    <div class="row">
      <div id="details" class="col-xs-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            <span>{{ $t("titles.detalhesFinanciamento") }}</span>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-xs-7">
                <ul class="cliente-veiculo">
                  <li><h3>Cliente:</h3></li>
                  <li>
                    <p>CPF: {{ reportsFinancingDetails.cpf }}</p>
                  </li>
                  <li v-if="reportsFinancingDetails.contractId !== 0">
                    <p>CCB: {{ reportsFinancingDetails.contractId }}</p>
                  </li>
                  <li>
                    <p>Nome: {{ reportsFinancingDetails.name }}</p>
                  </li>
                  <li>
                    <p>E-mail: {{ reportsFinancingDetails.mail }}</p>
                  </li>
                  <li>
                    <p>Celular: {{ reportsFinancingDetails.cellphone }}</p>
                  </li>
                  <li><h3>Veículo:</h3></li>
                  <li>
                    <p>Marca: {{ reportsFinancingDetails.brand }}</p>
                  </li>
                  <li>
                    <p>Modelo: {{ reportsFinancingDetails.model }}</p>
                  </li>
                  <li>
                    <p>Combustível: {{ reportsFinancingDetails.fuel }}</p>
                  </li>
                  <li>
                    <p>Ano / Modelo: {{ reportsFinancingDetails.year }}</p>
                  </li>
                  <li>
                    <p>Cor: {{ reportsFinancingDetails.color }}</p>
                  </li>
                </ul>
              </div>
              <div class="col-xs-5">
                <Base-Box
                  title="Solicitar assinatura de documentos"
                  buttonText="Solicitar"
                  @click="sendPushNotification"
                  v-if="
                    reportsFinancingDetails.statusId == 7 ||
                      reportsFinancingDetails.statusId == 1
                  "
                  ><p>
                    Celular: {{ reportsFinancingDetails.cellphone }}
                  </p></Base-Box
                >
                <Base-Box
                  title="Enviar fotos pendentes"
                  buttonText="Carregar"
                  @click="modals.fotos = true"
                  v-if="
                    reportsFinancingDetails.statusId == 7 ||
                      reportsFinancingDetails.statusId == 2
                  "
                />
                <Base-Box
                  title="Pagamento pendente"
                  buttonText="Transacionar"
                  @click="cetResumida"
                  v-if="reportsFinancingDetails.allowsTransact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Base-Button @click="goBack()" class="btn-voltar"
      >Voltar ao início</Base-Button
    >
    <Base-TransacaoAndamentoModal
      :active="modals.transaction"
      :transactionText="transactionResultText"
    />
    <Base-FotosVeiculoModal
      :active="modals.fotos"
      @toClose="closeModal"
      :isNewCar="isNewCar"
      :contractId="contractId"
    />
    <Base-CetResumidaModal
      :active="modals.cet"
      :affiliate-id="affiliateId"
      :cet="summaryCet"
      :registerLoanId="registerLoanId"
      :zeroKm="isNewCar"
      :hasRescueOperation="true"
      @close="modals.cet = false"
      @continue="agreementFinance"
    />

    <Base-AguardandoAssinaturaDigitalModal
      :active="modals.digitalSign"
      @close="closeDigitalSignModal"
    />
    <Base-NotificacaoModal
      :active="modals.notificacao"
      @close="modals.notificacao = false"
    />
  </section>
</template>

<script>
import isEmpty from 'lodash/isEmpty';
import {
  mapState, mapActions, mapMutations, mapGetters,
} from "vuex";

export default {
  name: "app",
  data() {
    return {
      modals: {
        fotos: false,
        cet: false,
        digitalSign: false,
        notificacao: false,
        transaction: false,
      },
      summaryCet: {},
      installmentDownPayChoose: null,
      transactionResultText: "",
      hasToShowTransactionButton: true,
    };
  },
  props: {
    downPayment: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapActions({
      getReportFinancingDetails:
        "simulacao/relatorio/getReportFinancingDetails",
      createAgreementFinancing: "simulacao/financiamento/agreementWithFinance",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    async sendPushNotification() {
      this.startLoading();
      try {
        const cpf = this.documentNumber.replace(/(\.|\/|\-)/g, "");
        await this.$services.report.pushNotification(cpf);
        this.modals.notificacao = true;
        this.finishLoading();
      } catch (error) {
        console.log({ error });
      }
    },
    async loadReportFinancingDetails() {
      try {
        await this.getReportFinancingDetails(this.registerLoanId);
      } catch (error) {
        console.log({ error });
      }
    },
    async closeModal() {
      await this.loadReportFinancingDetails();
      this.modals.fotos = false;
    },
    goBack() {
      this.$router.push("/financiamentos/auto/relatorio");
    },
    async cetResumida() {
      const summaryCetResponse = await this.$services.transaction.getCETSummary(
        this.registerLoanId,
      );
      this.summaryCet = summaryCetResponse;
      this.modals.cet = true;
    },
    async agreementFinance() {
      this.transactionResultText = "";
     
      const requestObj = {
        finance: this.summaryCet.finance,
      };
      
      if (!isEmpty(this.summaryCet.downPay)) {
        requestObj.downPay = this.summaryCet.downPay;
      }
      
      this.modals.cet = false;
      this.modals.transaction = true;
      try {        
        const agreementResponse = await this.createAgreementFinancing(
          requestObj,
        );
        const connectorResponse = await this.$services.transaction.getPinPadConnection(
          agreementResponse.connectorRequest,
        );
        if (connectorResponse.Code > 0) {
          this.transactionResultText = connectorResponse.Message;
          setTimeout(() => {
            this.modals.transaction = false;
            this.transactionResultText = "";
          }, 3000);
          return;
        }
        this.modals.transaction = false;
        this.modals.digitalSign = true;
      } catch (error) {
        this.transactionResultText = "Aplicativo não responde. Favor reiniciar o Listo Fácil.";
        setTimeout(() => {
          this.modals.transaction = false;
        }, 3000);
      } finally {
        await this.loadReportFinancingDetails();
        this.finishLoading();
      }
    },
    closeDigitalSignModal() {
      this.modals.digitalSign = false;
      this.$router.push("/financiamentos/auto/relatorio");
    },
  },
  async mounted() {
    await this.loadReportFinancingDetails();
  },
  computed: {
    ...mapGetters({
      clientID: "simulacao/relatorio/clientID",
    }),
    ...mapState({
      reportsFinancingDetails: state => state.simulacao.relatorio.reportsFinancingDetails,
      affiliateId: state => state.afiliado.affiliate.id,
    }),
    isNewCar() {
      return this.reportsFinancingDetails.isZeroKm;
    },
    contractId() {
      return this.reportsFinancingDetails.contractId;
    },
    documentNumber() {
      return this.reportsFinancingDetails.cpf;
    },
    registerLoanId() {
      return parseInt(this.$route.params.id, 10);
    },
  },
};
</script>

<style lang="less">
@import "~assets/vars.less";
@import "vue2-dropzone/dist/vue2Dropzone.min.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.page-financiamentos {
  .panel {
    &-default {
      .panel-heading {
        background-color: @color1;
        color: @color2;
      }
    }
  }
}
button {
  background: @color1;
  color: @color7;
  text-transform: uppercase;
}
ul {
  list-style-type: none;
  padding: 0;
}
.cliente-veiculo {
  h3 {
    font-family: "newjuneregular";
    font-size: @ftSizeNormal;
    color: @color1;
    margin: 8px 0 10px 0;
  }
  p {
    font-family: "newjuneregular";
    font-size: @ftSizeNormal;
    color: @color1;
    line-height: 22px;
    margin: 0;
    padding: 0;
  }
}

.btn-voltar {
  width: auto;
  font-family: "newjunebold";
  font-size: @ftSizeNormal;
  color: @color7;
  background: @color1;
  text-transform: uppercase;
  margin: 0 auto 20px auto !important;
  padding: 5px 44px;
  justify-content: center;
  display: flex;
}
</style>
