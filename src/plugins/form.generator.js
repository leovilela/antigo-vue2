import Vue from 'vue';
import VueFormGenerator from 'vue-form-generator'
import { validaDocumento, threeCharactersRepeated, atLeastTwoNames, atLeastTwoCharacters, underEighteen, upperDateValid, minorHundred, notZero } from "~/utils/validate.utils";
import FieldMoney from '~/components/atomic/molecules/Fields/FieldMoney'
import FieldDate from '~/components/atomic/molecules/Fields/FieldDate'

import 'vue-form-generator/dist/vfg.css'
import 'cleave.js'


Vue.component("fieldMoney", FieldMoney);
Vue.component("fieldDate", FieldDate);


const resources = {
  fieldIsRequired: "Campo obrigatório",
  invalidFormat: "Formato inválido!",

  numberTooSmall: "Número muito pequeno! Minimo: {0}",
  numberTooBig: "Número muito grande! Maximo: {0}",
  invalidNumber: "Número invalido",
  invalidInteger: "O valor não é inteiro",

  textTooSmall: "Texto muito curto! Atual: {0}, Minima: {1}",
  textTooBig: "Texto muito longo! Atual: {0}, Maximo: {1}",
  thisNotText: "Não é um texto!",

  thisNotArray: "Não é uma lista!",

  selectMinItems: "Selecione o minimo {0} items!",
  selectMaxItems: "Selecione o maximo {0} items!",

  invalidDate: "Data inválida!",
  dateIsEarly: "Data inválida! Atual: {0}, Minima: {1}",
  dateIsLate: "Data inválida! Atual: {0}, máxima: {1}",

  invalidEmail: "Email inválido!",
  invalidURL: "URL inválido!",

  invalidCard: "Cartão inválido!",
  invalidCardNumber: "Numero de cartão de credito inválido!",

  invalidTextContainNumber: "Texto inválido! Não pode conter números ou caracteres especiais",
  invalidTextContainSpec: "Texto inválido! Não pode conter carateres especiais"
}


Object.assign(VueFormGenerator.validators.resources, resources)

Vue.use(VueFormGenerator, {
  validators: {

    validateDocument: (value) => {
      if (!value) {
        return []
      }
      return validaDocumento(value) ? [] : ['Documento inválido'];
    },

    validateDocCpf: (value) => {
      if (!value) {
        return []
      }
      return validaDocumento(value) ? [] : ['CPF inválido'];
    },

    validateDocCnpj: (value) => {
      if (!value) {
        return []
      }
      return validaDocumento(value) ? [] : ['CNPJ inválido'];
    },

    validatePhone: (value) => {
      if (!value) {
        return []
      }
      if (value.length >= 14 && (/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/g.test(value))) {
        return [];
      }
      return ['Número de telefone inválido'];
    },

    validateThreeCharactersRepeated: (value) => {
      if (!value) {
        return [];
      }
      return threeCharactersRepeated(value) ? ['Preenchimento inválido'] : [];
    },

    validateAtLeastTwoCharacters: (value) => {
      if (!value) {
        return [];
      }
      return atLeastTwoCharacters(value) ? ['Preenchimento inválido'] : [];
    },

    validateAtLeastTwoNames: (value) => {
      if (!value) {
        return [];
      }
      return atLeastTwoNames(value) ? [] : ['Preenchimento inválido'];
    },

    validateUnderEighteen: (value) => {
      if (!value) {
        return [];
      }
      return underEighteen(value) ? [] : ['Necessário ter acima de 18 anos']
    },

    validateUpperDateValid: (value) => {
      if (!value) {
        return [];
      }
      return upperDateValid(value) ? [] : ['Data inválida']
    },

    validateMinorHundred: (value) => {
      if (!value) {
        return [];
      }
      return minorHundred(value) ? [] : ['Data inválida']
    },

    validateNotZero: (value) => {
      if (!value && !value == 0) {
        return [];
      }
      return notZero(value) ? [] : ['Preenchimento inválido']
    },

    validateDateSinceMonthEndYear: (value) => {
      if(!value){
        return [];
      }

      const dateSince = value.toString().split("/");
      const month = parseInt(dateSince[0]);
      const year = parseInt(dateSince[1]);
      const date = new Date();
      const currentYear = parseInt(date.getFullYear());
      // está sendo somado o mês atual mais 1 porque o primeiro mês é recebido como zero
      const currentMonth = parseInt(date.getMonth()) + 1;

      if (dateSince.length < 2) {
        return ['Data inválida'];
      }

      if (month > 12 || month === 0 || Number.isInteger(month) == false) {
        return ['Data inválida'];
      }

      if (year > currentYear || year < 1900 || Number.isInteger(year) == false) {
        return ['Data inválida'];
      }

      if(year === currentYear  && month > currentMonth){
        return ['Data inválida'];
      }

      return [];
    },
    validateYearMovable: (value) => {
      if(!value){
        return [];
      }

      const dateMovable = parseInt(value);
      const date = new Date();
      const minimumYear = 1900;
      const maximumYear = parseInt(date.getFullYear()) + 2;

      if (dateMovable < minimumYear) {
        return ['Data inválida'];
      }
      if (dateMovable > maximumYear) {
        return ['Data inválida'];
      }
      return [];
    },
    validateLastYear: (value) => {
      if(!value){
        return [];
      }

      const lastBillingYear = parseInt(value);
      const date = new Date();
      const blockYear = parseInt(date.getFullYear()) - 1;

      if (lastBillingYear < blockYear || lastBillingYear > blockYear) {
        return ['Data inválida'];
      }
      return [];
    },
    validatePenultimateYear: (value) =>{
      if(!value){
        return [];
      }

      const penultimateBillingYear = parseInt(value);
      const date = new Date();
      const blockYear = parseInt(date.getFullYear()) - 2;

      if (penultimateBillingYear < blockYear || penultimateBillingYear > blockYear) {
        return ['Data inválida'];
      }
      return [];
    }

  },

})
