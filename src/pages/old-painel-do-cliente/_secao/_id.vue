<template>
  <transition name="page">
    <div id="painelCliente">
      <component-layout>
        <component-menu-esquerdo slot="sidebar"></component-menu-esquerdo>
        <component-header-interno-mobile slot="headerMobile"></component-header-interno-mobile>
        <component-header-interno slot="header"></component-header-interno>
        <component-conteudo-interno slot="main" :contentTitle="pageTitle" :ppActiveSectionLocal ="secaoAtiva">
          <component-panel slot="panel"></component-panel>
          <component-content slot="content"></component-content>
        </component-conteudo-interno>
        <component-footer slot="desktop-footer"></component-footer>
         <component-modal slot="modal"></component-modal>

      </component-layout>
      <component-print></component-print>
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
import print from "~/components/print.vue";

import panelPainelCliente from "~/components/panelPainelCliente.vue";
import contentPainelCliente from "~/components/contentPainelCliente.vue";

export default {
  transition: "page",
  props: ["secao"],
  components: {
    "component-layout": layout,
    "component-menu-esquerdo": menuEsquerdo,
    "component-header-interno": header,
    "component-header-interno-mobile": headerMobile,
    "component-conteudo-interno": conteudoInterno,
    "component-panel": panelPainelCliente,
    "component-content": contentPainelCliente,
    "component-footer": footerInterno,
    "component-modal": modal,
    "component-print": print,
  },
  data() {
    return {
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Painel do Cliente",
    };
  },
};
</script>
