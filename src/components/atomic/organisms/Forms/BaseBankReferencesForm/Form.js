import { formValidators } from '~/utils/validate.utils'
import FormField from "~/interfaces/FormField"
import dayjs from 'dayjs';


export default class BankReference {
  constructor() {
    this.title = "Domicílio Bancário"
    this.name = "bankReferences"
    this.schema =  {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    }
  }

  getModel() {
    return {
      bankName: {
        type: "input",
        inputType: "text",
        label: "Nome do Banco",
        disabled: true,
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      financialBankId: {
        type: "input",
        inputType: "text",
        label: "Nº do Banco",
        required: true,
        disabled: true,
        validator: formValidators.required,
        styleClasses: "col-xs-12 col-md-6"
      },
      agency: {
        type: "input",
        inputType: "text",
        label: "Nº Agência",
        required: true,
        disabled: true,
        validator: formValidators.required,
        styleClasses: "col-xs-12 col-md-6"
      },
      agencyCV: {
        type: "input",
        inputType: "text",
        label: "Agência Dígito",
        required: true,
        disabled: true,
        validator: formValidators.required,
        styleClasses: "col-xs-12 col-md-6"
      },
      account: {
        type: "input",
        inputType: "text",
        label: "Nº C/C",
        required: true,
        disabled: true,
        validator: formValidators.required,
        styleClasses: "col-xs-12 col-md-6"
      },
      accountCV: {
        type: "input",
        inputType: "text",
        label: "C/C Dígito",
        required: true,
        disabled: true,
        validator: formValidators.required,
        styleClasses: "col-xs-12 col-md-6"
      },
      accountSince: {
        type: "cleave",
        cleaveOptions: {
          blocks: [2,4],
          numericOnly: true,
          delimiter: "/",
        },
        label: "Conta desde",
        placeholder: '00/0000',
        required: true,
        disabled: false,
        validator: [formValidators.required, formValidators.validateDateSinceMonthEndYear],
        styleClasses: "col-xs-12 col-md-6"
      },
    }
  }

  sendModel(model, RegistrationFormId) {
    return {
      RegistrationFormId,
      ID: model.id,
      FinancialBankId: model.financialBankId,
      Agency: model.agency,
      AgencyCV: model.agencyCV,
      Account: model.account,
      AccountCV: model.accountCV,
      AccountSince: model.accountSince
    }
  }
}

