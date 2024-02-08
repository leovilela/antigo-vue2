import FormField from "~/interfaces/FormField"
import { CNPJField, getCleanData } from "~/utils/form.utils"
import { formValidators } from '~/utils/validate.utils'

export default class CorporateShareHoldersForm {
  constructor() {
    this.title = "Participação em Outras Empresas"
    this.name = "corporatePartnerShareHolder"
    this.schema = {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    }
    this.seedModel = {
        cnpj: '',
        companyName: '',
        lineBusiness: '',
        capitalParticipation: ''
    }
  }
  getModel() {
    return {
      cnpj: {
        ...CNPJField,
        validator: formValidators.validateDocCnpj,
        styleClasses: "col-xs-12 col-md-6"
      },
      companyName: {
        type: "input",
        inputType: "text",
        label: "Razão Social",
        validator: [formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      lineBusiness: {
        type: "input",
        inputType: "text",
        label: "Ramo de Atividade",
        validator: [formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      capitalParticipation: {
        type: "input",
        inputType: "number",
        min: 1,
        max: 100,
        validator: formValidators.number,
        label: "Participação no Capital (%)",
        styleClasses: "col-xs-12 col-md-6"
      },
    }
  }
  sendModel(models, RegistrationFormId) {
    return {
      RegistrationFormId,
      ParticipationOthersCompanies: models.map(model => ({
        id: model.id,
        CompanyName: model.companyName,
        CNPJ: getCleanData(model.cnpj, "").replace(/\D/g, ""),
        LineBusiness: model.lineBusiness,
        CapitalParticipation: model.capitalParticipation
      }))
    }
  }
}
