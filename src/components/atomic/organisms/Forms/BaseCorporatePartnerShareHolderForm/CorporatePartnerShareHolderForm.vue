<template>
  <section class="corporate-partner-share-holder-form form-group-form">
    <Base-FieldSet class="form-group-form__fieldset" :title="title">
      <section
        class="form-group__line corporate-partner-share-holder-form__line"
      >
        <Base-FormCustomGroup
          :schemaForm="schema"
          :formOptions="formOptions"
          :key="formKey"
          ref="form"
          v-model="cpshModels"
        />
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import CorporateShareHoldersForm from './Form'
import isEmpty from 'lodash/isEmpty'
const corporatePartnerShareHolderForm = new CorporateShareHoldersForm()

export default {
  mixins: [formSchemaMixin],
  data() {
    return {
      cpshModels: [],
    };
  },
  async mounted() {
    this.name = corporatePartnerShareHolderForm.name;
    this.title = corporatePartnerShareHolderForm.title;
    this.schema = corporatePartnerShareHolderForm.schema;
    await this.loadModel();

    this.cpshModels = isEmpty(this.model) ? [corporatePartnerShareHolderForm.seedModel] : this.model;
    this.hasToUpdate = false
  },
  watch: {
    cpshModels: {
      deep: true,
      handler(value) {
        if (Object.values(value[0]).every(el => !el)) {
          this.canSkipForm = true
        } else {
          this.canSkipForm = false
        }
        this.sendModel = corporatePartnerShareHolderForm.sendModel(value, this.registerFormId)
      }
    }
  }
};
</script>
