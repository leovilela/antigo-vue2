<template>
  <div id="base-clicksign"></div>
</template>

<script>
export default {
  props: {
    signatureKey: {
      type: String,
      default: ""
    },
  },
  mounted() {
    const Click = $nuxt.$options.ClickSign;
    const widget = new Click(this.signatureKey);
   // Define o endpoint https://sandbox.clicksign.com ou https://app.clicksign.com
    widget.endpoint = process.env.CLICKSIGN;
    // Define a URL de origem (parametro necessário para utilizar através de WebView)
    widget.origin = window.location.origin;
    widget.mount("base-clicksign");
    widget.on("loaded", (ev) => { console.log("loaded!"); });
    widget.on("signed", (ev) => {
      this.$emit('unmount')
      // widget.unmount();
    });
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
