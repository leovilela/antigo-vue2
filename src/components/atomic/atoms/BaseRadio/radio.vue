<template>
  <label
    class="base-radio__label--control base-radio__label--control-radio"
    ref="label"
    :class="[
      { 'base-radio__label--is-inline': isInline },
      { 'base-radio__label--disabled': disabled },
      { 'base-radio__label--absolute-control': isTextRelative }
    ]"
    :disabled="disabled"
    @click="focus"
    @keydown.prevent.enter="$refs.label.click()"
  >
    <span :class="'base-radio__absolute-span'">
      <slot />
    </span>
    <input
      class="base-radio__input"
      v-model="computedValue"
      type="radio"
      ref="input"
      @click.stop
      :disabled="disabled"
      :required="required"
      :name="name"
      :value="nativeValue"
    />
    <div class="base-radio__div--control_indicator"></div>
  </label>
</template>

<script>
export default {
  name: "LRadio",
  props: {
    value: {
      type: [String, Number, Boolean, Function, Object, Array],
    },
    nativeValue: {
      type: [String, Number, Boolean, Function, Object, Array],
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    isInline: {
      type: Boolean,
      required: false,
      default: false,
    },
    isTextRelative: {
      type: Boolean,
      required: false,
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
  @import "./style.less";
</style>
