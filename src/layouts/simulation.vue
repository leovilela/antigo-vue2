<template>
<Layout>
  <MenuEsquerdo slot="sidebar" />
  <HeaderMobile slot="headerMobile" />
  <Header slot="header" />
  <ConteudoInterno slot="main" >
    <nuxt/>
  </ConteudoInterno>
  <FooterInterno slot="desktop-footer" />
</Layout>
</template>

<script>
import Layout from "~/layouts/internal.vue";
import MenuEsquerdo from "~/components/InternalMenuEsquerdo.vue";
import Header from "~/components/header-interna-desktop.vue";
import HeaderMobile from "~/components/header-interna-mobile.vue";
import ConteudoInterno from "~/templates/internalContent.vue";
import FooterInterno from "~/components/InternalFooter.vue";

export default {
  components: {
    Layout,
    MenuEsquerdo,
    Header,
    HeaderMobile,
    ConteudoInterno,
    FooterInterno,
  },
};
</script>

<style>

</style>
