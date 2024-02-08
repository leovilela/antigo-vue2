<template>
  <div
    :class="formClass"
    class="form-money-group form-group">
      <label 
        class="form-money-group__label"
        :for="id">{{ label }}
      </label>
      <money
        :value="value"
        v-on="listeners"
        :id="id"
        v-bind="$attrs"
        class="form-money-group__input input">
      </money>
      <slot />
  </div>
</template>

<script>
import { Money } from "v-money";
import FormMixing from "../../mixins/form";

export default {
  components: {
    Money,
  },
  mixins: [FormMixing],
  props: {
    label: {
      type: String,
      default: "",
    },
    money: {
      type: Object,
      default: () => {},
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