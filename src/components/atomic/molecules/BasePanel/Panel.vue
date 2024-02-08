<template>
  <div class="panel panel-default">
  <div class="panel-heading" v-if="hasHeader">
    <slot name="header"/>
  </div>
  <div class="panel-body">
    <slot />
  </div>
    <div class="panel-footer" v-if="hasFooter">
      <slot name="footer"/>
    </div>
</div>
</template>
<script>
export default {

  computed: {
    hasHeader() {
      return this.$slots.header;
    },
    hasFooter() {
      return this.$slots.footer;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
   .panel {
    &-default {
      .panel-heading {
        background-color: @color1;
        color: @color2;
      }
    }
  }
</style>
