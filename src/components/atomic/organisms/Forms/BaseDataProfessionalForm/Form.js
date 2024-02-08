import { addressFields, CNPJField, PhoneField,  moneyField, sendTelMask } from "~/utils/form.utils"
import { states } from '~/utils/form.value.utils'
import FormField from "~/interfaces/FormField"
import dayjs from 'dayjs'
import { formValidators } from '~/utils/validate.utils'

export default class DataProfessional {
  constructor(state, functions, professions, block) {
    this.title = "Dados Profissionais";
    this.name = "dataProfessional";
    this.functions = functions.map(val => ({id: val.id, name: val.description}));
    this.professions = professions.map(val => ({id: val.id, name: val.description}));
    this.$store = state;
    this.block = block;
    this.isFieldsDisabled = true;

    this.schema = {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    }
    
    this.shareShchema = {
      fields: Object.keys(this.shareholders()).map(key => {
        const formField = new FormField({ model: key, ...this.shareholders()[key] })
        return formField.field
      })
    }
    this.seedShareHolder = {
      numberDocumentCNPJ: "",
      capitalParticipation: "",
      admissionDate: "",
      fullName: ""
    }
  }

  _equals() {
    return {
      numberDocumentCNPJ: {
        ...CNPJField,
        validator: formValidators.validateDocCnpj,
        styleClasses: "col-xs-12 col-md-6"
      },
      capitalParticipation: {
        type: "input",
        inputType: "number",
        max: 100,
        min: 1,
        label: "Participação no Capital (%)",
        validator: formValidators.number,
        styleClasses: "col-xs-12 col-md-6"
      },
      fullName: {
        type: "input",
        inputType: "text",
        label: "Razão Social",
        validator: [formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
    }
  }

  shareholders() {
    return {
      ...this._equals(),
      admissionDate: {
        type: "date",
        label: "Data Admissão",
        placeholder: "00/00/0000",
        notAfter: new Date(),
        styleClasses: "col-xs-12 col-md-6",
        validator: [formValidators.date, formValidators.validateUpperDateValid]
      },
    }
  }

  getModel() {
    let model = this.block.model;
    return {
      ...this._equals(),
      admissionDate: {
        type: "date",
        label: "Data Admissão",
        placeholder: "00/00/0000",
        notAfter: dayjs(),
        notBefore: (model) =>  new Date("1900-01-02T00:00:00"),
        required: true,
        styleClasses: "col-xs-12 col-md-6",
        validator: [formValidators.required,formValidators.date, formValidators.validateUpperDateValid]
      },
      phone: {
        ...PhoneField,
        validator: [formValidators.validatePhone],
        label: "DDD + Telefone",
        styleClasses: "col-xs-12 col-md-6"
      },
      professionID  : {
        type: "select",
        label: "Profissão",
        required: true,
        values: this.professions,
        selectOptions: {
          noneSelectedText: "Escolha a profissão",

        },
        validator: [formValidators.required],
        styleClasses: "col-xs-12 col-md-6"
      },
      functionID: {
        type: "select",
        label: "Cargo",
        required: true,
        values: this.functions,
        selectOptions: {
          noneSelectedText: "Escolha o cargo",
        },
        validator: [formValidators.required],
        styleClasses: "col-xs-12 col-md-6"
      },
      salary: {
        ...moneyField,
        label: "Salário Mensal (R$)",
        
        required: true,
        validator: [formValidators.required, formValidators.validateNotZero],
        styleClasses: "col-xs-12 col-md-6",      },

      ...addressFields(this.$store, true, true, this.block.model),


      isShareHolders: {
        type: "radios",
        label: "Sócio/Proprietário em Outra Empresa?",
        default: false,
        values: [{ name: "Sim", value: true }, { name: "Não", value: false }],
        styleClasses: "col-xs-12"
      },
    }
  }

  sendModel(model, share, RegistrationFormId) {
    let state = states.find(state => state.id == model.uf);
    
    try {
      state = state.name.substring(0,2)
    }
    catch (error) {
      state = model.uf
    }
    return {
      RegistrationFormId,
      ID: model.id,
      FullName: model.fullName,
      NumberDocumentCNPJ: model.numberDocumentCNPJ ? model.numberDocumentCNPJ.replace(/\D/g, "") : "",
      CapitalParticipation: model.capitalParticipation,
      AddressPostalCode: model.addressPostalCode,
      AddressNumber: model.addressNumber,
      AddressAdditionalData: model.addressAdditionalData,
      AddressStreetName: model.addressStreetName,
      ProfessionID: model.professionID,
      functionID: model.functionID,
      AddressNeighborhood: model.addressNeighborhood,
      CityName: model.cityName,
      UF: state,
      Phone: sendTelMask(model.phone),
      AdmissionDate: model.admissionDate ? dayjs(model.admissionDate).toDate() : null,
      Salary: model.salary,
      Shareholders: share.length >= 1 ? share.map( (el) => ({
        FullName: el.fullName,
        NumberDocumentCNPJ: el.numberDocumentCNPJ ?  el.numberDocumentCNPJ.replace(/\D/g, "") : "",
        CapitalParticipation: el.capitalParticipation,
        AdmissionDate: el.admissionDate ? dayjs(el.admissionDate).toDate() : null,
      })) : null
    }
  }
}
