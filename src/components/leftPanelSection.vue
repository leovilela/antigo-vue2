<template>
  <div id="leftPanelSection">
    <h3 class="panelSectionTitle" :class="{centeredTitle: centeredTitle == true? true : false}">{{ panelSectionTitle }}</h3>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  props: ["panelSectionTitle", "centeredTitle"],
};
</script>


<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #leftPanelSection {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid @color25;
    padding: 10px;

    .panelSectionTitle {
      text-align: left;
      margin: 0;
      margin-bottom: 10px;
      font-family: @mainFont;
      font-size: @ftSizeLarge;

      &.centeredTitle {
        text-align: center;
        color: @color12;
        font-family: @mainFontRegular;
      }
    }

    * {
      user-select: none;
    }

    &.noPadding {
      padding: 0;
      border: none;
    }
  }
</style>
