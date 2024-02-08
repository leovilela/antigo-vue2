<template>
  <section class="revenues-form form-group-form">
    <Base-FieldSet :title="title" class="form-group-form__fieldset">
      <section class="form-group__line revenues-form__line">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="form"
          class="form-kgc"
          :key="formKey"
        />
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import RevenuesForm from "./Form";
const revenuesForm = new RevenuesForm();

export default {
  mixins: [formSchemaMixin],
  async mounted() {
    this.name = revenuesForm.name;
    this.schema = revenuesForm.schema;
    this.title = revenuesForm.title;
    await this.loadModel();
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = revenuesForm.sendModel(value, this.registerFormId);
      }
    }
  }
};
</script>
