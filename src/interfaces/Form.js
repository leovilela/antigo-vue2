import { formOptions } from "~/utils/form.utils";

class Form {

  constructor() {
    this.schema = {}
    this.formOptions = formOptions
    this.model = {}
    this.sendModel = {}
    this.name = ''
    this.formKey = 0
    this.isFormValid = false
    this.title = ''
    this.hasToUpdate = true
    this.canSkipForm =  false
    this.hasToCreateStep = true
    this.skipFormNow = false
  }

  build() {
    return {
      title: this.title,
      schema: this.schema,
      formOptions: this.formOptions,
      model: this.model,
      name: this.name,
      formKey: this.formKey,
      isFormValid: this.isFormValid,
      sendModel: this.sendModel,
      hasToUpdate: this.hasToUpdate,
      canSkipForm: this.canSkipForm,
      hasToCreateStep: this.hasToCreateStep,
      skipFormNow: this.skipFormNow
    }
  }
}

export default Form;
