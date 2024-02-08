<template>
  <div id="mainContentSection" class="container">
    <div class="row" v-if="sectionTitle">
      <h2 id="content-section-title" class="col-xs-12">{{ sectionTitle }}</h2>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<style lang="less" scoped>
  @import "~assets/vars.less";
  @import "~assets/variables.less";

  #mainContentSection {
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid @color25;

    #content-section-title {
      // display: inline-block;
      // margin: 5px 0 10px;
      font-family: @mainFontBold;
      font-size: @ftSizeLarge;
      line-height: 20px;

      @media (max-width: @screen-xs-max) {
        font-size: @ftSizeLarge;
      }
    }

    &.noPadding {
      padding: 0 15px;
      border: none;
    }

    &.noBorder {
      border: none;
    }

    @media (max-width: @screen-xs-max) {
      padding: 0 15px;
    }
  }
</style>

<script>
export default {
  props: ["sectionTitle"],
};
</script>
