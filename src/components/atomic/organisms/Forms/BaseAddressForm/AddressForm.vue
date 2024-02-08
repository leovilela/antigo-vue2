<template>
  <vue-form-generator
    :model="model"
    :schema="schema"
    :options="formOptions"
    ref="form"
    class="form-kgc"
    @validated="$emit('onValidated', $event)"
  />
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import formSchema from "./Form";
import {formOptions} from "~/utils/form.utils";

const {mapState, mapActions} = createNamespacedHelpers('cep')


export default {
  data() {
    return {
      formOptions,
      schema: {}
    }
  },
  mounted() {
    this.schema = formSchema([], []);
  }
};
</script>
