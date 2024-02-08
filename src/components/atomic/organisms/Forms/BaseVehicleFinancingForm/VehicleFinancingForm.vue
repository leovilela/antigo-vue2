<template>
  <section class="revenues-form form-group-form">
    <Base-FieldSet
      class="form-group-form__fieldset"
      :title="title"
    >
      <h4 class="revenues-form__title">Exclusivo para o Segmento de Veículos</h4>

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
import VehicleFinancing from './Form';

const vehicleFinancing = new VehicleFinancing();

export default {
  mixins: [formSchemaMixin],
  async mounted() {
    this.name = vehicleFinancing.name;
    this.schema = vehicleFinancing.schema;
    this.title = vehicleFinancing.title;
    await this.loadModel();
  },
  watch: {
    model: {
      deep: true,
      handler(value) {
        this.sendModel = vehicleFinancing.sendModel(value, this.registerFormId)
      }
    }
  }
};
</script>

