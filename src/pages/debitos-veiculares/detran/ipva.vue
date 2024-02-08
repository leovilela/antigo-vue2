<template>
  <section class="page-pagamentos-auto page-pagamentos-auto--simulacao container-fluid" id="simulacao">
    <Base-Loading />
    <div class="row">
      <div class="detran-page">
        <div class="ladoA">
          <Base-IpvaConsulta v-if="steps[0].show" @onResultConsultIpva="activateStep(2)" :disabled="steps[0].disabled"/>
          <Base-IpvaResultado v-if="steps[1].show" @onSimulacaoIpva="activateStep(3)"/>
        </div>
        <div class="ladoB">
          <Base-IpvaSimulacao v-if="$mq === 'bigScreen' && steps[2].show" />
          <Base-IpvaSimulacao v-if="($mq === 'mobile' || $mq === 'tablet' || $mq === 'laptop' || $mq === 'desktop')  && steps[2].show" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import cep from "~/utils/endpoints/cep";

export default {
  computed: {
    actualStep() {
      return this.steps.find(st => st.step === this.actualStepIndex);
    },
  },
  components: {
    // consulta: () => import("./pagamento-ipva.vue"),
    // resultado: () => import("./resultado-ipva.vue"),
    // simulacao: () => import("./simulacao-ipva.vue"),
  },
  data() {
    return {
      actualStepIndex: 1,
      steps: [
        {
          name: "consulta",
          show: false,
          disabled: false,
          step: 1,
        },
        {
          name: "resultado",
          show: false,
          disabled: false,
          step: 2,
        },
        {
          name: "simulacao",
          show: false,
          disabled: false,
          step: 3,
        },
      ],
    };
  },
  created() {
    this.clearTransaction();
  },
  mounted() {
    this.clearSimulation();
    this.actualStepIndex = 1;
    this.actualStep.show = true;
  },
  methods: {
    ...mapActions({
      clearSimulation: "transaction/clearSimulation",
      clearTransaction: "transaction/clearTransaction",
    }),
    async onSave(event) {
      const saveStepMethod = event.stepName;
      try {
        await this[`onSave${saveStepMethod}`](event.target);
      } catch (error) {
        console.log("{ error }");
      }
    },
    activateStep(step) {
      this.actualStepIndex = step;
      this.actualStep.show = true;
      this.actualStep.disabled = true;
    },
    deActivateStep(step) {
      this.actualStepIndex = step;
      this.actualStep.show = false;
      this.actualStep.disabled = false;
    },
    onSaveResultadoDetran() {
      // console.log("ResultadoDetran");
      this.activateStep(3);
    },
  },
};
</script>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  @media (max-width: @screen-xs-max) {

  }
  @media (min-width: @screen-sm-min) {

  }
  @media (min-width: @screen-md-min) {
    .detran-page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
   .ladoA {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  .ladoB {
    width: 100%;
  }
  }
  @media (min-width: @screen-lg-min) {
  .detran-page {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .ladoA {
    display: flex;
    flex-direction: column;
    width: 60%;
  }
  .ladoB {
    width: 40%;
  }
  }

</style>
