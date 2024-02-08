<template>
  <div class="ficha-cadastral-page">
    <section
      :class="`ficha-cadastral ficha-cadastral__step${orderFlow.position}`"
      v-if="showRegisterForm"
    >
      <Base-ProgressBar
        class="ficha-cadastral__progress-bar"
        :progress="currentStepInPorcentage"
      />

      <Base-LoanForms
        ref="loanForm"
        :form="step.form"
        :key="orderFlow.position"
        @skipFormNow="skipFormNow"
        v-if="showRegisterForm"
      />
      <div class="ficha-cadastral__buttons ficha-cadastral__buttons-line">
        <Base-Button
          class="ficha-cadastral__button ficha-cadastral__button-back"
          v-if="orderFlow.position > 1"
          @click="buttonBack"
          >Voltar</Base-Button
        >

        <Base-Button
          class="ficha-cadastral__button ficha-cadastral__button-next"
          v-if="orderFlow.position !== lastStep"
          @click="buttonNext"
          >Próxima</Base-Button
        >
        <Base-Button
          class="ficha-cadastral__button ficha-cadastral__button-next"
          v-if="orderFlow.position === lastStep"
          @click="finishRegisterForm"
          >Finalizar</Base-Button
        >
      </div>
    </section>

    <div v-else>
      <Base-Clicksign
        :signatureKey="registerFormSignKey.key"
        v-if="report"
        @unmount="goToSimulation"
      />
      <Base-ReportFichaCadastral @onBack="onback" @onNext="onnext" v-else />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { SET_ORDER_REGISTER, SIGN_REGISTER_FORM } from "~/store/loan/mutations";

const {
  mapState: loanState,
  mapMutations: loanMutations,
  mapActions: loanActions,
  mapGetters: loanGetters
} = createNamespacedHelpers("loan");

const { mapState: affiliateState } = createNamespacedHelpers("affiliate");

const LEGAL_PERSON_ID = 2;

const GOTO_ENUM = {
  FORWARD: 'FORWARD',
  BACK: 'BACK'
}

export default {
  layout: "shell",
  data() {
    return {
      report: false,
      goTo: GOTO_ENUM.FORWARD
    };
  },
  computed: {
    ...loanGetters(["steps"]),
    ...affiliateState(["affiliate"]),
    ...loanState([
      "orderFlow",
      "regiterFormSigned",
      "registerFormSignKey",
      "status"
    ]),
    showRegisterForm() {
      return !this.status.completed;
    },
    lastStep() {
      return this.steps.length;
    },
    currentStepInPorcentage() {
      return (this.orderFlow.position / this.steps.length) * 100;
    },
    step() {
      const activeForm = this.steps.find(
        step => step.position === this.orderFlow.position
      );
      if (!activeForm) {
        return "";
      }
      return activeForm;
    }
  },
  async asyncData({ store, redirect }) {
    const { affiliate } = store.state.affiliate;
    const { dispatch } = store;

    // console.log("cadastro");

    await dispatch("loan/getRegistrationFormData");

    // if (affiliate.affiliationTypeID === LEGAL_PERSON_ID) {
    //   await dispatch("loan/getBlockWithName", "registerDataPj");
    // } else {
    //   await dispatch("loan/getBlockWithName", "registerDataPf");
    // }

    await dispatch("loan/getRegisterStatus");

    return {};
  },
  methods: {
    ...loanMutations({
      setOrder: `${SET_ORDER_REGISTER}`
    }),
    ...loanActions([
      "signRegisterForm",
      "setRegisterStep",
      "getRegisterStatus"
    ]),
    async buttonBack() {
      await this.setRegisterStep();
      this.setOrder({
        id: this.step.id,
        position: this.step.position -1
      });
      this.goTo = GOTO_ENUM.BACK
    },

    async finishRegisterForm() {
      try {
        if (!this.validateForm()) {
          return;
        }
        if (this.$refs.loanForm.activeForm.canSkipForm) {
          this.setOrder({
            id: this.step.id,
            position: this.step.position + 1
          });
          await this.getRegisterStatus();
          return;
        }
        await this.$refs.loanForm.activeForm.createOrUpdateSelf();
        this.setOrder({
          id: this.step.id,
          position: this.step.position + 1
        });
        await this.setRegisterStep();
        await this.getRegisterStatus();
      } catch (error) {
        console.error(error);
      }
    },
    skipFormNow() {
      let position;
      if (this.goTo === GOTO_ENUM.BACK) {
        position = this.step.position - 1
      } else if (this.goTo === GOTO_ENUM.FORWARD) {
        position = this.step.position + 1
      }
      this.setOrder({
        id: this.step.id,
        position
      });
    },
    validateForm() {
      try {
        this.$refs.loanForm.activeForm.validateSelf();
        return this.$refs.loanForm.activeForm.isFormValid;
      } catch (error) {
        console.error(error);
        this.$services
          .$swal("Erro", "Ocorreu um erro nas validações.")
          .callDanger();
      }
    },

    async goToSimulation() {
      try {
        await this.getRegisterStatus();
        this.$router.push("/emprestimos/simulacao");
      } catch (error) {
        console.error(error);
      }
    },

    async buttonNext() {
      try {
        if (!this.validateForm()) {
          return;
        }
        this.goTo = GOTO_ENUM.FORWARD;
        if (this.$refs.loanForm.activeForm.canSkipForm) {
          this.setOrder({
            id: this.step.id,
            position: this.step.position + 1
          });
          return;
        }
        await this.$refs.loanForm.activeForm.createOrUpdateSelf();
        this.setOrder({
          id: this.step.id,
          position: this.step.position + 1
        });
      } catch (error) {
        console.error(error);
      }
    },
    async onback() {
      this.setOrder({
        id: 1,
        position: 1
      });
      this.report = false;
      try {
        await this.setRegisterStep();
        await this.getRegisterStatus();
      } catch (error) {
        console.error(error);
      }
    },
    async onnext() {
      try {
        await this.signRegisterForm();
        this.report = true;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
