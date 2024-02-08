<template>
  <transition name="page">
    <div id="error-page" :class="{'form-invalid': !isAuthenticated}">
      <section id="desktop" v-if="$mq == 'laptop' || $mq == 'desktop' || $mq == 'bigScreen'">
        <component-layout>
          <component-menu-esquerdo slot="sidebar" v-if="isAuthenticated && !isIndexURL"></component-menu-esquerdo>
          <component-header-interno slot="header" v-if="isAuthenticated && !isIndexURL"></component-header-interno>
          <component-conteudo-interno slot="main" v-if="passo === 'principal' || passo === '' || passo === undefined" :contentTitle="pageTitle" :activeSection ="secaoAtiva">
            <content-error-page slot="content"></content-error-page>
          </component-conteudo-interno>
          <component-footer slot="desktop-footer"></component-footer>
        </component-layout>
      </section>
      <section id="mobile" v-if="$mq == 'mobile' || $mq == 'tablet'">
        <menu id="layout-sidebar-mobile" :class="{ menuActive : menu }" v-if="isAuthenticated && !isIndexURL">
          <component-menu-esquerdo></component-menu-esquerdo>
        </menu>
        <div id="layout-header-mobile">
          <component-header-interno-mobile v-if="isAuthenticated && !isIndexURL"></component-header-interno-mobile>
        </div>
        <content-error-page></content-error-page>
      </section>
      <component-modal></component-modal>
    </div>
  </transition>
</template>

<script>
import contentErrorPage from "~/components/errorPage/contentErrorPage.vue";
import layout from "~/layouts/internal_nopanel.vue";
import menuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import header from "~/components/header-interna-desktop.vue";
import headerMobile from "~/components/header-interna-mobile.vue";
import conteudoInterno from "~/templates/internalContent_nopanel.vue";
import footerInterno from "~/components/InternalFooter.vue";
import modal from "~/components/modal.vue";


export default {
  transitions: "page",
  components: {
    "component-layout": layout,
    "component-menu-esquerdo": menuEsquerdo,
    "component-header-interno": header,
    "component-header-interno-mobile": headerMobile,
    "component-conteudo-interno": conteudoInterno,
    "component-footer": footerInterno,
    contentErrorPage,
    "component-modal": modal,

  },
  data() {
    return {
      passo: $nuxt.$route.params.step,
      secaoAtiva: $nuxt.$route.params.secao,
      pageTitle: "Página não encontrada",
      menu: false,
    };
  },
  created() {
    this.$nuxt.$on("activeMenu", (data) => {
      this.menu = data;
    });
  },
  computed: {
    isAuthenticated() {
      return $nuxt.$store.state.autenticado;
    },
    isIndexURL() {
      return window.location.pathname && window.location.pathname.length <= 1;
    },
  },
};
</script>
<style lang="less">
@import "~assets/vars.less";
@import "~assets/variables.less";

#error-page {
  #mobile {
    #layout-header-mobile {
      position: relative;
      top: 0;
      width: 100vw;
      min-height: 49px;
      overflow: hidden;
      background-color: green;
      z-index: 10;
    }

    #layout-sidebar-mobile {
      width: 100vw;
      left: -100vw;
      position: fixed;
      -webkit-transition: all 0.25s linear;
      -moz-transition: all 0.25s linear;
      -ms-transition: all 0.25s linear;
      transition: all 0.25s linear;
      z-index: 11;
      &.menuActive {
        -webkit-transform: translateX(100vw);
        -moz-transform: translateX(100vw);
        -ms-transform: translateX(100vw);
        transform: translateX(100vw);
      }

      nav {
        background: @color4;
        top: -15px;
        width: 100vw;
      }

      .buttonClose {
        top: -15px;
      }
    }
  }

  &.no-user {
    .colunaMenu, #layout-header {
      display: none;
    }

    #layout-main {
      width: 100vw !important;
      padding-top: 25px !important;

      &.menuActive {
        width: 100vw !important;
      }
    }
  }
}
</style>
