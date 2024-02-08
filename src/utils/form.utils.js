import { formValidators } from '~/utils/validate.utils'
import { states } from './form.value.utils'
import isEmpty from 'lodash/isEmpty'


export const formOptions = {
  validateAfterChanged: true,
  validateDebounceTime: 500
}

//  const checkAddressFields = model => {
//   if ((model.addressNeighborhood == "" || model.addressNeighborhood == null) ||
//   (model.addressNumber == "" || model.addressNumber == null) ||
//   (model.addressPostalCode == "" || model.addressPostalCode == null) ||
//   (model.addressStreetName == "" || model.addressStreetName == null) ||
//   (model.cityName == "" || model.cityName == null) ||
//   (model.uf == "" || model.uf == null)){
//     return false
//   }
//   return true
// }

let varClearCity = false;
let varClearState = false;

let listCities = false;

let clearCity = (status) => {
  varClearCity = status;
  return varClearCity
};

let clearState = (status) => {
  varClearState = status;
  return varClearState
};


let nameField = {
  "addressNeighborhood" : true,
  "addressNumber": true,
  "addressPostalCode": true,
  "addressStreetName": true,
  "cityName": true,
  "uf": true
};

let checkAddressFields = model => {
  
  if(typeof model.addressStreetName == 'string'){    
    nameField.addressStreetName = model.addressStreetName.length > 0 ? true : false
  }
  
  if(typeof model.addressPostalCode == 'string'){    
    nameField.addressPostalCode = model.addressPostalCode.length > 0 ? true : false
  }

  if(typeof model.addressNumber == 'string'){    
    nameField.addressNumber = model.addressNumber.length > 0 ? true : false
  }

  if(typeof model.addressNeighborhood == 'string'){    
    nameField.addressNeighborhood = model.addressNeighborhood.length > 0 ? true : false
  }

  if(typeof model.cityName == 'string'){    
    nameField.cityName = model.cityName.length > 0 ? true : false
  }

  if(typeof model.uf == 'string'){    
    nameField.uf = model.uf.length > 0 ? true : false
  } 

  return true
}


export const addressFields = (cepState, isFieldsDisabled = true, isFieldsRequired = true, model = false ) => ({  
  addressStreetName: {
    type: "input",
    inputType: "text",
    label: "Logradouro",
    required: isFieldsRequired,
    disabled: isFieldsDisabled && (isEmpty(model.addressStreetName) ? false : true),
    validator: [formValidators.required, formValidators.validateAtLeastTwoNames, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
    styleClasses: "col-xs-12"
  },
  addressPostalCode: {
    type: "cleave",
    cleaveOptions: {
      blocks: [5, 3],
      delimiters: ['-'],
      numericOnly: true,
      uppercase: false,
      lowercase: false
    },
    label: "CEP",
    required: isFieldsRequired,
    disabled: isFieldsDisabled && (isEmpty(model.addressPostalCode) ? false : true),
    validator: formValidators.required,
    styleClasses: "col-xs-12 col-md-6"
  },
  addressNumber: {
    type: "input",
    inputType: "text",
    label: "N°",
    required: isFieldsRequired,
    disabled: isFieldsDisabled && (isEmpty(model.addressNumber) ? false : true),
    validator: formValidators.required,
    styleClasses: "col-xs-12  col-md-6"
  },
  addressAdditionalData: {
    type: "input",
    inputType: "text",
    label: "Complemento",
    styleClasses: "col-xs-12  col-md-6"

  },
  addressNeighborhood: {
    type: "input",
    inputType: "text",
    label: "Bairro",
    required: isFieldsRequired,
    disabled: isFieldsDisabled && (isEmpty(model.addressNeighborhood) ? false : true),
    validator: [formValidators.required, formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
    styleClasses: "col-xs-12  col-md-6"
  },
  

  uf: {
    type: "select",
    label: "Estado",
    selectOptions: {
      noneSelectedText: "Escolha o estado",
    },
    values: states,
    required: true,
    disabled: isFieldsDisabled && (isEmpty(model.uf) ? false : true),
    styleClasses: "col-xs-12 col-md-6",
    validator: formValidators.required,
    get(model) {      
      let state = [];
      state = states.find(state => state.name.includes(`${model.uf} - `));
      if(isEmpty(state)) {
        state = states.find(state => state.id == model.uf);
      }                  
      try{        
        if(!model.uf) {          
          cepState.state.cep.cities = []; 
          return null
        } else {          
          let stateid = state.id;          
          cepState.dispatch("cep/getCities", stateid);
        }    
        
      }
      catch(err) {
        console.warn(err);
      }
      return state ? state.id : model.uf
    },
    onChanged: (_, newModel) => {
      clearCity(true);  
      listCities = true;     
      cepState.dispatch("cep/getCities", newModel) 
    }
  },

  cityName: {
    type: "select",
    label: "Cidade",
    required: isFieldsRequired,
    disabled: isFieldsDisabled && ((isEmpty(model.cityName) ? false : true) && (isEmpty(model.uf) ? false : true)),
    validator: formValidators.required,
    selectOptions: {
      noneSelectedText: "Selecione a Cidade",
    },
    get(model) {      
      if(!isEmpty(model.cityName) && !varClearCity){
        return model.cityName          
      } else {        
        return null
      }
    },
    onChanged: (_, newModel) => {
      clearCity(false); 
    },
    values: function (model) {
      try {            
        return cepState.state.cep.cities.map(city => ({
          id: city.cityName,
          name: city.cityName
        }))
      } catch (err) {
        console.warn(err)
      }     
    },
    styleClasses: "col-xs-12  col-md-6"
  },
})
export const CNPJField = {
  type: "cleave",
  cleaveOptions: {
    blocks: [2, 3, 3, 4, 2],
    delimiters: ['.', '.', '/', '-'],
    numericOnly: true,
    uppercase: false,
    lowercase: false
  },
  label: "CNPJ"
}
export const CPFField = {
  type: "cleave",
  cleaveOptions: {
    blocks: [3, 3, 3, 2],
    delimiters: ['.', '.', '-'],
    numericOnly: true,
    uppercase: false,
    lowercase: false
  },
  label: "CPF",
}

export const PhoneField = {
  type: "cleave",
  cleaveOptions: {
    blocks: [0, 2, 4, 4],
    delimiter: ' ',
    delimiters: ['(', ') ', '-'],
    numericOnly: true
  },
  label: "DDD + Telefone Fixo",
}

export const CelPhoneField = {
  type: "cleave",
  cleaveOptions: {
    blocks: [0, 2, 5, 4],
    delimiter: ' ',
    delimiters: ['(', ') ', '-'],
    numericOnly: true
  },
  label: "DDD + Celular",
}

export const moneyField = {
  type: "money",
}

export const sendTelMask = (data) => {
  if(!data) { return };
  let dataMatch;
  data = data.replace(/\D/g,'');
  let dataLenght = data.length;
  dataMatch = dataLenght >= 11 ? data.match(/(\d{2})(\d{5})(\d{4})/) : data.match(/(\d{2})(\d{4})(\d{4})/);
  if (!dataMatch || dataMatch.length === 0) {
    return ""
  }
  return  "(" + dataMatch[1] + ") " + dataMatch[2] + "-" + dataMatch[3];
}

export const getCleanData = (data, cleanerData) => data ? data : cleanerData
