<template>
  <div :class="formClass">
    <Base-Checkbox v-on="listeners" v-bind="$attrs" :value="value" />
    <label for="" v-if="label">{{label}}</label>
    <slot />
  </div>
</template>

<script>
import FormMixing from "../../mixins/form";

export default {
  mixins: [FormMixing],
  props: {
    formClass: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: null,
    },
    value: [String, Number, Boolean, Function, Object, Array],
  },
};
</script>
