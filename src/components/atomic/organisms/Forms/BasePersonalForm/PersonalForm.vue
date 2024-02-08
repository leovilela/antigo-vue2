<template>
  <section class="personal-form form-group-form">
    <Base-FieldSet :title="title" class="form-group-form__fieldset">
      <section class="form-group__line personal-form__line">
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
import FormSchemaMixin from "~/components/atomic/mixins/formSchema";
import { createNamespacedHelpers } from "vuex";
import PersonForm from "./Form";
import isEmpty from "lodash/isEmpty";
let personForm;

const {
  mapActions: customerDataActions,
  mapState: customerDataState
} = createNamespacedHelpers("customerData");


export default {
  mixins: [FormSchemaMixin],
  computed: {
    ...customerDataState(["maritalStatus"]),
  },
  async mounted() {
    this.name = 'registerDataPf';
    await this.getMaritalStatus()
    await this.loadModel()
    const block = this.blocks.find(block => block.name === 'registerDataPf')    
    if (!isEmpty(block.model) && block.model.nameMother) {
      personForm = new PersonForm(!!block.model.nameMother, this.maritalStatus, block.model.fullName, block.model.cpf, block.model.genderID, block.model.gender, block.model.birthDate, block.model.phone, block.model.phoneCel)
      } else {
      personForm = new PersonForm(false, this.maritalStatus,  block.model.fullName, block.model.cpf, block.model.genderID, block.model.gender, block.model.birthDate, block.model.phone, block.model.phoneCel)
    }
    this.schema = personForm.schema;
    this.title = personForm.title;
    this.hasToCreateStep = false
  },
  methods: {
    ...customerDataActions([
      "getMaritalStatus",
    ]),
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = personForm.sendModel(
          value,
          this.affiliate.id,
          this.registerFormId
        );
      }
    }
  }
};
</script>
