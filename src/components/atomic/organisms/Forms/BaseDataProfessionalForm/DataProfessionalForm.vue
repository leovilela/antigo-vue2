<template>
  <section class="data-professional-form form-group-form">
    <Base-FieldSet class="form-group-form__fieldset" :title="title">
      <section class="form-group__line data-professional-form__line">
        <vue-form-generator
          :model="model"
          :schema="schema"
          :options="formOptions"
          ref="formProfessional"
          class="form-kgc"
          :key="formKey"
        />

        <Base-FormCustomGroup
          class="form-kgc"
          :key="formKey + 1"
          :schemaForm="shareschema"
          :formOptions="formOptions"
          ref="formCustomGroup"
          v-model="shareModel"
          v-show="model.isShareHolders"
        />
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import { createNamespacedHelpers, mapMutations } from "vuex";
import DataProfessional from "./Form";
import isEmpty from "lodash/isEmpty";

let dataProfessional;

const {
  mapActions: customerDataActions,
  mapState: customerDataState
} = createNamespacedHelpers("customerData");

export default {
  mixins: [formSchemaMixin],
  data() {
    return {
      shareschema: {},
      shareModel: [],
      formCustomKey: 2
    };
  },
  computed: {
    ...customerDataState(["functions", "professions"]),
  },
  async mounted() {
    this.name = 'dataProfessional';
    await this.getFunctions();
    await this.getProfessions();    
    await this.loadModel();
    const block = this.blocks.find(block => block.name === 'dataProfessional')
    dataProfessional = new DataProfessional(this.$store, this.functions, this.professions, block);
    
    this.schema = dataProfessional.schema;
    this.title = dataProfessional.title;

    

    this.shareschema = dataProfessional.shareShchema;

    this.shareModel = isEmpty(this.model.shareholders)
      ? [dataProfessional.seedShareHolder]
      : this.model.shareholders;
    this.formCustomKey += 1;
  },
  methods: {
    ...customerDataActions([
      "getFunctions",
      "getProfessions"
    ]),
    validateSelf() {
      if (this.model.isShareHolders) {
        this.isFormValid = this.$refs.formCustomGroup.validate();
      }
      this.isFormValid = this.$refs.formProfessional.validate();
    }
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = dataProfessional.sendModel(
          value,
          value.isShareHolders ? this.shareModel : [],
          this.registerFormId
        );
      }
    },
    shareModel: {
      deep: true,
      handler(value) {
        this.sendModel = dataProfessional.sendModel(
          this.model,
          this.model.isShareHolders ? this.shareModel : [],
          this.registerFormId
        );
      }
    }
  }
};
</script>
