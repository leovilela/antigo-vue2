<template>
  <div id="base-iframe"></div>
</template>

<script>
export default { 
  props: {
    urlIframe: {
      type: String,
      default: ""
    },
    refIframe: {
      type: String,
      default: ""
    },
  }, 
  mounted() {    
    const Click = $nuxt.$options.IframeVue;
    const iframe = new Click(this.urlIframe, this.refIframe);
    iframe.mount("base-iframe");
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
