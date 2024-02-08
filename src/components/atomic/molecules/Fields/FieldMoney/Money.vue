<template>
  <money
    v-model="value"
    :disabled="disabled"
    :maxlength="schema.max"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    v-bind="money"
    class="form-control"
  />
</template>

<script>
import { abstractField } from "vue-form-generator";
import { Money } from "v-money";

export default {
  components: {
    Money
  },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false
      }
    };
  },
  mixins: [abstractField]
};
</script>
