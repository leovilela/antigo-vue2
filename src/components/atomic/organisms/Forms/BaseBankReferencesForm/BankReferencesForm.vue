<template>
  <section class="base-bank-references-form form-group-form">
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
import BankReferences from './Form';

const bankReferences = new BankReferences();

export default {
  mixins: [formSchemaMixin],
  async mounted() {
    this.name = bankReferences.name;
    this.schema = bankReferences.schema;
    this.title = bankReferences.title;
    await this.loadModel();
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = bankReferences.sendModel(value, this.registerFormId)
      }
    }
  }
};
</script>

<style scoped lang="less">
  @import "./style.less";
</style>
