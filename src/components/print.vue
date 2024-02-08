<template>
  <div id="moduloImpressao" v-if="printElement">
      <component-print-simulacao :printObject="printObject" v-if="printType == 'simulacao'"></component-print-simulacao>
      <component-print-contrato :printObject="printObject" v-if="printType == 'contrato'"></component-print-contrato>
  </div>

</template>


<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";
</style>

<script>
import Printd from "printd";
import printSimulacao from "~/templates/print-simulacao.vue";
import printContrato from "~/templates/print-contrato.vue";

export default {
  data() {
    return {
      printElement: false,
      printObject: {},
      printType: null,
    };
  },
  components: {
    "component-print-simulacao": printSimulacao,
    "component-print-contrato": printContrato,
  },

  mounted() {
    this.$nuxt.$on("printComponent", (data) => {
      // console.log("print component");
      this.printElement = data.printElement;
      this.printObject = data.printObject;
      this.printType = data.printType;
    });
    this.$nuxt.$on("destroyElementPrint", (data) => {
      this.printElement = false;
    });
  },

};
</script>
