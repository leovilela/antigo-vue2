<template>
  <transition name="page">
    <div id="novo-cadastro">
      <component-layout>
        <component-header slot="header" v-if="$mq === 'mobile'"></component-header>

        <component-login-bg slot="background"></component-login-bg>
        <component-login-text slot="left-content"></component-login-text>
        <component-login slot="right-content"></component-login>
        <component-footer slot="footer"></component-footer>
      </component-layout>
    </div>
  </transition>
</template>



<script>
import layout from "~/layouts/login.vue";
import loginBackgroundImage from "~/components/loginBackgroundImage.vue";
import loginBackgroundText from "~/components/loginBackgroundText.vue";
import formLogin from "~/components/formlogin.vue";
import mobileLogin from "~/components/mobileLoginHome.vue";
import header from "~/components/header-login.vue";
import footer from "~/components/loginFooter.vue";

export default {
  transition: "page",
  props: ["step"],
  components: {
    "component-layout": layout,
    "component-login-bg": loginBackgroundImage,
    "component-login": formLogin,
    "component-login-text": loginBackgroundText,
    "component-footer": footer,
    "component-mobile-login": mobileLogin,
    "component-header": header,
  },
  asyncData({redirect, store}) {
    if (store.state.auth.accessToken) {
      redirect('/painel-do-cliente')
    }
  }
};
</script>
