<template>
  <section class="base-pep-form form-group-form">
    <Base-FieldSet
      class="form-group-form__fieldset"
      title="Pessoa Politicamente Exposta"
    >
      <section class="form-group__line base-pep-form__line">
        <p class="form-group__text">
          PEP (Pessoa Exposta Politicamente) são pessoas que desempenham ou
          tenham desempenhado nos últimos cinco anos, no Brasil ou o exterior,
          cargos, empregos e/ou funções públicas relevantes, assim como seus
          representantes, familiares, e outras pessoas de seu relacionamento
          próximo. Conforme definido pela Circular nº 3.339 de 22/12/2006 do
          Banco Central do Brasil, as instituições financeiras, devem observar
          procedimentos a respeito das movimentações financeira das chamadas
          PPE. Possui representantes, sócios, administradores, familiares ou
          outras pessoas de seu relacionamento que desempenham ou desempenharam
          nos últimos 05 anos, no Brasil ou em países, territórios e
          dependências estrangeiras, cargos, empregos ou funções públicas
          relevantes?
        </p>

        <vue-form-generator
          :model="isPEPModel"
          :schema="isPEPSchema"
          :options="formOptions"
          ref="form"
          class="form-kgc"
          :key="formKey"
        />
        <Base-FormCustomGroup
          class="form-kgc"
          :key="formKey + 1"
          :schemaForm="pepsSchema"
          :formOptions="formOptions"
          ref="form"
          v-model="pepsModel"
          v-if="isPEPModel.isPEP"
        />
      </section>
    </Base-FieldSet>
  </section>
</template>

<script>
import formSchemaMixin from "~/components/atomic/mixins/formSchema";
import PepForm from "./Form";

import isEmpty from "lodash/isEmpty";

let pepForm;

export default {
  mixins: [formSchemaMixin],
  data() {
    return {
      isPEPModel: {
        isPEP: undefined
      },
      isPEPSchema: {},
      pepsModel: [],
      pepsSchema: {},
      formCustomKey: 1
    };
  },
  async mounted() {
    pepForm = new PepForm();

    this.name = pepForm.name;
    this.title = pepForm.title;

    this.isPEPSchema = pepForm.isPEPSchema;
    this.pepsSchema = pepForm.pepsSchema;
    this.hasToUpdate = false;
    await this.loadModel();
    const { peps, isPEP } = this.model;

    this.pepsModel = isEmpty(peps) ? [pepForm.seedModelPeps] : peps;
    if (isPEP) {
      this.isPEPModel.isPEP = isPEP
      this.formKey += 1
    }
  },
  watch: {
    "isPEPModel.isPEP"(value, newValue) {
      this.formKey += 1
      this.sendModel = !value ? pepForm.sendModel(
          [],
          this.isPEPModel.isPEP,
          this.registerFormId
        ) : pepForm.sendModel(
          this.pepsModel,
          this.isPEPModel.isPEP,
          this.registerFormId
        );
    },
    pepsModel: {
      deep: true,
      handler(value) {
        let peps = value;
        this.sendModel = pepForm.sendModel(
          peps,
          this.isPEPModel.isPEP,
          this.registerFormId
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
