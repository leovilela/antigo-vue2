import { formValidators } from '~/utils/validate.utils';
import { addressFields, PhoneField, sendTelMask } from "~/utils/form.utils"
import FormField from "~/interfaces/FormField";
import { homeTime, states } from '../../../../../utils/form.value.utils';
import isEmpty from 'lodash/isEmpty'

export default class PersonalAddressForm {
  constructor(cepState) {
    this.title = "Residência";
    this.$store = cepState;
    this.name = "personalAddress";
    this.schema = {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    };
  }
  getModel() {
    return {
      homeTypeID: {
        type: "radios",
        label: "Residência",
        required: true,
        values: [{ name: "Própria", value: 1 }, { name: "Alugada", value: 2 }, { name: "outro", value: 5 }],
        validator: formValidators.required,
        styleClasses: "col-xs-12"
      },
      otherHome: {
        type: "input",
        inputType: "text",
        label: "Outro",
        required: true,
        validator: formValidators.required,
        styleClasses: "col-xs-12",
        visible(model) {
          return model && model.homeTypeID == 5;
        }
      },
      houseTimeID: {
        type: "select",
        label: "Tempo de residência",
        values: homeTime,
        selectOptions: {
          noneSelectedText: "Selecione o tempo de residência",
        },
        required:true,
        validator: formValidators.required,
        styleClasses: "col-xs-12 col-md-6"
      },
      phone: {
        ...PhoneField,
        validator: [formValidators.validatePhone],
        disabled: false,
        styleClasses: "col-xs-12 col-md-6",
      },
      ...addressFields(this.$store, false),
    }
  }
  sendModel(model, RegistrationFormId) {    
    if(isEmpty(model)){      
      return
    }
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
      HomeTypeID: model.homeTypeID,
      HouseTimeID: model.houseTimeID,
      AddressPostalCode: model.addressPostalCode,
      AddressNumber: model.addressNumber,
      AddressAdditionalData: model.addressAdditionalData ? model.addressAdditionalData : "",
      AddressStreetName: model.addressStreetName,
      AddressNeighborhood: model.addressNeighborhood,
      CityName: model.cityName,
      Uf: state,
      ReferencePoint: model.referencePoint,
      Phone: sendTelMask(model.phone),
      OtherHome: model.otherHome
    }
  }
}
