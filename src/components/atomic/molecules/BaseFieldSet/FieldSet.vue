<template>
  <fieldset class="base-fieldset">
    <legend class="base-fieldset__legend">
      <span class="base-fieldset__title">{{ title }}</span>
    </legend>
    <main  v-if="hasFieldSetSlot" class="base-fieldset__content" :style="`display:${contentFlex}`">
      <slot />
    </main>
    <article v-for="(label, index) in labels" :key="index" v-else>
      <b>{{ label }}</b>
      <span>
        {{ values[index] }}
      </span>
    </article>
  </fieldset>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    titleMaxWidth:{
        type: String,
        default: '24%'
    },
    contentFlex:{
        type: String,
        default: 'flex'
    },
    contentHeight: {
      type: String,
      default: 'auto'
    },
    labels: {
      type: Array,
      default: () => []
    },
    values: {
      type: Array,
      default: () => []
    },
  },
  computed: {
    hasFieldSetSlot() {
      return this.labels.length === 0;
    }
  }
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
