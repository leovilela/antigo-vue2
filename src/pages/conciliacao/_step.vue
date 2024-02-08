<template>
  <transition name="page">
    <div id="conciliacao">
      <component-layout>
        <component-menu-esquerdo slot="sidebar"></component-menu-esquerdo>
        <component-header-interno-mobile slot="headerMobile"></component-header-interno-mobile>
        <component-header-interno slot="header"></component-header-interno>
        <component-conteudo-interno slot="main" v-if="passo === 'principal' || passo === '' || passo === undefined" :contentTitle="pageTitle" :activeSection ="secaoAtiva">
          <component-panel slot="panel"></component-panel>
          <component-content slot="content"></component-content>
        </component-conteudo-interno>
        <component-footer slot="desktop-footer"></component-footer>
        <component-modal slot="modal"></component-modal>
      </component-layout>
    </div>
  </transition>
</template>


<script>
import layout from "~/layouts/internal.vue";
import menuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import header from "~/components/header-interna-desktop.vue";
import headerMobile from "~/components/header-interna-mobile.vue";
import conteudoInterno from "~/templates/internalContent.vue";
import footerInterno from "~/components/InternalFooter.vue";
import modal from "~/components/modal.vue";

import panelConciliacao from "~/components/panelConciliacao.vue";
import contentConciliacao from "~/components/contentConciliacao.vue";
import { ROLES } from '../../enums/Roles';
import checkAccess from '../../middleware/routeGuard';

export default {
  transition: "page",
  props: ["step", "secao"],
  components: {
    "component-layout": layout,
    "component-menu-esquerdo": menuEsquerdo,
    "component-header-interno": header,
    "component-header-interno-mobile": headerMobile,
    "component-conteudo-interno": conteudoInterno,
    "component-panel": panelConciliacao,
    "component-content": contentConciliacao,
    "component-footer": footerInterno,
    "component-modal": modal,

  },
  asyncData({ redirect, store }) {
    if (!checkAccess(store, ROLES.CONCILIATION)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
      passo: $nuxt.$route.params.step,
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Conciliação",
    };
  },
};
</script>
