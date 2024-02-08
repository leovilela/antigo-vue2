<template>
  <div
    class="form-group"
    :class="formClass">
      <label class="form-group__label" :for="id">{{label}} </label>
      <Base-Input
        class="form-group__input"
        v-on="listeners"
        :id="id"
        v-bind="$attrs"
        :value="value" />
      <slot />
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
  },
};
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
