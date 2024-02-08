<template>
    <label
        class="checkbox"
        :class="[size, { 'is-disabled': disabled }]"
        ref="label"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()">
        <input
            v-model="computedValue"
            :indeterminate.prop="indeterminate"
            type="checkbox"
            class="base-checkbox"
            ref="input"
            @click.stop
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue"
            :true-value="trueValue"
            :false-value="falseValue"
            @change="$emit('change', $event)">
        <span class="check" :class="type" />
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
export default {
  name: "BCheckbox",
  props: {
    value: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
    indeterminate: Boolean,
    type: String,
    disabled: Boolean,
    required: Boolean,
    name: String,
    size: String,
    trueValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: false,
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("input", value);
      },
    },
  },
  watch: {
    value(value) {
      this.newValue = value;
    },
  },
  methods: {
    focus() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/vars.less";
input[type="checkbox"] {
  margin: -1px 5px 0 0;
  position: relative;
}
.checkbox {
  font-size: @ftSizeSmall;
  font-family: @mainFontRegular;
  font-weight: normal;
  align-items: center;
  display: inline-flex;
}
.base-checkbox {
  position: relative !important;
  margin: 0 5px 0 0 !important;
}
</style>
