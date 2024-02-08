<template>
  <section class="page-simulation">
    <div class="simulacao" v-if="!report">
      <Base-ProgressBar
        :creditLimitMin="0"
        :creditLimit="limits.available"
        :creditLimitMax="limits.maximum"
        :type="'creditLimit'"
      />
      <div class="simulacao__container">
        <Base-DadosTransacao
          :key="dadosTransacaoKey"
          @onFinishTransactionData="onFinishTransactionData"
        />
        <Base-EmprestimoSimulacao
          v-if="showSimulationTable"
          @onSelectedInstallment="onSelectedInstallment"
        />
      </div>
      <div class="simulacao__button-box">
        <Base-Button
          class="simulacao__button"
          @click="contract"
          :disabled="!isContractButtonDisabled"
        >
          <span class="icon"></span>
          {{ $t("buttons.contratar") }}
        </Base-Button>
      </div>
    </div>

    <div class="page-simulation__report" v-else>
      <Base-Clicksign
        :signatureKey="simulationSignKey.key"
        @unmount="goToSimulation"
        v-if="hasSimulationSigned"
      />
      <Base-ReportSimulacao
        @onYesNext="sendTransaction"
        @onNotEdit="resetPage"
        v-else
      />
    </div>

    <Base-TransacaoAndamentoModal :active="isLoadingTransaction" />
  </section>
</template>

<script>
import { createNamespacedHelpers, mapState } from "vuex";
import isEmpty from 'lodash/isEmpty';
import { UNSIGN_SIMULATION, SIGN_SIMULATION } from "~/store/loan/simulation/mutations"

const {
  mapState: loanSimulationState,
  mapActions: loanSimulationActions,
  mapMutations: loanSimulationMutations
} = createNamespacedHelpers("loan/simulation");

const {
  mapState: loanState,
  mapActions: loanActions
} = createNamespacedHelpers("loan");

const { mapState: affiliateState } = createNamespacedHelpers("affiliate");

export default {
  layout: "shell",
  computed: {
    ...mapState(["isLoadingTransaction"]),
    ...loanSimulationState([
      "limits",
      "pinpadData",
      "hasSimulationSigned",
      "simulationSignKey",
      "signatureStatus",
    ]),
    ...affiliateState(["affiliate"]),
    ...loanState(["registerFormId", "status"]),
    isContractButtonDisabled() {
      return this.selectedInstallment;
    }
  },
  data() {
    return {
      dadosTransacaoKey: 0,
      showSimulationTable: false,
      selectedInstallment: null,
      modals: {
        transaction: false
      },
      report: false
    };
  },
  destroyed() {
    this.cleanState();
  },
  async mounted() {
    this.$store.commit('finishTransactionLoading')
    await this.getServices();
    if (isEmpty(this.limits)) {
      this.$router.push('/painel-do-cliente')
      const result = await this.$services.swal("", "Atenção, ainda não foi dessa vez! Normalmente isso acontece quando você ainda não tem histórico de transações com a gente. Mas não desanime, porque nosso sistema acompanha nossa parceria dia-a-dia e quanto mais transações você fizer na nossa plataforma, mais podemos te conhecer! Continue com a gente e em breve você também poderá contar com as soluções de empréstimo da Listo.").callDanger({
        showCloseButton: false,
        allowOutsideClick: false,
        allowEnterKey: false
      });
    }
    if (!isEmpty(this.signatureStatus)) {
      await this.signContract();
      this.report = true
    }
  },
  methods: {
    ...loanSimulationMutations({
      unsignSimulation:  UNSIGN_SIMULATION,
      signSimulation: SIGN_SIMULATION
    }),
    ...loanSimulationActions([
      "getServices",
      "setTransactionData",
      "getCoefficients",
      "createTransaction",
      "cleanState",
      "signContract",
      "getCetResume"
    ]),
    ...loanActions(["getRegisterStatus"]),
    onSelectedInstallment(installment) {
      this.selectedInstallment = installment;
    },
    async goToSimulation() {
      await this.getRegisterStatus();
      await this.getServices();
      this.resetPage();
    },
    async onFinishTransactionData(transactionData) {
      try {
        this.setTransactionData(transactionData);
        await this.getCoefficients();
        this.showSimulationTable = true;
      } catch (error) {
        this.resetPage();
      }
    },
    async sendTransaction() {
      try {
        const personKeys = {
          fullName: this.affiliate.fullName,
          documentNumber: this.affiliate.document,
          date: this.affiliate.birthDate
        };
        await this.createTransaction({
          selectedInstament: this.selectedInstallment.meta,
          ...personKeys
        });
        await this.signContract();
      } catch (error) {
        console.log(error);
      }
    },
    resetPage() {
      this.showSimulationTable = false;
      this.setTransactionData({});
      this.dadosTransacaoKey += 1;
      this.report = false;
      this.unsignSimulation()
    },
    async contract() {
      try {
        await this.getRegisterStatus();
        await this.getCetResume({
          selectedInstament: this.selectedInstallment.meta
        });
        this.report = true;
      } catch (error) {
        console.error(error);
        this.report = false;
      } finally {
        this.modals.transaction = false;
      }
    }
  },
  watch: {
    "status.transaction"(value, newValue) {
      this.report = newValue;
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
