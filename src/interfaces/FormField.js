class FormField {
  constructor(params) {
    this.field = {
      type: params.type,
      inputType: params.inputType,
      label: params.label,
      model: params.model,
      styleClasses: params.styleClasses,
      required: params.required,
      validator: params.validator,
      ...params
    }
  }
}

export default FormField;
