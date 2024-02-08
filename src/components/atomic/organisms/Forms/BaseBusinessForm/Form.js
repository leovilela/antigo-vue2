
import { formValidators, atLeastTwoNames } from "~/utils/validate.utils"
import { addressFields, CNPJField, moneyField, PhoneField, sendTelMask } from "~/utils/form.utils"
import { states } from "~/utils/form.value.utils"
import isEmpty from 'lodash/isEmpty'
import dayjs from "dayjs"
import FormField from "~/interfaces/FormField"

export default class BusinessForm {

  constructor(blocks, store) {
    this.title = "Dados Cadastrais"
    this.blocks = blocks
    this.$store = store
    const block = this.blocks.find(block => block.name === "registerDataPj")
    this.schema = {
      fields: Object.keys(this.getModel(block, store)).map(key => {
        const formField = new FormField({ model: key, ...this.getModel(block, store)[key] })
        return formField.field
      })
    }
    this.name = "registerDataPj"
  }
  getModel(block, store) {
    return {
      cnpj: {
        ...CNPJField,
        required: true,
        disabled: true,
        styleClasses: "col-xs-12 col-md-6",
      },
      fullName: {
        type: "input",
        inputType: "text",
        label: "Razão Social",
        required: true,
        disabled: !isEmpty(block.model.fullName) && atLeastTwoNames(block.model.fullName) ? true : false,
        validator: [formValidators.required, formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],        
        styleClasses: "col-xs-12 col-md-6",
      },
      simpleName: {
        type: "input",
        inputType: "text",
        label: "Nome fantasia",
        required: true,
        validator: formValidators.required,
        disabled: isEmpty(block.model.simpleName) ? false : true,
        styleClasses: "col-xs-12",
      },
      ...addressFields(store, true, true, block.model),
      phone: {
        ...PhoneField,
        validator: [formValidators.validatePhone, formValidators.required],
        label: "DDD + Telefone",
        required: true,
        disabled: isEmpty(block.model.phone) ? false : true,                
        styleClasses: "col-xs-12 col-md-6",
      },
      foundationDate: {
        type: "date",
        notBefore: "01-01-1900",
        notAfter: new Date(),
        label: "Data de Fundação",
        placeholder: "00/00/0000",
        required: true,
        disabled: isEmpty(block.model.foundationDate) || block.model.foundationDate == '1900-01-01T00:00:00' ? false : true,
        validator: [formValidators.date, formValidators.required, formValidators.validateUpperDateValid],
        styleClasses: "col-xs-12 col-md-6",
      },
      shareCapitalValue: {
        ...moneyField,
        label: "Capital Social Atual (R$)",
        styleClasses: "col-xs-12 col-md-6"
      },
      qtdeBranch: {
        type: "input",
        inputType: "number",
        label: "Quantidade de Filiais",
        required: true,
        validator: [formValidators.number, formValidators.required],
        styleClasses: "col-xs-12 col-md-6"
      },
      branchActivity: {
        type: "input",
        inputType: "text",
        label: "Ramo de Atividade",
        required: true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      numEmployees: {
        type: "input",
        inputType: "number",
        label: "Nº Funcionários",
        required: true,
        validator: formValidators.number,
        styleClasses: "col-xs-12 col-md-6"
      },
      optSimplesNacional: {
        type: "radios",
        label: "Simples Nacional",
        model: "optSimplesNacional",
        required: true,
        validator: formValidators.required,
        values: [{ name: "Optante", value: true }, { name: "Não Optante", value: false }],
        styleClasses: "col-xs-12 col-md-6 "
      },
    }
  }
  sendModel(model, AffiliateId, RegistrationFormID) {
    let PostalCode = model.addressPostalCode;
    if (model.addressPostalCode && model.addressPostalCode.includes('-')) {
      PostalCode = model.addressPostalCode.split('-').join('')
    }

    let state = states.find(state => state.id === model.uf)
    if (!state) {
      state = model.uf
    } else {
      state = state.name.split('-')[0].trim()
    }

    return {
      AffiliateId,
      RegistrationFormID,
      CNPJ: {
        Number: model.cnpj,
        DocumentType: 0,
      },
      CompanyName: model.fullName,
      TradingName: model.simpleName,
      Address: {
        Street: model.addressStreetName,
        Number: model.addressNumber,
        AdditionalInformation: model.addressAdditionalData,
        Neighborhood: model.addressNeighborhood,
        City: model.cityName,
        Uf: state,
        PostalCode
      },
      Telephone: {
        Number: sendTelMask(model.phone)
      },
      FoundationDate: model.foundationDate ? dayjs(model.foundationDate).toISOString() : null,
      ShareCapitalValue: model.shareCapitalValue,
      BranchActivity: model.branchActivity,
      BranchOfficesQuantity: model.qtdeBranch,
      EmployeesQuantity: model.numEmployees,
      SimplesNacional: model.optSimplesNacional,
    }
  }

}
