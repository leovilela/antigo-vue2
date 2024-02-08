<template>
  <section
    class="page-financiamentos-auto page-financiamentos-auto--simulacao container-fluid"
    id="simulacao"
  >
    <div class="row">
      <div class="col-xs-8">
        <PreCadastro
          v-if="steps[0].show"
          @onEditForm="onEditForm"
          @finishPreCadastro="goToDadosDoBemFinanciado($event)"
          @changeSimulation="onChangeSimulation(true)"
        />
        <DadosBemFinanciado
          v-if="steps[1].show"
          @changeSimulation="onChangeSimulation"
          :blockSaveButton="blockSaveDadosDoBemFinanciado"
          @finishFillData="activateStep(3)"
          @onSave="onSave($event)"
          ref="dadosDoBemFinanciado"
        />
        <SimulacaoEntrada
          v-if="steps[2].show"
          @changeSimulation="deactivatePayment"
          @onSave="onSave($event)"
          @finishSimulation="onFinishSimulation($event)"
        />
      </div>
      <div class="col-xs-4">
        <PagamentoDoBem
          v-if="steps[3].show"
          :hasInstallments="hasInstallments"
          :downPayment="downPayment"
          :simulationData="simulation"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { OPEN_SIMULATION } from "~/store/simulacao/mutations";
import DadosBemFinanciado from "./dados-do-bem-financiado";
import PreCadastro from "./pre-cadastro";
import SimulacaoEntrada from "./simulacao-de-entrada";
import PagamentoDoBem from "./pagamento-panel";

export const DEFAULT_TRANSACTION_TYPE = 4;
export const DEFAULT_BRAND_TYPE = 2;
export const DEFAULT_PRODUCT_TYPE = 3;

const DEFAULT_INITIAL_STEP = 1;

export default {
  computed: {
    actualStep() {
      return this.steps.find(st => st.step === this.actualStepIndex);
    },
    ...mapState({
      isSimulationClosed: state => state.simulacao.isSimulationClosed
    })
  },
  components: {
    PreCadastro,
    DadosBemFinanciado,
    SimulacaoEntrada,
    PagamentoDoBem
  },
  data() {
    return {
      actualStepIndex: DEFAULT_INITIAL_STEP,
      blockSaveDadosDoBemFinanciado: false,
      steps: [
        {
          name: "pre-cadastro",
          show: false,
          disabled: false,
          step: 1
        },
        {
          name: "dados-do-bem-financiado",
          show: false,
          disabled: false,
          step: 2
        },
        {
          name: "simulacao-de-entrada",
          show: false,
          disabled: false,
          step: 3
        },
        {
          name: "pagamento",
          show: false,
          step: 4
        }
      ],
      hasInstallments: false,
      downPayment: 0,
      simulation: {}
    };
  },
  async mounted() {
    this.actualStep.show = true;
    await this.getFinanceService();
    this.closeSimulation();
  },
  beforeDestroy() {
    this.$refs.dadosDoBemFinanciado &&
      this.$refs.dadosDoBemFinanciado.cleanSimulation();
  },
  destroyed() {
    this.closeSimulation();
    this.cleanStateFipe()
  },
  watch: {
    isSimulationClosed(value) {
      if (value) {
        this.$refs.dadosDoBemFinanciado &&
          this.$refs.dadosDoBemFinanciado.cleanSimulation();

        this.deactivateStep(3);
        this.deactivatePayment();
        this.$nextTick(() => {
          this.openSimulation();
        });
      }
    }
  },
  methods: {
    ...mapActions({
      getFinanceService: "transaction/getFinanceService",
      cleanStateFipe: "simulacao/fipe/cleanState",
    }),
    ...mapMutations({
      openSimulation: `simulacao/${OPEN_SIMULATION}`
    }),
    closeSimulation() {
      this.onChangeSimulation();
      this.activateStepIndex = 1;
      this.openSimulation();
    },
    goToDadosDoBemFinanciado(blockDadosDoBemFinanciado) {
      this.blockSaveDadosDoBemFinanciado = blockDadosDoBemFinanciado;
      this.activateStep(2);
    },
    onFinishSimulation(event) {
      document
        .querySelector("#layout-main")
        .scrollIntoView({ behavior: "smooth" });
      this.hasInstallments = event.hasInstallments;
      this.downPayment = event.downPayment;
      this.simulation = event.simulationData;
      this.activateStep(4);
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
    onEditForm() {
      this.onChangeSimulation(true);
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
      this.installmentChoose = null;
      this.installmentDownPayChoose = null;
      this.hasInstallments = false;
    }
  }
};
</script>
