import FormField from "~/interfaces/FormField"
import { movableSpecie } from "~/utils/form.value.utils"
import { moneyField, getCleanData } from "~/utils/form.utils"
import { formValidators } from '~/utils/validate.utils';
import dayjs from "dayjs"

export default class DataPatrimonyForm {
  constructor() {
    this.title = "Dados patrimoniais"
    this.name = "dataPatrimony"
    this.schemaMovables = {
      groups: [
        {
          legend: "Móvel",
          fields: Object.keys(this.getModelMovables()).map(key => {
            const formField = new FormField({ model: key, ...this.getModelMovables()[key] })
            return formField.field
          })
        }
      ]
    },
      this.schemaImovables = {
        groups: [
          {
            legend: "Imóvel",
            fields: Object.keys(this.getModelImovables()).map(key => {
              const formField = new FormField({ model: key, ...this.getModelImovables()[key] })
              return formField.field
            })
          }
        ]
      }
  }
  seedMovable() {
    return {
      movableSpecieID: "",
      markModel: "",
      year: "",
      value: ""
    }
  }
  seedImovable() {
    return {
      location: "",
      value: "",
      description: "",
    }
  }
  getModelMovables() {
    return {
      movableSpecieID: {
        type: "select",
        label: "Espécie",
        selectOptions: {
          hideNoneSelectedText: true
        },
        values: movableSpecie,
        styleClasses: "col-md-6 col-xs-12",
      },
      markModel: {
        type: "input",
        inputType: "text",
        label: "Marca/Modelo",
        validator: [formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12 col-md-6 ",
      },
      year: {
        type: "cleave",
        cleaveOptions: {
          date: true,
          dateMin: dayjs('1900-01-01').toISOString(),
          dateMax: dayjs().toISOString(),
          datePattern: ['Y']
        },
        label: "Ano",
        validator: [formValidators.validateYearMovable],
        styleClasses: "col-md-6 col-xs-12",
      },
      value: {
        ...moneyField,
        label: "Valor (R$)",
        styleClasses: "col-xs-12 col-md-6 "
      }
    }
  }
  getModelImovables() {
    return {
      location: {
        type: "input",
        inputType: "text",
        label: "Localização",
        validator: [formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-md-6 col-xs-12",
      },
      value: {
        ...moneyField,
        label: "Valor (R$)",
        styleClasses: "col-md-6 col-xs-12",
      },
      description: {
        type: "textArea",
        inputType: "text",
        label: "Descrição",
        max: 500,
        rows: 4,
        validator: [formValidators.validateAtLeastTwoCharacters, formValidators.validateThreeCharactersRepeated],
        styleClasses: "col-xs-12",
      },
    }
  }
  sendModel(movables, immovables, RegistrationFormId) {
    return {
      Movables: Object.values(movables[0]).every(el => el) ? movables.map(movable => ({
        RegistrationFormId,
        MovableSpecieID: movable.movableSpecieID,
        MarkModel: movable.markModel,
        Year: movable.year,
        Value: movable.value,
        ID: movable.id || 0
      })) : [],
      Immovables: Object.values(immovables[0]).every(el => el) ? immovables.map(immovable => ({
        RegistrationFormId,
        Description: immovable.description,
        Location: immovable.location,
        Value: immovable.value,
        ID: immovable.id || 0
      })) : []
    }
  }
}
