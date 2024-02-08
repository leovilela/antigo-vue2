<template>
  <section
    class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid"
    id="pagamento-do-bem"
  >
    <Base-CetResumidaModal
      :active="modals.cet"
      :affiliate-id="affiliateId"
      :registerLoanId="registerLoanId"
      :cet="summaryCet"
      @close="modals.cet = false"
      @continue="agreementFinance"
      ref="modalCetResumida"
    />

    <Base-FinanciamentoResumidoModal
      :active="modals.financing"
      @formalization="console.log('formalizacao')"
    />
    <Base-TransacaoAndamentoModal
      :active="modals.transaction"
      :transactionText="transactionResultText"
    />
    <Base-AguardandoAssinaturaDigitalModal
      :active="modals.digitalSign"
      @close="closeDigitalSignModal"
    />

    <Base-SimulacaoCondicoesPanel
      v-if="showDownPay"
      @onChooseInstallment="installmentDownPayChoose = $event"
      labelInstallmentUnique="parcela"
      :installments="simulationDownPayInstallments"
      :select="selectDPrice"
      :headerTitle="$t('labels.simulacaoFinanciamento.entradaParcelada')"
    />

    <Base-SimulacaoCondicoesPanel
      @contract="contractFinance($event)"
      :enableContract="enableContract"
      @onChooseInstallment="installmentChoose = $event"
      :installments="simulationInstallments"
      labelInstallmentUnique="financiamento"
      :headerTitle="$t('labels.simulacaoFinanciamento.condicoesFinanciamento')"
      hasContractButton
    />
    <Base-FotosVeiculoModal
      :active="modals.fotos"
      @toClose="closeModal"
      :isNewCar="isNewCar"
      :contractId="contractId"
    />
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import {
  DEFAULT_BRAND_TYPE,
  DEFAULT_TRANSACTION_TYPE,
  DEFAULT_PRODUCT_TYPE
} from "./index.vue";

