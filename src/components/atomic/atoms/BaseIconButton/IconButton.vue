<template>
  <button
    :class="setClass"
    v-on="listeners"
    v-bind="$attrs">
      {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  computed: {
    setClass() {
      return {
        "icon-button": true,
        "icon-button__print": this.icon === "print",
        "icon-button__simulation": this.icon === "simulation",
        "icon-button__email": this.icon === "email",
        "icon-button__financial": this.icon === "financial",
      };
    },
    listeners() {
      return {
        ...this.$listeners,
      };
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
