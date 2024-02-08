<template>
  <section class="base-spouse-form form-group-form">
    <Base-FieldSet
      class="form-group-form__fieldset"
      :title="title"
    >
      <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="form"
          class="form-kgc"
          :key="formKey"
        />
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import SpouseForm from './Form'
import isEmpty from "lodash/isEmpty";
let spouseForm;

const MARITAL_STATUS_TO_CHECK = [2, 6]

export default {
  mixins: [formSchemaMixin],
  async mounted() {
    const block = this.blocks.find(block => block.name === 'registerDataPf')

    if (!isEmpty(block.model) && !MARITAL_STATUS_TO_CHECK.includes(block.model.maritalStatusID) ) {
      this.$emit('skipFormNow')
      this.skipFormNow = true
      return
    }

    spouseForm = new SpouseForm(block.model.maritalStatusID)
    this.name = spouseForm.name
    this.schema = spouseForm.schema
    this.title = spouseForm.title
    await this.loadModel()
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.canSkipForm = value.documentNumberCPF ? false : true
        this.sendModel = spouseForm.sendModel(value, this.registerFormId)
      }
    }
  }
};
</script>
