<template>
  <section class="data-patrimony-form form-group-form">
    <Base-FieldSet class="form-group-form__fieldset data-patrimony-form__fieldset" :title="title">
      <section class="form-group__line data-patrimony-form__line">
        <div>
          <Base-FormCustomGroup
            class="form-group__item"
            :key="formKey + 1"
            :schemaForm="schemaImovable"
            :formOptions="formOptions"
            v-model="modelImovables"
          />
        </div>

        <div>
          <Base-FormCustomGroup
            class="form-group__item"
            :schemaForm="schemaMovable"
            :formOptions="formOptions"
            :key="formKey"
            v-model="modelMovables"
          />
        </div>
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import DataPatrimonyForm from "./Form";
import isEmpty from "lodash/isEmpty";

const personDataPatrimonyForm = new DataPatrimonyForm();

export default {
  mixins: [formSchemaMixin],
  data() {
    return {
      modelImovables: [],
      schemaImovable: {},
      modelMovables: [],
      schemaMovable: {}
    };
  },
  async mounted() {
    this.name = personDataPatrimonyForm.name;
    this.schemaImovable = personDataPatrimonyForm.schemaImovables;
    this.schemaMovable = personDataPatrimonyForm.schemaMovables;
    this.title = personDataPatrimonyForm.title;
    this.hasToUpdate = false;
    await this.loadModel();
    this.modelImovables = isEmpty(this.model.immovables)
      ? [personDataPatrimonyForm.seedImovable()]
      : this.model.immovables;
    this.modelMovables = isEmpty(this.model.movables)
      ? [personDataPatrimonyForm.seedMovable()]
      : this.model.movables;
  },
  watch: {
    modelImovables: {
      deep: true,
      handler(value, newValue) {
        if (!value) {
          return;
        }
        if (Object.values(value[0]).every(el => !el)) {
          this.canSkipForm = true;
        } else {
          this.canSkipForm = false;
        }
        this.sendModel = personDataPatrimonyForm.sendModel(
          this.modelMovables,
          value,
          this.registerFormId
        );
      }
    },

    modelMovables: {
      deep: true,
      handler(value, newValue) {
        if (!value) {
          return;
        }
        if (Object.values(value[0]).every(el => !el)) {
          this.canSkipForm = true;
        } else {
          this.canSkipForm = false;
        }
        this.sendModel = personDataPatrimonyForm.sendModel(
          value,
          this.modelImovables,
          this.registerFormId
        );
      }
    }
  }
};
</script>
<style soped lang="less">
@import "./style.less";
</style>
