<template>
  <section class="painel-do-cliente">
    <!-- <Base-UsuarioContainer class="painel-do-cliente__info" />  -->

    <component-panel class="painel-do-cliente__info" slot="panel"></component-panel>

    <div class="painel-do-cliente__container" v-if="canViewSimulationPanel">
      <Base-Banner @onmore="onmore" v-if="canViewLoan" />
      <Base-SimulationPanel/>
    </div>
    <Base-NewsPanel class="painel-do-cliente__news" />
  </section>
</template>

<script>
import panelPainelCliente from "~/components/panelPainelCliente.vue";
import { mapState } from 'vuex';
import { ROLES } from '../../enums/Roles';

export default {
  layout: "shell",
  components: {
    "component-panel": panelPainelCliente,
  },
  computed: {
    ...mapState({
      userPermissions: state => state.client.userPermissions,
      roles: state => state.roles
    }),
    canViewLoan() {
      const ROLE_KGC = 'ec_kgc'
      const ROLE_OWNER = 'ec_owner'
      const ROLE_LF_ADMIN = 'lf_admin'
      return (this.roles.includes(ROLE_KGC) && this.roles.includes(ROLE_OWNER)) || this.roles.includes(ROLE_LF_ADMIN);
    },
    canViewSimulationPanel() {
      const ROLE_ADMIN = "lf_admin";
      const ROLE_OWNER = "ec_owner";
      const rolesPanel = [ROLES.NEW_TRANSACTION, ROLES.LOANS, ROLES.FINANCING];

      if (this.roles.includes(ROLE_ADMIN) || this.roles.includes(ROLE_OWNER)) {
        return this.$store.state.podeTransacionar
      } else {
        return this.userPermissions.some(code => {
          return rolesPanel.some(role => role === code);
        });
      }
    },
  },
  methods: {
    onmore(){
      this.$router.push("/emprestimos/meus-limites");
    },
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
.base-commercial-group p{
  border: solid 1px red;
}
</style>
