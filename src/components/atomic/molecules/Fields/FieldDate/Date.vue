<template>
  <date-picker
    v-model="value"
    :disabled="disabled"
    :maxlength="schema.max"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    :lang="lang"
    :format="format"
    :not-before="notBefore"
    :not-after="notAfter"
  />
</template>

<script>
import { abstractField } from "vue-form-generator";
import isFunction from "lodash/isFunction";
import DateMixin from '~/components/atomic/mixins/date.mixin'

export default {
  computed: {
    format() {
      return this.schema.format ? this.schema.format : "DD/MM/YYYY";
    },
    notBefore() {
      return isFunction(this.schema.notBefore)
        ? this.schema.notBefore(this.model)
        : this.schema.notBefore;
    },
    notAfter() {
      return isFunction(this.schema.notAfter)
        ? this.schema.notAfter(this.model)
        : this.schema.notAfter;
    }
  },
  mixins: [abstractField, DateMixin]
};
</script>

<style>
</style>
