<template>
  <div id="painelCliente">
    <component-panel slot="panel"></component-panel>
    <component-content slot="content"></component-content>
    <component-print></component-print>
  </div>
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
  props: ["step", "secao"],
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
      passo: $nuxt.$route.params.step,
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Painel do Cliente",
    };
  },
};
</script>
