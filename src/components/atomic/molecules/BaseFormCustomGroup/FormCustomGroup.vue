<template>
  <div class="base-form-custom-group">
    <vue-form-generator
      :model="model"
      :schema="schemaForm"
      :options="formOptions"
      v-for="(model, index) in innerModels"
      :key="index + 1"
      :isNewModel="index === innerModels.length - 1"
      @model-updated="onModelUpdate(innerModels)"
      ref="form"
      v-bind="$attrs"
      class="form-kgc base-form-custom-group__form"
    />
    <div class="base-form-custom-group__actions">
      <Base-Button
        @click="increseInput"
        class="base-form-custom-group__actions__button"
        >+</Base-Button
      >
      <Base-Button
        @click="decreseInput"
        v-if="showDecreseButton"
        class="base-form-custom-group__actions__button"
        >-</Base-Button
      >
    </div>
  </div>
</template>

<script>

import {formOptions} from "~/utils/form.utils";

export default {
  inheritAttrs: false,
  model: {
    prop: 'models',
    event: 'model-updated'
  },
  props: {
    schemaForm: {
      type: Object,
      required: true
    },
    models: {
      type: Array,
      required: true
    },
    formOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formOptions
    }
  },
  computed: {
    showDecreseButton() {
      return this.innerModels.length > 1;
    }
  },
  data() {
    return {
      innerModels: this.models,
      innerModelCopy: {},
    }
  },
  mounted() {
    this.createFirstModelCopy()
  },
  methods: {
    createFirstModelCopy() {
      if (!this.innerModels[0] ) {
        return
      }
      this.innerModelCopy = Object.keys(this.innerModels[0]).reduce((acc, key) => ({...acc, [key]: ""}), {})
    },
    validate() {
      let allFormValid = false
      this.$refs.form.forEach(form => {
        allFormValid = form.validate()
      })
      return allFormValid
    },
    increseInput() {
      const lastFormRef = this.$refs.form[this.innerModels.length - 1]
      const isFormValid = lastFormRef.validate()
      if(!isFormValid) {
        return;
      }
      this.innerModels = [...this.innerModels, {...this.innerModelCopy}];
    },
    decreseInput() {
      this.innerModels.pop();
    },
    onModelUpdate(model) {
      this.$emit("model-updated", model);
    }
  }
};
</script>
