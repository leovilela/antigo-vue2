import dayjs from "dayjs"
import FormField from "~/interfaces/FormField";
import { formValidators } from '~/utils/validate.utils'

export default class PepForm {
  constructor() {
    this.title = "Pessoa Politicamente Exposta"
    this.name = "pep"
    this.seedModelPeps = {
      name: "",
      cpf: "",
      warrantIni: "",
      warrantEnd: "",
      degreeRelationship: "",
      organ: "",
      function: ""
    };
    this.isPEPSchema = {
      fields: Object.keys(this.getModelIsPEP()).map(key => {
        const formField = new FormField({ model: key, ...this.getModelIsPEP()[key] })
        return formField.field
      })
    }
    this.pepsSchema = {
      groups: [
        {
          fields: Object.keys(this.getModelPeps()).map(key => {
            const formField = new FormField({ model: key, ...this.getModelPeps()[key] })
            return formField.field
          })
        }
      ]
    }
  }
  getModelIsPEP() {
    return {
      isPEP: {
        type: "radios",
        label: "Escolha abaixo:",
        default: false,
        required: true,
        validator: formValidators.required,
        values: [{ name: "Sim", value: true }, { name: "Não", value: false }],
        styleClasses: "col-xs-12"
      },
    }
  }
  getModelPeps() {
    return {
      name: {
        type: "input",
        inputType: "text",
        label: "Nome",
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      cpf: {
        type: "cleave",
        cleaveOptions: {
          blocks: [3, 3, 3, 2],
          delimiters: ['.', '.', '-'],
          numericOnly: true,
          uppercase: false,
          lowercase: false
        },
        label: "CPF",
        required: true,
        validator: [formValidators.required, formValidators.validateDocCpf],
        styleClasses: "col-xs-12 col-md-6"
      },
      warrantIni: {
        type: "date",
        label: "Inicio de mandato",
        notBefore: "1900-01-01",
        placeholder: "00/00/0000",
        required: true,
        validator: [formValidators.date, formValidators.required, formValidators.validateUpperDateValid],
        styleClasses: "col-xs-12 col-md-6",
      },
      warrantEnd: {
        type: "date",
        label: "Fim de mandato",
        notBefore: (model) => model.warrantIni ? new Date(model.warrantIni) :  new Date(),
        placeholder: "00/00/0000",
        required: true,
        disabled: (model) => model && !model.warrantIni,
        validator: [formValidators.date, formValidators.required, formValidators.validateUpperDateValid],
        styleClasses: "col-xs-12 col-md-6",
      },
      degreeRelationship: {
        type: "input",
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        inputType: "text",
        label: "Grau de relacionamento",
        styleClasses: "col-xs-12 col-md-6"
      },
      organ: {
        type: "input",
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        inputType: "text",
        label: "Orgão",
        styleClasses: "col-xs-12 col-md-6"
      },
      function: {
        type: "input",
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        inputType: "text",
        label: "Cargo",
        styleClasses: "col-xs-12 col-md-6"
      }
    }
  }
  sendModel(pepsModel,isPEP, RegistrationFormId) {
    return {
      isPEP: isPEP,
      RegistrationFormId: RegistrationFormId,
      peps: pepsModel.map(pep => ({
        ID: pep.id,
        Name: pep.name,
        CPF: pep.cpf,
        WarrantIni: pep.warrantIni ? dayjs(pep.warrantIni).toDate() : null,
        WarrantEnd: pep.warrantEnd ? dayjs(pep.warrantEnd).toDate() : null,
        DegreeRelationship: pep.degreeRelationship,
        Organ: pep.organ,
        Function: pep.function
      })),
    }
  }
}
