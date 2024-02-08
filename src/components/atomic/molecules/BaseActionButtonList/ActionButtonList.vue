<template>
  <section class="action-button-list">
    <Base-IconButton :disabled="disabled" label="Enviar por e-mail" icon="email" @click="onemail" />
    <Base-IconButton :disabled="disabled" label="Imprimir" icon="print" @click="onprint" />
    <Base-IconButton
      :disabled="disabled" 
      :label="simulationButton.label" 
      icon="financial" 
      :type="simulationButton.type" 
      @click="onSimulation" />
  </section>
</template>

<script>
export default {
  props: {
    simulationButton: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onprint() {
      return this.$emit("onImprimir");
    },
    onemail() {
      return this.$emit("onEmail");
    },
    onSimulation() {
      return this.$emit("onSimulation");
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
