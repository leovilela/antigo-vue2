<template>
  <section class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid" id="simulacao">
    <Base-Loading />
    <div class="row">
      <div class="col-xs-8">
        <PreCadastro v-if="steps[0].show" @finishPreCadastro="activateStep(2)" @changeSimulation="onChangeSimulation(true)" />
        <DadosBemFinanciado v-if="steps[1].show" @changeSimulation="onChangeSimulation" @finishFillData="activateStep(3)" @onSave="onSave($event)"  />
        <SimulacaoEntrada v-if="steps[2].show" @changeSimulation="deactivatePayment" @onSave="onSave($event)" @finishSimulation="onFinishSimulation($event)"/>
      </div>
      <div class="col-xs-4">
        <Base-SimulacaoCondicoesPanel v-if="showDownPay" :installments="simulationDownPayInstallments" :select="selectDPrice"  :headerTitle="$t('labels.simulacaoFinanciamento.entradaParcelada')" />
        <Base-SimulacaoCondicoesPanel v-if="showPayments" :installments="simulationInstallments" :headerTitle="$t('labels.simulacaoFinanciamento.condicoesFinanciamento')" hasContractButton/>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import account from "~/utils/endpoints/account";

export default {
  computed: {
    actualStep() {
      return this.steps.find(st => st.step === this.actualStepIndex);
    },
    ...mapState({
      coefficientsSimulation: state => state.simulacao.financiamento.coefficients,
      separatedDownPay: state => state.simulacao.financiamento.separatedDownPay,
      car: state => state.simulacao.fipe.vehicle,
    }),
    showPayments() {
      return this.simulationInstallments.length > 0 && this.steps[4].show;
    },
    showDownPay() {
      return this.separatedDownPay.length > 0 && this.steps[3].show;
    },
    simulationInstallments() {
      if (!this.coefficientsSimulation) {
        return [];
      }
      return this.$services.simulation.mapInstallments(this.coefficientsSimulation, this.car.marketValue);
    },
    simulationDownPayInstallments() {
      return this.$services.simulation.mapDownPayInstallments(this.separatedDownPay, this.downPaymentChosen);
    },
    calculate() {
      return this.$services.simulation.calculateTotals(this.separatedDownPay);
    },
  },
  components: {
    PreCadastro: () => import("./pre-cadastro.vue"),
    DadosBemFinanciado: () => import("./dados-do-bem-financiado.vue"),
    SimulacaoEntrada: () => import("./simulacao-de-entrada.vue"),
  },
  data() {
    return {
      actualStepIndex: 1,
      selectDPrice: {
        id: "retorno-select",
        options: [{ value: "R0", text: "R0" }],
      },
      downPaymentChosen: 0,
      steps: [
        {
          name: "pre-cadastro",
          show: false,
          disabled: false,
          step: 1,
        },
        {
          name: "dados-do-bem-financiado",
          show: false,
          disabled: false,
          step: 2,
        },
        {
          name: "simulacao-de-entrada",
          show: false,
          disabled: false,
          step: 3,
        },
        {
          name: "condicoes-de-entrada",
          show: false,
          disabled: false,
          step: 4,
        },
        {
          name: "condicoes-de-financiamento",
          show: false,
          step: 5,
        },
      ],
    };
  },
  mounted() {
    this.actualStepIndex = 1;
    this.actualStep.show = true;
  },
  methods: {
    ...mapActions({
      getSeparatedSimulationDownPayValues: "simulacao/financiamento/getSeparatedDownPayValues",
    }),
    async onFinishSimulation(event) {
      this.downPaymentChosen = event.downPayment;
      if (this.simulationDownPayInstallments.length === 0) {
        await this.getSeparatedSimulationDownPayValues();
      }
      console.log(event.hasInstallments);

      if (event.hasInstallments) {
        this.activateStep(4);
      }
      this.activateStep(5);
    },
    activateStep(step) {
      this.actualStepIndex = step;
      this.actualStep.show = true;
      this.actualStep.disabled = true;
    },
    deactivateStep(step) {
      this.actualStepIndex = step;
      this.actualStep.show = false;
      this.actualStep.disabled = false;
    },
    onChangeSimulation(changeAll = false) {
      if (changeAll) {
        this.deactivateStep(2);
      }
      this.deactivateStep(3);
      this.deactivatePayment();
    },
    deactivatePayment() {
      this.deactivateStep(4);
      this.deactivateStep(5);
    },
  },
};
</script>

<style>

</style>
