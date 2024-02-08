<template>
  <p class="base-report">
    <strong :class="`base-report__title base-report__title--${tratament(title)}`">{{ title }}</strong>
    <span :class="setClass">{{ content }}</span>
  </p>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  methods: {
    tratament(text) {
      return text.toLowerCase().replace(/\s/g, "-");
    }
  },
  computed: {
    setClass() {
      return {
        "base-report__content": true,
        "base-report__content--array": this.isArray,
      }
    },
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
