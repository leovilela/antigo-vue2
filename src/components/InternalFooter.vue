<template>
  <div id="footer">
    <div id="desktop" v-if="$mq === 'laptop' || $mq === 'desktop' || $mq === 'bigScreen'">
      <p v-if="!isSCD">{{currentYear}} {{text.footerDefault}}</p>
      <p v-if="isSCD">{{currentYear}} {{text.footerLoans}}</p>
    </div>
    <div id="mobile" v-if="$mq === 'mobile' || $mq === 'tablet'">
      <p>{{ $mq }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~assets/vars.less";
@import "~assets/variables.less";

#footer {
  font-family: @mainFontLight;
  color: @color3;
  font-size: @ftSizeTiny;

  #desktop {
    text-align: right;
    margin-right: 20px;
  }
}
</style>

<script>
export default {
  created() {
    const date = new Date();

    this.currentYear = `® ${date.getFullYear()}`;
  },
  data() {
    return {
      text: {
        footerDefault: "Listo Tecnologia S.A. Todos os direitos reservados.",
        footerLoans: "Listo SCD. Todos os direitos reservados.",
      },
      currentYear: null,
    };
  },
  props: ["isSCD"],
};
</script>
