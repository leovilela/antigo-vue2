<template>
  <section class="emprestimos">
    <!-- <Base-UsuarioContainer class="emprestimos__info" /> -->
    <component-panel :key="panelKey" class="emprestimos__info" slot="panel"></component-panel>

    <main class="emprestimos__container emprestimos__steps">
      <Base-NavTabPage :components="routesPage" />
    </main>
  </section>
</template>

<script>
import panelPainelCliente from "~/components/panelPainelCliente.vue";
import { createNamespacedHelpers, mapMutations } from "vuex";
import isEmpty from "lodash/isEmpty";
import { ROLES } from '../../enums/Roles';
import checkAccess from '../../middleware/routeGuard';

const {
  mapActions: loanActions,
  mapState: loanState
} = createNamespacedHelpers("loan");
const { mapActions: loanSimulationActions } = createNamespacedHelpers(
  "loan/simulation"
);

const { mapState: affiliateState } = createNamespacedHelpers("affiliate");
const LEGAL_PERSON_ID = 2;


export default {
  layout: "shell",
  components: {
    "component-panel": panelPainelCliente
  },
  asyncData({ redirect, store }) {
    if (!checkAccess(store, ROLES.LOANS)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
      panelKey: 0
    }
  },
  computed: {
    ...loanState(["status", "registerFormId", "orderFlow"]),
    ...affiliateState(["affiliate"]),
    routesPage() {
      return [
        {
          name: "/emprestimos/meus-limites",
          alias: "Meu Limites",
          show: !this.status.signed && !this.status.completed
        },
        {
          name: "/emprestimos/ficha-cadastral",
          alias: "Ficha Cadastral",
          show: !this.status.signed && !this.status.completed
        },
        {
          name: "/emprestimos/simulacao",
          alias: "Simulação",
          show: this.status.signed
        }
      ];
    }
  },
  async fetch({ store, redirect }) {
    const { status } = store.state.loan;
    const { affiliate } = store.state.affiliate;
    const { dispatch } = store;
    await dispatch("loan/simulation/getServices");

    // await dispatch("loan/getRegistrationFormData");

    // console.log("simulation");

    if (affiliate.affiliationTypeID === LEGAL_PERSON_ID) {
      await dispatch("loan/getBlockWithName", "registerDataPj");
    } else {
      await dispatch("loan/getBlockWithName", "registerDataPf");
    }

    await dispatch("loan/getRegisterStatus");

    return {};
  },
  mounted() {
    if (this.status.signed || this.status.signedCcbCet) {
      this.$router.push("/emprestimos/simulacao");
      return
    }

    if (this.status.completed) {
      this.$router.push("/emprestimos/ficha-cadastral");
      return
    }
    this.$router.push("/emprestimos/meus-limites");
    this.panelKey +=1
    this.enableScd();
  },
  beforeDestroy() {
    this.cleanState();
  },
  methods: {
    ...loanActions([
      "getRegisterStatus",
      "setRegisterStep",
      "getBlockWithName",
      "cleanState"
    ]),
    ...loanSimulationActions(["getServices"]),
    ...mapMutations(['startLoading', 'finishLoading', 'enableScd'])
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
