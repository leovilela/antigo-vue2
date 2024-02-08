<template>
  <button v-on="listeners" v-bind="$attrs" :class="buttonClass">
    <slot />
  </button>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    outlined: {
      type: Boolean,
      default: false,
    },
    report: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
      };
    },
    buttonClass() {
      if (this.outlined) {
        return "outlined";
      }
      if (this.report) {
        return "report-button";
      }
      return "button";
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
