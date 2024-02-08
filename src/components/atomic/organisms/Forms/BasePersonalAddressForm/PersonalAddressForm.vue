<template>
  <section class="pessoal-address-form form-group-form">
    <Base-FieldSet :title="title" class="form-group-form__fieldset">
      <section class="form-group__line pessoal-address-form__line">
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
import PersonalAddressForm from "./Form";
let personalAddressForm;

export default {
  mixins: [formSchemaMixin],
  async mounted() {
    personalAddressForm = new PersonalAddressForm(this.$store);
    this.name = personalAddressForm.name;
    this.schema = personalAddressForm.schema;
    this.title = personalAddressForm.title;
    await this.loadModel();
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = personalAddressForm.sendModel(value, this.registerFormId);
      }
    }
  }
};
</script>
