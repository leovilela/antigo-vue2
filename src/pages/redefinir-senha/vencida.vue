<template>
  <transition name="page">
    <div id="nova-senha" class="page-redefinir-senha">
      <component-layout>
        <component-header slot="header" v-if="$mq === 'mobile' || $mq === 'tablet'"></component-header>
        <component-login-bg slot="background"></component-login-bg>
        <component-login-text slot="left-content"></component-login-text>
        <form-nova-senha slot="right-content"></form-nova-senha>
        <component-footer slot="footer"></component-footer>
      </component-layout>
    </div>
  </transition>
</template>

<script>
import layout from "~/layouts/login.vue";
import loginBackgroundImage from "~/components/loginBackgroundImage.vue";
import loginBackgroundText from "~/components/loginBackgroundText.vue";
import footer from "~/components/loginFooter.vue";
import header from "~/components/header-login.vue";

import formNovaSenha from "~/components/redefinirSenha/vencida.vue";

export default {
  transition: "page",
  components: {
    "component-layout": layout,
    "component-login-bg": loginBackgroundImage,
    "component-login-text": loginBackgroundText,
    "component-footer": footer,
    "component-header": header,
    formNovaSenha,
  }, 
 
};
</script>
