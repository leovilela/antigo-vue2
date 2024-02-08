import { CPFField } from '~/utils/form.utils'
import { formValidators } from '~/utils/validate.utils'
import FormField from "~/interfaces/FormField"
import dayjs from 'dayjs'


export default class ShareHolderForm {
  constructor(functions) {
    this.title = "Acionista"
    this.name = "shareholder"
    this.functions = functions.map(val => ({id: val.id, name: val.description}));
    this.adminSchema = {
      groups: [{
        legend: "Administrador",
        fields: Object.keys(this.getAdminModel(this.functions)).map(key => {
          const formField = new FormField({ model: key, ...this.getAdminModel(this.functions)[key] })
          return formField.field
        })
      }]
    }
    this.shareholderSchema = {
      groups: [
        {
          legend: "Acionista",
          fields: Object.keys(this.getShareholderModel()).map(key => {
            const formField = new FormField({ model: key, ...this.getShareholderModel()[key] })
            return formField.field
          })
        }
      ]
    }
    this.seedShareholdersModel = {
      id: "",
      name: "",
      cpf: "",
      admissionDate: null,
      capitalParticipation: ""
    }
    this.seedShareholdersAdminModel = {
      id: "",
      name: "",
      cpf: "",
      expirationDate: null,
      position: "",
      admissionDate: null
    }
  }

  getModel(labelName) {
    return {
      cpf: {
        ...CPFField,
        required: true,
        validator: [formValidators.required, formValidators.validateDocCpf],
        styleClasses: "col-xs-12 col-lg-6"
      },
      name: {
        type: "input",
        inputType: "text",
        label: labelName,
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-lg-6"
      },
      admissionDate: {
        type: "date",
        notAfter: new Date(),
        label: "Data Admissão",
        placeholder: "00/00/0000",
        required: true,
        validator: [formValidators.date, formValidators.required],
        styleClasses: "col-xs-12 col-md-12 col-lg-6",
      }
    }
  }
  getAdminModel(functionsList) {
    const functions = functionsList
    return {
      ...this.getModel("Nome do administrador"),
      expirationDate: {
        type: "date",
        notBefore: (model) => model.admissionDate ? new Date(model.admissionDate) : new Date(),
        label: "Vcto. de mandato",
        placeholder: "00/00/0000",
        required: true,
        validator: [formValidators.required, formValidators.date, formValidators.validateUpperDateValid],
        styleClasses: "col-xs-12 col-md-12 col-lg-6",
      },
      position: {
        type: "select",
        label: "Cargo",
        required: true,
        values: functions,
        selectOptions: {
          noneSelectedText: "Escolha o cargo",
        },
        validator: [formValidators.required],
        styleClasses: "col-xs-12 col-lg-12",
        get(model) {
          const position = functions.find(value => value.name === model.position)
          return position ? position.id : model.position
        }
      },
    }

  }

  getShareholderModel() {
    return {
      ...this.getModel("Nome do acionista"),
      capitalParticipation: {
        type: "input",
        inputType: "number",
        min: 1,
        max: 100,
        required: true,
        label: "Participação no Capital (%)",
        model: "capitalParticipation",
        validator: [formValidators.number, formValidators.required],
        styleClasses: "col-xs-12 col-lg-6"
      }
    }
  }

  sendModel(administrators, partners, RegistrationFormId) {
    return {
      Partners: partners.map(partner => ({
        RegistrationFormId,
        ID: partner.id,
        Name: partner.name,
        CPF: partner.cpf.replace(/\D/g, ""),
        AdmissionDate: partner.admissionDate ? dayjs(partner.admissionDate).toISOString() : null,
        CapitalParticipation: partner.capitalParticipation,
      })),
      Administrators: administrators.map(adm => {
        let Position = this.functions.find(value => value.id == adm.position)
        Position = Position ? Position.name : adm.position
        return {
          RegistrationFormId,
          Name: adm.name,
          ID: adm.id,
          CPF: adm.cpf.replace(/\D/g, ""),
          AdmissionDate: adm.admissionDate ? dayjs(adm.admissionDate).toISOString() : null,
          ExpirationDate: adm.expirationDate ? dayjs(adm.expirationDate).toISOString() : null,
          Position
        }
      })
    }
  }
}
