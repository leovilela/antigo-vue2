<template>
  <div :id="idIframe">
    <Base-Iframe :refIframe="refIframe" :urlIframe="urlIframe" />
  </div>
</template>


<script>
export default {
  data() {
    return {
      urlIframe: process.env.ANGULAR_URL,
      idIframe: "formEditarUsuarios",
      refIframe: "gestaoUsuario"
    };
  },
  mounted() {
    window.onmessage = event => {
      if (event.origin === this.removeLastDashUrl(this.urlIframe)) {
        if (event.data === "lfRefreshToken") {
          this.$store.dispatch("renewToken")
            .then(() => this.sendIFramMessage(event))
        } else {
          this.sendIFramMessage(event);
        }
      }
    };
  },
  created() {
    this.$nuxt.$on("createUser", data => {
      this.content.users.push(data);
    });
  },
  methods: {
    sendIFramMessage(event) {
      const wn = document.getElementById(this.refIframe).contentWindow;
      wn.postMessage(
        {
          type: event.data,
          accessToken: this.$store.state.auth.accessToken,
          affiliateId: this.$store.state.affiliate.affiliate.id,
          canDoTransaction: this.$store.state.podeTransacionar,
          services: this.$store.state.transaction.typesOfservices
        },
        process.env.ANGULAR_URL
      );
    },
    removeLastDashUrl(url) {
      if (url.substr(url.length - 1, 1) === '/') {
        return url.substr(0, url.length - 1);
      }
      return url; 
    },
  }
};
</script>

<style lang='less'>
</style>

