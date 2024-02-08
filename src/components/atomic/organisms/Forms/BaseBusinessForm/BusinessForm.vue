<template>
  <section class="business-form form-group-form">
    <Base-FieldSet :title="title" class="form-group-form__fieldset">
      <section class="form-group__line business-form__line">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          :key="formKey"
          tag="div"
          ref="form"
          class="form-kgc"
        />
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import BusinessForm from "./Form";

let businessForm;

export default {
  mixins: [formSchemaMixin],
  async mounted() {
    this.name = "registerDataPj";
    await this.loadModel()
    businessForm = new BusinessForm(this.blocks, this.$store);
    this.title = businessForm.title;
    this.schema = businessForm.schema;
    this.hasToCreateStep = false;
    this.formKey += 1;
  },
  async beforeDestroy() {
    this.setRegisterStep(false);
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = businessForm.sendModel(
          value,
          this.affiliate.id,
          this.registerFormId
        );
      }
    }
  }
};
</script>
