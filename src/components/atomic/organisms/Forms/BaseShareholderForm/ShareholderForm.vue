<template>
  <section class="base-shareholder-form form-group-form">
    <Base-FieldSet class="form-group-form__fieldset" :title="title">
      <section class="form-group__line base-shareholder-form__line">
        <Base-FormCustomGroup
          class="form-group__item"
          :schemaForm="shareholderAdminSchema"
          :formOptions="formOptions"
          :key="formKey + 1"
          ref="formAdmin"
          v-model="shareholderAdminModel"
        />

        <Base-FormCustomGroup
          class="form-group__item"
          :schemaForm="shareholdersSchema"
          :formOptions="formOptions"
          :key="formKey"
          ref="formShareholder"
          v-model="shareholderModels"
        />
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import { createNamespacedHelpers, mapMutations } from "vuex";
import ShareHolderForm from "./Form";
import isEmpty from "lodash/isEmpty";



const {
  mapActions: customerDataActions,
  mapState: customerDataState
} = createNamespacedHelpers("customerData");

export default {
  mixins: [formSchemaMixin],
  data() {
    return {
      shareholderForm: {},
      shareholdersSchema: {},
      shareholderAdminSchema: {},
      shareholderModels: [],
      shareholderAdminModel: []
    };
  },
  computed: {
    ...customerDataState(["functions"]),    
  },
  async mounted() {
    await this.getFunctions();    
    this.shareholderForm = new ShareHolderForm(this.functions);
    this.name = this.shareholderForm.name;
    this.title = this.shareholderForm.title;
    this.shareholdersSchema = this.shareholderForm.shareholderSchema;
    this.shareholderAdminSchema = this.shareholderForm.adminSchema;
    this.hasToUpdate = false;
    
    await this.loadModel();

    const { administrators, partners } = this.model;

    this.shareholderModels = isEmpty(partners)
      ? [this.shareholderForm.seedShareholdersModel]
      : partners;
    this.shareholderAdminModel = isEmpty(administrators)
      ? [this.shareholderForm.seedShareholdersAdminModel]
      : administrators;

    this.formKey += 1;

  },
  methods: {    
    ...customerDataActions([
      "getFunctions"
    ]),
    validateSelf() {
      this.isFormValid1 = this.$refs.formAdmin.validate()
      this.isFormValid0 = this.$refs.formShareholder.validate()
      this.isFormValid = this.isFormValid1 && this.isFormValid0 ? true : false;
    }
  },
  watch: {
    shareholderModels: {
      deep: true,
      handler(value) {
        if (Object.values(value).every(el => !el)) {
          this.canSkipForm = true;
        } else {
          this.canSkipForm = false;
        }
        this.sendModel = this.shareholderForm.sendModel(
          this.shareholderAdminModel,
          value,
          this.registerFormId
        );
      }
    },
    shareholderAdminModel: {
      deep: true,
      handler(value) {
        if (Object.values(value).every(el => !el)) {
          this.canSkipForm = true;
        } else {
          this.canSkipForm = false;
        }
        this.sendModel = this.shareholderForm.sendModel(
          value,
          this.shareholderModels,
          this.registerFormId
        );
      }
    }
  }
};
</script>
