<template>
  <ul class="financiamentos-tabs">
    <nuxt-link class="financiamentos-tabs-link" to="/financiamentos/imovel/simulacao">Simulação</nuxt-link>
    <nuxt-link class="financiamentos-tabs-link" to="/financiamentos/imovel/ficha-cadastral">Ficha Cadastral</nuxt-link>
    <nuxt-link class="financiamentos-tabs-link" to="/financiamentos/imovel/alienacao">Alienação</nuxt-link>
    <nuxt-child></nuxt-child>
  </ul>
</template>

<style lang="less">
@import "~assets/vars.less";

.page-financiamentos {
  #conteudo-financiamentos {
    .financiamentos-tabs {
      list-style: none;
      padding: 0;

      &-link {
        color: @color1;
        text-decoration: none;
        font-size: @ftSizeLarge;
        padding: 0 10px;
        padding-bottom: 5px;

        &.nuxt-link-exact-active {
          border-bottom: 1px solid @color1;
        }
      }
    }
  }
}
</style>
