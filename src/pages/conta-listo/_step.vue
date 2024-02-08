<template>
  <transition name="page">
    <div id="contaListo">
      <component-layout v-if="podeTransacionar">
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

import panelContaListo from "~/components/panelContaListo.vue";
import contentContaListo from "~/components/contentContaListo.vue";

export default {
  transition: "page",
  props: ["step", "secao"],
  components: {
    "component-layout": layout,
    "component-menu-esquerdo": menuEsquerdo,
    "component-header-interno": header,
    "component-header-interno-mobile": headerMobile,
    "component-conteudo-interno": conteudoInterno,
    "component-panel": panelContaListo,
    "component-content": contentContaListo,
    "component-footer": footerInterno,
    "component-modal": modal,
  },
  data() {
    return {
      passo: $nuxt.$route.params.step,
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Conta Listo",
      // podeTransacionar: false,
    };
  },
  computed: {
    podeTransacionar() {
      return $nuxt.$store.state.podeTransacionar;
    },
  },
  // Remover bloco abaixo quando retornar conta listo para producao
  asyncData({ redirect }) {
    redirect("/painel-do-cliente");
  },
  // created() {
  //   this.$axios
  //     .get(`${process.env.API_AFFILIATE}/affiliates`)
  //     .then((response) => {
  //       if (response.data.departmentID > 0 && response.data.affiliateStatusID > 0) {
  //         $nuxt.$store.commit("toggleTransactions", true);
  //         this.podeTransacionar = true;
  //       } else {
  //         $nuxt.$store.commit("toggleTransactions", false);
  //         setTimeout(() => {
  //           this.$router.push("/login", () => {});
  //         }, 100);
  //       }
  //     });
  // },
};
</script>
