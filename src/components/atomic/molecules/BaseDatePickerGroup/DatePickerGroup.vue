<template>
  <div :class="formClass">
    <label for="" v-if="label">{{label}}</label>
    <date-picker :lang="'pt-br'" :value="value" :format="'DD/MM/YYYY'" v-bind="$attrs" @input="$emit('input', $event)" @change="$emit('change', $event)" />
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  name: "base-datepickergroup",
  components: {
    DatePicker,
  },
  props: {
    formClass: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: null,
    },
    value: {
      type: [String, Boolean, Date, Object],
      default: "",
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
