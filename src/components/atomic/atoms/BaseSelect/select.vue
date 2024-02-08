<template>
  <div
    class="base-select select"
    :class="{'activated': activated}"
    @click="activated = !activated">
      <label class="base-select__label" v-if="label">{{ label }}</label>

      <select
        class="base-select__select"
        :class="selectClass"
        v-model="computedValue"
        ref="select"
        :multiple="multiple"
        :size="nativeSize"
        v-bind="$attrs"
        :disabled="disabled"
        @blur="$emit('blur', $event)"
        @change="onChangeEvent"
        @focus="$emit('focus', $event)">
          <option
            class="base-select__option"
            v-if="placeholder"
            :value="null"
            hidden
            selected
            >
              {{ placeholder }}
          </option>
          <slot />
      </select>
      <div
        class="base-select__arrow"
        :class="{'label-top': label, 'not-label-top': !label }"></div>
  </div>
</template>

<script>
export default {
  computed: {
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit("input", value);
      },
    },
  },
  data() {
    return {
      selected: this.value,
      activated: false,
    };
  },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    nativeSize: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    selectClass: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    onChangeEvent() {
      if (!this.selected) {
        return;
      }
      this.$emit("change", this.selected);
    },
  },
  watch: {
    /**
        * When v-model is changed:
        *   1. Set the selected option.
        *   2. If it's invalid, validate again.
        */
    value(value) {
      this.selected = value;
    },
  },
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>

