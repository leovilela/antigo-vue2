<template>
  <div id="content-error-page">
    <h2>{{text.title}}</h2>

    <p v-html="text.errorText"></p>

    <contato></contato>


  </div>
</template>

<style lang="less">
#content-error-page{
  text-align: center;
}
</style>

<script>
import contato from "~/components/leftPanelContato.vue";

export default {
  data() {
    return {
      text: {
        title: "Ops! Página não encontrada!",
        errorText: "A página que você tentou acessar não existe ou não foi encontrada.<br> Se você acredita que isso está errado, entre em contato com nosso suporte.",
      },
    };
  },
  components: {
    contato,
  },
};
</script>
