<template>
  <transition name="page">
    <div id="dadosCadastrais">
      <component-layout>
        <component-menu-esquerdo slot="sidebar"></component-menu-esquerdo>
        <component-header-interno-mobile slot="headerMobile"></component-header-interno-mobile>
        <component-header-interno slot="header"></component-header-interno>
        <component-conteudo-interno slot="main" v-if="passo === 'principal' || passo === '' || passo === undefined" :activeSection="secaoAtiva">
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

import panelDadosCadastrais from "~/components/panelDadosCadastrais.vue";
import contentDadosCadastrais from "~/components/contentDadosCadastrais.vue";
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
    "component-panel": panelDadosCadastrais,
    "component-content": contentDadosCadastrais,
    "component-footer": footerInterno,
    "component-modal": modal,
  },
  data() {
    return {
      passo: $nuxt.$route.params.step,
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Meus dados cadastrais",
    };
  },
  mounted() { 
    const USER_MANAGEMENT_TAB = "Gestão de usuários";
    const tabs = ["Alterar senha", "Contrato"];

    if(!checkAccess(this.$nuxt.$store, ROLES.USER_MANAGEMENT) && (USER_MANAGEMENT_TAB === this.$nuxt.$store.state.tabDadosCadastrais)){
      this.$nuxt.$store.commit("updateTabDadosCadastrais", "Minha conta Listo");
      this.$nuxt.$emit("trocaTab", this.$nuxt.$store.state.tabDadosCadastrais);
    }
    
    if (!checkAccess(this.$nuxt.$store, ROLES.CADASTRAL_DATA) && !tabs.includes(this.$nuxt.$store.state.tabDadosCadastrais)) {
      this.$nuxt.$store.commit("updateTabDadosCadastrais", "Alterar senha");
      this.$nuxt.$emit("trocaTab", this.$nuxt.$store.state.tabDadosCadastrais);
    }
  },
};
</script>
