<template>
  <transition name="page">
    <div id="extrato">
      <component-layout>
        <component-menu-esquerdo slot="sidebar"></component-menu-esquerdo>
        <component-header-interno-mobile slot="headerMobile"></component-header-interno-mobile>
        <component-header-interno slot="header"></component-header-interno>
        <component-conteudo-interno slot="main" :contentTitle="pageTitle" :activeSection ="secaoAtiva">
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

import panelExtrato from "~/components/panelExtrato.vue";
import contentExtrato from "~/components/contentExtrato.vue";

export default {
  transition: "page",
  props: ["step", "secao"],
  components: {
    "component-layout": layout,
    "component-menu-esquerdo": menuEsquerdo,
    "component-header-interno": header,
    "component-header-interno-mobile": headerMobile,
    "component-conteudo-interno": conteudoInterno,
    "component-panel": panelExtrato,
    "component-content": contentExtrato,
    "component-footer": footerInterno,
    "component-modal": modal,
  },
  data() {
    return {
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Saldo e Extrato",
    };
  },
};
</script>
