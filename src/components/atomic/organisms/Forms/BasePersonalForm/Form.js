import { CPFField, CelPhoneField, PhoneField, sendTelMask } from "~/utils/form.utils"
import { degreeEducation, gender, maritalStatus, states } from "~/utils/form.value.utils"

import FormField from "~/interfaces/FormField"
import dayjs from "dayjs"
import { formValidators, atLeastTwoNames, minorHundred  } from "~/utils/validate.utils"


export default class PersonalForm {
  constructor(hasNameMother = false, maritalStatus = [], fullName = null, cpf = null, genderID = 0, gender = null, birthDate = '1900-01-01T00:00:00', phone = null, phoneCel = null) {
    
    this.maritalStatus = maritalStatus.map(val => ({id: val.id, name: val.description}))
    this.hasNameMother = hasNameMother
    this.fullName = fullName;
    this.cpf = cpf;
    this.genderID = genderID;
    this.gender = gender;
    this.birthDate = birthDate;
    this.phone = phone;
    this.phoneCel = phoneCel;

    
    this.title = "Dados Cadastrais"
    this.schema = {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    }
    this.name = "registerDataPf"
  }
  checkValidDate(){

  }
  getModel() {
    return {
      cpf: {
        ...CPFField,       
        validator: [formValidators.validateDocCpf, formValidators.required],
        required: true,
        disabled: (model) => this.cpf == null || this.cpf == "" ? false : true,
        validator: [formValidators.validateDocCpf, formValidators.required],
        styleClasses: "col-xs-12 col-md-6",
      },
      fullName: {
        type: "input",
        inputType: "text",
        label: "Nome Completo",
        required: true,
        disabled: (model) => this.fullName == null || this.fullName == "" || !atLeastTwoNames(this.fullName) ? false : true,
        validator: [formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6",
      },
      rg: {
        type: "input",
        inputType: "text",
        label: "Nº Identidade",
        required: true,
        disabled: false,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters],
        styleClasses: "col-xs-12 col-md-6",
      },
      documentState: {
        type: "select",
        label: "UF emissão",
        selectOptions: {
          noneSelectedText: "Escolha o estado",
        },
        values: states,
        required: true,
        styleClasses: "col-xs-12 col-md-6",
        validator: formValidators.required,
        get(model) {          
          let state = states.find(state => state.name.includes(`${model.documentState} - `))          
          return state ? state.id : model.documentState
        }
      },
      organEmitter: {
        type: "input",
        inputType: "text",
        label: "Órgão Emissor",
        required: true,
        disabled: false,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6"
      },
      emissionDate: {
        type: "date",
        label: "Data de Emissão",
        placeholder: "00/00/0000",
        notBefore: (model) => new Date(model.birthDate),
        notAfter: new Date(),
        required: true,
        styleClasses: "col-xs-12 col-md-6",
        validator: [formValidators.required,formValidators.date, formValidators.validateUpperDateValid]
      },
      degreeEducationID: {
        type: "select",
        label: "Grau de Instrução",
        selectOptions: {
          noneSelectedText: "Escolha Grau de Instrução",
        },
        values: degreeEducation,
        styleClasses: "col-xs-12 col-md-6",
      },
      nameMother: {
        type: "input",
        inputType: "text",
        label: "Nome da Mãe",
        required: true,
        disabled: (model) => this.hasNameMother,
        validator: [formValidators.required, formValidators.validateAtLeastTwoNames],
        styleClasses: "col-xs-12 col-md-6",
      },
      maritalStatusID: {
        type: "select",
        label: "Estado Civil",
        required: true,
        validator: formValidators.required,
        selectOptions: {
          noneSelectedText: "Escolha Estado Civil",
        },
        values: this.maritalStatus,
        styleClasses: "col-xs-12 col-md-6"
      },
      genderID: {
        type: "select",
        label: "Sexo",
        required: true,
        disabled: (model) => this.genderID == null || this.genderID == 0 || this.genderID == "" ? false : true,
        validator: [formValidators.required, formValidators.validateNotZero],
        selectOptions: {
          noneSelectedText: "Escolha o Sexo",
        },
        values: gender,
        styleClasses: "col-xs-12 col-md-6"
      },
      birthDate: {
        type: "date",
        label: "Data de Nascimento",
        placeholder: "00/00/0000",        
        required: true,
        disabled: (model) => this.birthDate == null || this.birthDate == '1900-01-01T00:00:00' || this.birthDate == "" || !(dayjs().subtract(18, 'y').isAfter(dayjs(model.birthDate))) ? false : true,
        validator: [formValidators.required,formValidators.date,formValidators.validateUnderEighteen, formValidators.validateUpperDateValid, formValidators.validateMinorHundred], 
        notBefore: (model) =>  new Date(dayjs().subtract(100, 'y')),
        notAfter: (model) => new Date(dayjs().subtract(18, 'y')),
        styleClasses: "col-xs-12 col-md-6",
      },

      placeOfBirth: {
        type: "input",
        inputType: "text",
        label: "Natural de ",
        required: true,
        disabled: false,
        validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6",
      },
      phone: {
        ...PhoneField,
        required: true,
        disabled: (model) => this.phone == null || this.phone == "" ? false : true,
        validator: [formValidators.validatePhone, formValidators.required],
        styleClasses: "col-xs-12 col-md-6",
      },
      phoneCel: {
        ...CelPhoneField,
        required: true,
        disabled: (model) => this.phoneCel == null ||  this.phoneCel == "" ? false : true,
        validator: [formValidators.required, formValidators.validatePhone],
        model: "phoneCel",
        styleClasses: "col-xs-12 col-md-6"
      },
      email: {
        type: "input",
        inputType: "email",
        label: "E-mail",
        required: true,
        disabled: true,
        validator: [formValidators.required, formValidators.email],
        styleClasses: "col-xs-12 col-md-6",
      },
    }
  }
  sendModel(model, AffiliateId, RegistrationFormID) {    
    let state = states.find(state => state.id === model.documentState)
    if (!state) {
      state = model.documentState
    } else {
      state = state.name.split('-')[0].trim()
    }
    const postObj = {
      AffiliateId,
      RegistrationFormID,
      CPF: {
        Number: model.cpf,
        DocumentType: 0,
      },
      RG: {
        Number: model.rg,
        // DocumentType: model.identificationDocumentType,
        OrganEmitter: model.organEmitter,
        DocumentState: state,
        EmissionDate: model.emissionDate ? dayjs(model.emissionDate).toISOString() : "",
      },
      Name: {
        Value: model.fullName,
      },
      MotherName: {
        Value: model.nameMother,
      },
      MaritalStatus: model.maritalStatusID,
      DegreeEducation: model.degreeEducationID,
      Gender: model.genderID,
      PlaceOfBirth: model.placeOfBirth,
      BirthDate: model.birthDate != '1900-01-01T00:00:00' && model.birthDate != '' && model.birthDate != null ? dayjs(model.birthDate).toISOString() : "",
    }
    if (model.phoneCel) {
      postObj.Cellphone = {
        Number: sendTelMask(model.phoneCel),
      }
    }
    if (model.phone) {
      postObj.Telephone = {
        Number: sendTelMask(model.phone),
      }
    }

    if (model.email) {
      postObj.Email = {
        Value: model.email,
      }
    }
    return postObj
  }
}
