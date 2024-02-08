<template>
  <div class="box-gray">
    <h3>{{ title }}</h3>
    <slot />
    <Base-Button @click="$emit('click')" class="btn-carregar"
      >{{ buttonText }}</Base-Button
    >
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
.box-gray {
  background: @color15;
  margin-top: 20px;
  padding: 10px 15px;
  text-align: center;
  h3 {
    font-family: 'newjunebold';
    font-size: @ftSizeNormal;
    color: @color1;
    margin: 8px 0 10px 0;
  }
  p {
    font-family: 'newjuneregular';
    font-size: @ftSizeNormal;
    color: @color1;
    text-align: center;
    padding: 0
  }
  .btn-carregar {
    width: auto;
    font-family: 'newjunebold';
    font-size: @ftSizeNormal;
    color: @color7;
    background: @color1;
    text-transform: uppercase;
    padding: 5px 30px;
  }
  .btn-enviar {
    width: auto;
    font-family: 'newjunebold';
    font-size: @ftSizeNormal;
    color: @color7;
    background: @color1;
    text-transform: uppercase;
    padding: 5px 44px;
  }
}
</style>
