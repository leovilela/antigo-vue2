<template>
  <section class="page-transaction-auto page-transaction-auto--simulacao container-fluid" id="transaction">
    <Base-Loading />
    <div class="row">
      <div class="transaction-page">
        <div class="ladoA">
          <Base-Services v-if="steps[0].show" @onCardBrands="onCardBrands" :disabled="steps[0].disabled"/>
          <Base-Cardbrands v-if="steps[1].show" @onFields="activateStep(3)" :disabled="steps[1].disabled"/>
        </div>
        <div class="ladoB">
          <Base-Fields v-if="steps[2].show" @onInstalments="activateStep(4)" :renderTransactionType="renderTransactionType" :disabled="steps[2].disabled"/>
        </div>
        <div class="ladoC">
          <Base-Instalments v-if="steps[3].show" :disabled="steps[3].disabled"/>
        </div>
      </div>
      <component-modal slot="modal"></component-modal>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import modal from "~/components/modal.vue";
import checkAccess from '../../middleware/routeGuard';
import { ROLES } from '../../enums/Roles';

export default {
  components: {
    "component-modal": modal,
  },
  asyncData({redirect, store}) {
    if (!checkAccess(store, ROLES.NEW_TRANSACTION)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
      actualStepIndex: 1,
      renderTransactionType: 1,
      steps: [
        {
          name: "services",
          show: false,
          disabled: false,
          step: 1,
        },
        {
          name: "cardbrands",
          show: false,
          disabled: false,
          step: 2,
        },
        {
          name: "fields",
          show: false,
          disabled: false,
          step: 3,
        },
        {
          name: "instalments",
          show: false,
          disabled: false,
          step: 4,
        },


      ],
    };
  },
  mounted() {
    this.actualStepIndex = 1;
    this.actualStep.show = true;
  },
  computed: {
    actualStep() {
      return this.steps.find(st => st.step === this.actualStepIndex);
    },
    ...mapState({
      externalProductPaymenta: state => state.externalProductPayment,
      selectedCard: state => state.transaction.selectedCard,
      selectInstalment: state => state.transaction.selectInstalment,
      simulationInstalment: state => state.transaction.simulationInstalment,
    }),
  },
  destroyed() {
    this.clearSimulation();
    this.clearTransaction();
    // this.cleanClient();
    this.externalProductPayment(false);
  },
  methods: {
    onCardBrands() {
      this.activateStep(2);
      this.deActivateStep(4);
    },
    ...mapActions({
      clearSimulation: "transaction/clearSimulation",
      clearTransaction: "transaction/clearTransaction",
      cleanClient: "detran/cleanClient",
      externalProductPayment: "externalProductPayment",
    }),
    ...mapMutations(["startLoading", "finishLoading"]),
    async onSave(event) {
      const saveStepMethod = event.stepName;
      try {
        await this[`onSave${saveStepMethod}`](event.target);
      } catch (error) {
        console.log({ error });
        return this.$swal({
          title: "Desculpe",
          text: "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
          customClass: "swal-listo",
        });
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
  },
};
</script>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #transaction {
    position: relative;
    .travaModal{
      position: absolute;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.53333);
      top: 0;
      left: 0;
      z-index: 800;
    }
    .disabled {
      opacity: 0.5;
      pointer-events: none;
      cursor: initial;
    }
    .panel-heading{
      background-color:@color5;
      color: @color2;
    }


    .finishButton{
      width: 100%;
      color: @color7;
    }
    input {
      // margin: 5px 0;
      font-family: @mainFontLight;

      &[type="radio"] {
        margin-right: 5px;
        vertical-align: sub;
      }
    }
    .form-group-error {
      color: @color26;
      input {
        border-color: @color26;
      }
    }

    #formSubmit {
      text-align: right;
      border-top: 1px solid @color14;
      padding-top: 10px;
    }

    #loadImage {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 995;
      top: 0;
      left: 0;
      background-color: rgba(255,255,255,0.75);

      img {
        position: absolute;
        margin: auto;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;

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
    }
  }

  @media (max-width: @screen-xs-max) {

  }
  @media (min-width: @screen-sm-min) {

  }
  @media (min-width: @screen-md-min) {
    .transaction-page {
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
  .ladoC {
    width: 100%;
  }
  }
  @media (min-width: @screen-lg-min) {
  .transaction-page {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .ladoA {
    display: flex;
    flex-direction: column;
    width: 33%;
  }
  .ladoB {
    width: 33%;
  }
  .ladoC {
    width: 33%;
  }
  }

</style>
