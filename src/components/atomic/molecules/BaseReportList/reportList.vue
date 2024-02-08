<template>
  <ul class="base-report-list">
    <li
      v-for="(data, index) in tratament"
      :key="index" 
      class="base-report-list__item">
        <Base-Report :title="data[0].toString()" :content="data[1].toString()" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true,
    }
  },
  computed: {
    tratament() {
      return Object.entries(this.list);
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>