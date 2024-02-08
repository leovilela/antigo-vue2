<template>
  <div class="page-interno page-emprestimos">
    <Base-Loading />
    <layout>
      <menu-esquerdo slot="sidebar"></menu-esquerdo>
      <header-desktop slot="header"></header-desktop>
      <header-mobile slot="headerMobile"></header-mobile>
      <conteudo-interno slot="main">
        <div id="conteudo-emprestimos" class="page-emprestimos" slot="content">
          <nuxt-child></nuxt-child>
        </div>
      </conteudo-interno>
      <footer-interno :isSCD="true" slot="desktop-footer"></footer-interno>
      <modal slot="modal"></modal>
    </layout>
  </div>
</template>

<script>
import layout from "~/layouts/internal_nopanel.vue";
import menuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import headerDesktop from "~/components/header-interna-desktop.vue";
import headerMobile from "~/components/header-interna-mobile.vue";
import footerInterno from "~/components/InternalFooter.vue";
import conteudoInterno from "~/templates/listoInternalContent.vue";
import modal from "~/components/modal.vue";
import checkAccess from '../middleware/routeGuard';
import { ROLES } from '../enums/Roles';

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
   if (!checkAccess(store, ROLES.LOANS)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
    };
  },
  /* asyncData(context) {
    console.log("[emprestimos] Context: ", context);

    if (context.route.fullPath == "/emprestimos") {
      context.redirect("/emprestimos/auto/simulacao");
    }
  }, */
};
</script>

<style>

</style>
