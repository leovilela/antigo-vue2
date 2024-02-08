<template>
  <section class="base-transaction-simulation">
    <Base-Tab expanded animated class="base-transaction-simulation__tab">
      <Base-TabItem
        label="Nova transação"
        class="base-transaction-simulation__tab-item "
        v-if="enableTransaction"
      >
        <Base-NewTransactionSimulation />
      </Base-TabItem>
      <Base-TabItem
        label="Novo financiamento"
        class="base-transaction-simulation__tab-item"
        v-if="enableFinance"
      >
        <Base-SimulationFinance />
      </Base-TabItem>
    </Base-Tab>
  </section>
</template>

<script>
import { mapState, createNamespacedHelpers } from "vuex";
import { ROLES } from '../../../../enums/Roles';

const {
  mapActions: transactionActions,
  mapState: transactionState
} = createNamespacedHelpers("transaction");

export default {
  computed:{
    ...mapState({
        userPermissions: state => state.client.userPermissions,
        roles: state => state.roles,
      },
    ),
    ...transactionState([
      "typesOfservices",
    ]),
    enableTransaction() {
      const ROLE_ADMIN = "lf_admin";
      const ROLE_OWNER = "ec_owner";

      if (this.roles.includes(ROLE_ADMIN) || this.roles.includes(ROLE_OWNER)) {
        return this.typesOfservices.length > 0
      } else {
        return this.userPermissions.some(code => code === ROLES.NEW_TRANSACTION)
      }
    },
    enableFinance() {
      const ROLE_TRADER = "scd_trader";
      const ROLE_ADMIN = "lf_admin";
      const ROLE_OWNER = "ec_owner";

      if (this.roles.includes(ROLE_ADMIN) || this.roles.includes(ROLE_OWNER)) {
        return this.roles.includes(ROLE_TRADER);
      } else {
        return this.userPermissions.some(code => code === ROLES.FINANCING);
      }
    },
    async mounted() {
      const { data: alerts } = await this.$axios.get(`${window.location.origin}/alerts/alertas_cliente.json`);
      this.alerts = alerts;
    },
  },

};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
