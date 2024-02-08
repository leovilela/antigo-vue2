<template>
  <figure class="base-profile-picture">
    <img class="base-profile-picture__image" :src="source" :alt="alt" />
    <figcaption class="base-profile-picture__caption">{{ alt }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
