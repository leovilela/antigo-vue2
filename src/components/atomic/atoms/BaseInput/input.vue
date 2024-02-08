<template>
  <input
    :class="setClass"
    v-on="listeners"
    v-bind="$attrs"
    :value="value" >
</template>

<script>
import { mask } from "vue-the-mask";

import FormMixing from "../../mixins/form";

export default {
  mixins: [FormMixing],
  directives: { mask },
  computed: {
    setClass() {
      return {
        "base-input": true,
        "base-input--text": this.$attrs.type === "text",
        "base-input--number": this.$attrs.type === "number",
        "base-input--email": this.$attrs.type === "email",
        "base-input--password": this.$attrs.type === "password",
      };
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
