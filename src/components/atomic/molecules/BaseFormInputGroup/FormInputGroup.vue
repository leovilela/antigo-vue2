<template>
  <div :class="formClass">
    <label :for="id">{{label}} </label>
    <Base-InputGroup v-on="listeners" :id="id" v-bind="$attrs" :value="value" @btnClick="$emit('onClick')" :isButtonDisabled="disabled">
      <slot />
    </Base-InputGroup>
    <slot name="errors" />
  </div>
</template>

<script>
import FormMixing from "../../mixins/form";

export default {
  mixins: [FormMixing],
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    formClass: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>
<style lang="less" scoped>
@import "~assets/vars.less";
label {
  font-size: @ftSizeSmall;
  font-family: @mainFontRegular;
}
</style>
