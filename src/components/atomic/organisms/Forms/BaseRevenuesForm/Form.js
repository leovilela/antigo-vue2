import { formValidators } from '~/utils/validate.utils';
import { moneyField, getCleanData } from "~/utils/form.utils"
import FormField from "~/interfaces/FormField";
import dayjs from 'dayjs';

export default class RevenueForm {
  constructor() {
    this.title = "Faturamento (Últimos 02 anos)";
    this.name = "revenues";
    this.schema = {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    };
  }
  getModel() {
    return {
      revenuesYear01: {
        type: "cleave",
        cleaveOptions: {
          date: true,
          dateMin: '1900-01-01',
          dateMax: dayjs().toISOString(),
          datePattern: ['Y']
        },
        label: "Ano",
        validator: formValidators.validatePenultimateYear,
        styleClasses: "col-xs-4",

      },
      revenuesValue01: {
        ...moneyField,
        label: "Valor (R$)",
        styleClasses: "col-xs-8"
      },
      revenuesYear02: {
        type: "cleave",
        cleaveOptions: {
          date: true,
          dateMin: '1900-01-01',
          dateMax: dayjs().toISOString(),
          datePattern: ['Y']
        },
        label: "Ano",
        validator: formValidators.validateLastYear,
        styleClasses: "col-xs-4"
      },
      revenuesValue02: {
        ...moneyField,
        label: "Valor (R$)",
        styleClasses: "col-xs-8"
      },
      companySizeID: {
        type: "radios",
        label: "Com base no faturamento, classifique o porte da empresa",
        values: [{ name: "Micro", value: 1 }, { name: "Pequeno", value: 2 }, { name: "Médio", value: 3 }, { name: "Grande", value: 4 }],
        styleClasses: "col-xs-12"
      }
    }
  }
  sendModel(model, RegistrationFormID) {
    return {
      RegistrationFormID,
      RevenuesYear01: model.revenuesYear01,
      RevenuesValue01: model.revenuesValue01,
      RevenuesYear02: model.revenuesYear02,
      RevenuesValue02: model.revenuesValue02,
      CompanySizeID: model.companySizeID,
    }
  }
}
