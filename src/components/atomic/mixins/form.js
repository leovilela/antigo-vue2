export default {
  props: {
    value: {
      default: "",
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit("input", event.target ? event.target.value : event),
      };
    },
  },
  inheritAttrs: false,
};
