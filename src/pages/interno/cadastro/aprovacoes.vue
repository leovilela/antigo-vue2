<template>
  <div id="page-aprovacoes" class="page-interno page-cadastro">
    <layout v-if="controls.access">
      <menu-esquerdo slot="sidebar"></menu-esquerdo>
      <header-desktop slot="header"></header-desktop>
      <header-mobile slot="headerMobile"></header-mobile>
      <conteudo-interno slot="main">
        <conteudo-aprovacoes slot="content"></conteudo-aprovacoes>
      </conteudo-interno>
      <footer-interno slot="desktop-footer"></footer-interno>
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
import conteudoAprovacoes from "~/components/interno/cadastro/aprovacoes/content.vue";
import checkAccess from '../../../middleware/routeGuard';
import { ROLES } from '../../../enums/Roles';


export default {
  components: {
    layout,
    menuEsquerdo,
    headerDesktop,
    headerMobile,
    footerInterno,
    conteudoInterno,
    conteudoAprovacoes,
  },
  asyncData({ redirect, store }) {
    if (!checkAccess(store, ROLES.REQUESTS)) {
      redirect("/painel-do-cliente");
    }
  },
  data() {
    return {
      controls: {
        access: false,
      },
    };
  },
  mounted() {
    const self = this;
    setTimeout(() => {
      if (self.$nuxt.$store.state.roles.indexOf("lf_cadastro") >= 0 || self.$nuxt.$store.state.roles.indexOf("lf_admin") >= 0) {
        self.controls.access = true;
      } else {
        self.controls.access = true;
      }

      if (!self.controls.access) {
        self.$router.push("/login", () => {});
      }
    }, 10);
  },
};
</script>

<style lang="less">

</style>
