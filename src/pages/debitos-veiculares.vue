<template>
  <div class="page-interno page-pagamentos">
    <layout>
      <menu-esquerdo slot="sidebar"></menu-esquerdo>
      <header-desktop slot="header"></header-desktop>
      <header-mobile slot="headerMobile"></header-mobile>
      <conteudo-interno slot="main">
        <div id="conteudo-pagamentos" class="page-pagamentos" slot="content">
          <nuxt-child></nuxt-child>
        </div>
      </conteudo-interno>
      <footer-interno :isSCD="false" slot="desktop-footer"></footer-interno>
      <modal slot="modal"></modal>
    </layout>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import layout from "~/layouts/internal_nopanel.vue";
import menuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import headerDesktop from "~/components/header-interna-desktop.vue";
import headerMobile from "~/components/header-interna-mobile.vue";
import footerInterno from "~/components/InternalFooter.vue";
import conteudoInterno from "~/templates/listoInternalContent.vue";
import modal from "~/components/modal.vue";
import { ROLES } from '../enums/Roles';
import checkAccess from '../middleware/routeGuard';

// const jwt = require("jsonwebtoken");

export default {
  components: {
    layout,
    menuEsquerdo,
    headerDesktop,
    headerMobile,
    footerInterno,
    conteudoInterno,
    modal,
  },
  asyncData({redirect, store}) {
   if (!checkAccess(store, ROLES.VEHICLE_DEBITS)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      clearTransaction: "transaction/clearTransaction",
    }),
  },
  mounted() {
    this.clearTransaction();
  },
  /* asyncData(context) {
    console.log("[pagamentos] Context: ", context);

    if (context.route.fullPath == "/debitos-veiculares") {
      context.redirect("/debitos-veiculares/auto/simulacao");
    }
  }, */
};
</script>

<style>
</style>
