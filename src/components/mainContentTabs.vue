<template>
    <ul id="mainContentTabs">
        <li v-for="tab in tabs" :key="tab.key">{{ tab.tabName }}</li>
    </ul>
</template>


<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#mainContentTabs {
  width: 100%;
  padding: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid @color25;
  box-sizing: border-box;

  li {
    display: inline-block;
    margin: 0 10px;
    font-size: @ftSizeLarge;
    font-family: @mainFontRegular;
    color: @color10;

    &.active {
      color: @color12;
      position: relative;

      &:after {
        content: "";
        width: 100%;
        position: absolute;
        bottom: -10px;
        left: 0;
        border: 1px solid @color12;
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    tabs: {
      Type: Array,
      Required: true,
    },
  },
};
</script>
