<template>
  <a
    class="base-link"
    :href="url"
    :title="label"
    :target="setTarget">
    {{ label }}
  </a>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    target: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    setTarget() {
      return this.target && "_blank";
    },
  },
};
</script>

<style lang="less" scoped>
  @import "style.less";
</style>
