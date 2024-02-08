import { CPFField } from '~/utils/form.utils'
import dayjs from 'dayjs'
import FormField from "~/interfaces/FormField"
import { formValidators } from '~/utils/validate.utils'

const activeIf = (model) => model && !model.documentNumberCPF

const MARITAL_STATUS_TO_CHECK = [2, 6]

export default class SpouseForm {
  constructor(maritalStatus) {
    this.maritalStatus = maritalStatus
    this.title = "Cônjuge/ Companheiro (a)"
    this.name = "spouse"
    this.schema =  {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    }
  }
  getModel() {
    return {
      documentNumberCPF: {
        ...CPFField,
        validator: [formValidators.validateDocCpf, formValidators.required],
        required: true,
        styleClasses: "col-xs-12 col-md-6"
      },
      fullName: {
        type: "input",
        disabled: activeIf,
        required: (model) => !activeIf(model),
        inputType: "text",
        label: "Nome (sem abreviaturas)",
        validator: [formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      birthdate: {
        type: "date",
        label: "Data de Nascimento",
        placeholder: "00/00/0000",
        notAfter: dayjs(),
        notBefore: (model) =>  new Date(dayjs().subtract(100, 'y')),
        disabled: activeIf,
        required: (model) => !activeIf(model),
        styleClasses: "col-xs-12 col-md-6",
        validator: [formValidators.required,formValidators.date,formValidators.validateUnderEighteen, formValidators.validateUpperDateValid, formValidators.validateMinorHundred]
      },
      nameMother: {
        type: "input",
        disabled: activeIf,
        required: (model) => !activeIf(model),
        inputType: "text",
        label: "Nome da mãe",
        validator: [formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-12"
      },
    }
  }
  sendModel(model, RegistrationFormId) {
    return {
      RegistrationFormId,
      ID: model.id,
      FullName: model.fullName,
      DocumentNumberCPF: model.documentNumberCPF,
      NameMother: model.nameMother,
      BirthDate: model.birthdate ? dayjs(model.birthdate).toISOString() : "",
    }
  }
}
