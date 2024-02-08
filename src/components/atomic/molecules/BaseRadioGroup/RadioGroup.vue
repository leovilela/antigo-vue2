<template>
  <div class="base-radio-group">
    <Base-Radio v-for="(radio, index) in radios" :key="index" :name="radio.name" :nativeValue="radio.value" @input="onInput" >
      {{radio.label}}
    </Base-Radio>
  </div>
</template>

<script>
export default {
  name: "LRadioGroup",
  props: {
    radios: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  }
};
</script>

<style lang="less" scoped>
  @import "style.less";
</style>
