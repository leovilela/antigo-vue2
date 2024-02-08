<template>
  <div id="container-formalization" style="height: 100vh"></div>
</template>

<script>
export default {
  data() {
    return {
      signatureKey: "",
      endpoint: "",
      signalKey: "",
    };
  },
  mounted() {
    const Click = this.$options.ClickSign;
    this.signatureKey = this.$route.params.registerKey;
    this.endpoint = `https://${this.$route.query.endpoint}`;
    const widget = new Click(this.signatureKey);
    // widget.endpoint = this.endpoint;
    widget.origin = window.location.origin;
    widget.mount("container-formalization");
    widget.on("loaded", (ev) => { console.log("loaded!"); });
    widget.on("signed", (ev) => {
      widget.unmount();
    });
  },
};
</script>
