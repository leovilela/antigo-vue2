<template>
  <article class="banner">
    <p class="banner__paragraph">
      <strong class="banner__strong">{{$t('banners.loan.title')}}</strong>
      <span class="banner__info">{{$t('banners.loan.text')}}</span>
    </p>
    <Base-Button class="banner__button" @click="onmore">{{$t('banners.loan.cta')}}</Base-Button>
  </article>
</template>

<script>
export default {
  methods: {
    onmore() {
      return this.$emit("onmore");
    },
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>