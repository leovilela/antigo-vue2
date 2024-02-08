<template>
  <button
    class="base-link-button"
    @click="$emit('click', label)">
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
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