const DEFAULT_R_TYPES = {
  id: "retorno-select",
  options: [{ value: "R0", text: "R0" }]
};
export default {
  computed: {
    ...mapState({
      coefficientsSimulation: state =>
        state.simulacao.financiamento.coefficients,
      separatedDownPay: state => state.simulacao.financiamento.separatedDownPay,
      car: state => state.simulacao.fipe.vehicle,
      documentNumberFinancing: state =>
        state.simulacao.preCadastro.documentNumber,
      simulation: state => state.simulacao.financiamento.simulation,
      client: state => state.simulacao.preCadastro,
      serviceId: state => state.transaction.financeService[0].serviceID,
      affiliateId: state => state.afiliado.affiliate.id
    }),
    enableContract() {
      if (this.hasInstallments) {
        return (
          this.installmentChoose !== null &&
          this.installmentDownPayChoose !== null
        );
      }
      return this.installmentChoose !== null;
    },
    isNewCar() {
      return this.car.status === "new";
    },
    showDownPay() {
      return (
        this.simulationDownPayInstallments.length > 0 && this.hasInstallments
      );
    },
    simulationInstallments() {
      return this.$services.simulation.mapInstallments(
        this.coefficientsSimulation,
        this.simulationData.fundedValue
      );
    },
    simulationDownPayInstallments() {
      return this.$services.simulation.mapDownPayInstallments(
        this.separatedDownPay,
        this.downPayment
      );
    },
    registerLoanId() {
      return this.docsTransaction.registerLoanId || 0;
    }
  },
  data() {
    return {
      modals: {
        cet: false,
        financing: false,
        transaction: false,
        digitalSign: false,
        formalizationConclude: false,
        fotos: false
      },
      installmentChoose: null,
      installmentDownPayChoose: null,
      summaryCet: {},
      docsTransaction: {},
      contractId: null,
      selectDPrice: DEFAULT_R_TYPES,
      transactionResultText: "",
      connectionWS: null
    };
  },
  props: {
    downPayment: {
      type: Number,
      default: 0
    },
    hasInstallments: {
      type: Boolean,
      default: false
    },
    simulationData: {
      type: Object,
      default: () => ({})
    }
  },
  async mounted() {
    if (this.simulationDownPayInstallments.length === 0) {
      await this.getSeparatedSimulationDownPayValues();
    }
  },
  methods: {
    ...mapActions({
      getSeparatedSimulationDownPayValues:
        "simulacao/financiamento/getSeparatedDownPayValues",
      createAgreementFinancing: "simulacao/financiamento/agreementWithFinance",
      concluirTransacao: "transaction/concluirTransacao"
    }),
    ...mapMutations({
      closeSimulation: "simulacao/CLOSE_SIMULATION//SIMULACAO",
      finishLoading: "finishLoading",
      startLoading: "startLoading"
    }),
    async closeModal() {
      this.$nextTick(() => {
        this.modals.fotos = false;
      });
      this.$router.push("/financiamentos/auto/relatorio");
    },
    closeDigitalSignModal() {
      this.modals.digitalSign = false;
      this.modals.fotos = true;
    },
    async contractFinance(installment) {
      try {
        this.startLoading();
        const requestObject = {
          clientId: this.client.id,
          affiliateId: this.$nuxt.$store.state.usuario.clientID,
          sourceProponentId: 2,
          simulationId: this.installmentChoose.id,
          rType: this.installmentDownPayChoose
            ? this.installmentDownPayChoose.rType
            : 0,
          aliquotInput: this.installmentDownPayChoose
            ? this.installmentDownPayChoose.rAliquot
            : 0,
          numInstallments: this.installmentDownPayChoose
            ? this.installmentDownPayChoose.installmentModeId
            : 0,
          coefficient: this.installmentDownPayChoose
            ? this.installmentDownPayChoose.coefficient
            : 0,
          isZeroKm: this.car.status === "used" ? false : true,
          licensePlate: this.car.plate,
          color: this.car.color
        };
        this.docsTransaction = await this.$services.transaction.createContractsFinancing(
          requestObject
        );
        const summaryCetResponse = await this.$services.transaction.getCETSummary(
          this.docsTransaction.registerLoanId
        );

        this.summaryCet = summaryCetResponse;

        this.modals.cet = true;
        this.finishLoading();
      } catch (error) {
        if (error.status === 400) {
          return this.$swal({
            title: "Atenção",
            text: "Cliente com restrição de financiamento",
            icon: "error",
            confirmButtonText: "OK",
            showCloseButton: true,
            customClass: "swal-listo"
          });
        }
        console.log(error);
        this.finishLoading();
      }
    },
    async agreementFinance() {
      this.transactionResultText = "";
      const requestObj = {
        finance: this.summaryCet.finance
      };
      if (this.installmentDownPayChoose !== null) {
        requestObj.downPay = this.summaryCet.downPay;
      }
      this.modals.cet = false;
      this.startLoading();
      try {
        const agreementResponse = await this.createAgreementFinancing(
          requestObj
        );
        this.contractId = agreementResponse.contractId;
        this.modals.transaction = true;
        const connectorResponse = await this.$services.transaction.getPinPadConnection(
          agreementResponse.connectorRequest
        );
        if (connectorResponse.Code === 713) {
          this.transactionResultText = connectorResponse.Message;
          setTimeout(() => {
            this.modals.transaction = false;
            this.transactionResultText = "";
            this.closeSimulation();
          }, 3000);
          return;
        }
        if (connectorResponse.Code > 0) {
          this.transactionResultText = connectorResponse.Message;
          setTimeout(async () => {
            this.modals.transaction = false;
            this.transactionResultText = "";
            await this.$refs.modalCetResumida.finishLater();
          }, 3000);
          return;
        }
        this.modals.transaction = false;
        this.modals.digitalSign = true;
      } catch (error) {
        console.error(error);
        this.transactionResultText =
          "Aplicativo não responde. Favor reiniciar o Listo Fácil.";
        setTimeout(async () => {
          this.modals.transaction = false;
          await this.$refs.modalCetResumida.finishLater();
        }, 5000);
      } finally {
        this.finishLoading();
      }
    }
  }
};
</script>
