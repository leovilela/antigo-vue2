import { formValidators } from '~/utils/validate.utils'
import { moneyField } from "~/utils/form.utils"
import FormField from "~/interfaces/FormField"

export default class VehicleFinancing {
  constructor() {
    this.title = "Financiamento de Veículos"
    this.name = "vehicleFinancing"
    this.schema =  {
      fields: Object.keys(this.getModel()).map(key => {
        const formField = new FormField({ model: key, ...this.getModel()[key] })
        return formField.field
      })
    }

  }

  getModel() {
    return {
      // productionMotorVehiclesID: {
      //   type: "input",
      //   inputType: "number",
      //   label: "ID Veiculo",
      //   alidator: [formValidators.required, formValidators.number],
      //   styleClasses: "col-xs-12 col-lg-6 hidden"
      // },
      // registrationFormId: {
      //   type: "input",
      //   inputType: "number",
      //   label: "ID Form",
      //   alidator: [formValidators.required, formValidators.number],
      //   styleClasses: "col-xs-12 col-lg-6 hidden"
      // },
      type: {
        type: "checklist",
        label: "Tipos de Veículos com os quais trabalha",
        listBox: true,
        values: [
          { value: 'LIGHT', name: "Leves"},
          { value: 'MOTO', name: "Motos"},
          { value: 'HEAVY', name: "Pesados"},
          { value: 'UTILITY', name: "Utilitários"}
        ],
        styleClasses: "col-xs-12 col-lg-12 col-md-12 form-group__list",
      },
      // typeLight: {
      //   type: "radios",
      //   label: "Tipos de Veículos Pequenos",
      //   values: [
      //     { name: "Sim", value: true },
      //     { name: "Não", value: false },
      //   ],
      //   styleClasses: "col-xs-12 col-lg-6"
      // },
      // typeHeavy: {
      //   type: "radios",
      //   label: "Tipos de Veículos Pesado",
      //   values: [
      //     { name: "Sim", value: true },
      //     { name: "Não", value: false },
      //   ],
      //   styleClasses: "col-xs-12 col-lg-6"
      // },
      // typeUtility: {
      //   type: "radios",
      //   label: "Tipos de Veículos Utilitário",
      //   values: [
      //     { name: "Sim", value: true },
      //     { name: "Não", value: false },
      //   ],
      //   styleClasses: "col-xs-12 col-lg-6"
      // },
      // typeMoto: {
      //   type: "radios",
      //   label: "Tipos de Veículos Moto",
      //   values: [
      //     { name: "Sim", value: true },
      //     { name: "Não", value: false },
      //   ],
      //   styleClasses: "col-xs-12 col-lg-6"
      // },
      size: {
        type: "radios",
        label: "Quantidade de veículos em estoque",
        values: [
          {name: "Pequena de 01 a 15", value: 'SMALL'},
          {name: "Pequena de 16 a 45", value: 'MEDIUM'},
          {name: "Grande acima de 45", value: 'LARGE'},
        ],
        styleClasses: "col-xs-12 col-lg-12 col-md-12 form-group__qtd-estoque",
      },
      qtdePhase0Km: {
        type: "input",
        inputType: "number",
        label: "O km",
        validator: [formValidators.required, formValidators.number],
        styleClasses: "col-xs-4 col-lg-4 form-group__qtd-not-bold",
      },
      qtdePhaseUp2002: {
        type: "input",
        inputType: "number",
        label: "Acima de 2002",
        validator: [formValidators.required, formValidators.number],
        styleClasses: "col-xs-4 col-lg-4 form-group__qtd-not-bold",
      },
      qtdePhaseDown2002: {
        type: "input",
        inputType: "number",
        label: "Abaixo de 2002",
        validator: [formValidators.required, formValidators.number],
        styleClasses: "col-xs-4 col-lg-4 form-group__qtd-not-bold",
      },
      volumeSoldMonth: {
        type: "input",
        inputType: "number",
        label: "Vol. Veículos Vendidos Mês",
        validator: [formValidators.required, formValidators.number],
        styleClasses: "col-xs-4 col-lg-4 form-group__qtd-not-bold form-group__vol-veiculos",
      },
      volumeFinancedMonth: {
        type: "input",
        inputType: "number",
        label: "Vol. Veículos Financiados Mês",
        validator: [formValidators.required, formValidators.number],
        styleClasses: "col-xs-4 col-lg-4 form-group__qtd-not-bold form-group__margin",
      },
      valueFinancedMonth: {
        ...moneyField,
        label: "Valor de Financiamentos Mês",
        model: "valueFinancedMonth",
        styleClasses: "col-xs-4 col-lg-4 form-group__qtd-not-bold form-group__margin"
      }
    }
  }

  sendModel(model, RegistrationFormId) {
    const size = model.size
    const type = model.type || []
    return {
      ID: model.id,
      ProductionMotorVehiclesID: model.ProductionMotorVehiclesID,
      RegistrationFormId,
      TypeLight: type.includes('LIGHT'),
      TypeHeavy: type.includes('HEAVY'),
      TypeUtility: type.includes('UTILITY'),
      TypeMoto: type.includes('MOTO'),
      SizeStockSmall: size === 'SMALL',
      SizeStockMedium: size === 'MEDIUM',
      SizeStockLarge: size === 'LARGE',
      QtdePhase0Km: model.qtdePhase0Km,
      QtdePhaseUp2002: model.qtdePhaseUp2002,
      QtdePhaseDown2002: model.qtdePhaseDown2002,
      VolumeSoldMonth: model.volumeSoldMonth,
      VolumeFinancedMonth: model.volumeFinancedMonth,
      ValueFinancedMonth: model.valueFinancedMonth,
    }
  }
}
