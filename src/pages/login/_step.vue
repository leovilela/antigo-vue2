<template>
  <transition name="page">
    <div id="login-page">

      <component-layout>
        <component-header slot="header" v-if="($mq === 'mobile' || $mq === 'tablet') && step === 'acesso'"></component-header>

        <component-login-bg slot="background"></component-login-bg>
        <component-login-text slot="left-content"></component-login-text>

        <component-mobile-login slot="right-content" v-if="$mq === 'mobile' && step !== 'acesso'">
          <component-footer slot="mobile-home-footer"></component-footer>
        </component-mobile-login>

        <component-login slot="right-content" v-if="$mq !== 'mobile'  || step === 'acesso'"></component-login>

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
