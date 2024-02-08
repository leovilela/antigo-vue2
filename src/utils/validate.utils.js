/* eslint no-mixed-operators: 0 */

import {
  helpers,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";

import dayjs from "dayjs"

import VueFormGenerator from 'vue-form-generator'

export const formValidators = VueFormGenerator.validators

export const validateIf = (prop, validator) =>
  helpers.withParams({ type: 'validatedIf', prop }, function (value, parentVm) {
    return helpers.ref(prop, this, parentVm) ? validator(value) : true
});
export const underEighteen = (date) => {  
  let actualDate = new Date(date);
  let compareUnderEighteen = new Date(dayjs().subtract(18, 'y'));
  return actualDate > compareUnderEighteen ? false : true;  
}

export const upperDateValid = (date) => {
  let validate = dayjs(new Date(date)).isAfter(dayjs('1900-01-01'))
  return validate;
}

export const minorHundred = (date) => {
  let actualDate =new Date(date);
  let compareMinorHundred = new Date(dayjs().subtract(100, 'y')); 
  return compareMinorHundred > actualDate ? false : true; 
}

export const notZero = (date) => {    
  let compare = (date <= 0 || date == null || date == "") ? false : true;
  return compare;
}

export function validaPlaca(placa) {
  let resposta = false;
  if (!placa) {
    return resposta
  }
  placa = placa.replace(/ /g, '');
  const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
  const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
  const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;
  if (regexPlaca.test(placa)) {
    resposta = true;
  }
  if (regexPlacaMercosulCarro.test(placa)) {
    resposta = true;
  }
  if (regexPlacaMercosulMoto.test(placa)) {
    resposta = true;
  }
  return resposta;
}


export const validaDocumento = (value) => {
  if (!value) {
    return false;
  }
  value = value.toString().replace(/[^0-9]/g, "");
  if (value.length === 11) {
    return validateCPF(value);
  }

  if (value.length === 14) {
    return validateCNPJ(value);
  }
  return false;
};

export const validateCPF = (cpf) => {
  let numeros; let digitos; let soma; let i; let resultado; let
    digitosIguais;
  digitosIguais = 1;
  if (cpf.length < 11) { return false; }
  for (i = 0; i < cpf.length - 1; i++) {
    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
      digitosIguais = 0;
      break;
    }
  }
  if (!digitosIguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--) { soma += numeros.charAt(10 - i) * i; }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) { return false; }
    numeros = cpf.substring(0, 10);
    soma = 0;
    for (i = 11; i > 1; i--) { soma += numeros.charAt(11 - i) * i; }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) { return false; }
    return true;
  } return false;
};

export const validateCNPJ = (s) => {
  const cnpj = s.replace(/[^\d]+/g, "");

  // Valida a quantidade de caracteres
  if (cnpj.length !== 14) { return false; }

  // Elimina inválidos com todos os caracteres iguais
  if (/^(\d)\1+$/.test(cnpj)) { return false; }

  // Cáculo de validação
  const t = cnpj.length - 2;
  const d = cnpj.substring(t);
  const d1 = parseInt(d.charAt(0), 10);
  const d2 = parseInt(d.charAt(1), 10);
  const calc = (x) => {
    const n = cnpj.substring(0, x);
    let y = x - 7;
    let s = 0;
    let r = 0;

    for (let i = x; i >= 1; i--) {
      s += n.charAt(x - i) * y--;
      if (y < 2) { y = 9; }
    }

    r = 11 - s % 11;
    return r > 9 ? 0 : r;
  };

  return calc(t) === d1 && calc(t + 1) === d2;
};

export const atLeastTwoNames = (value) => {
  if (!value) {
    return false;
  }
  return value.trim().split(" ").length > 1;
};

export const validatePassword = {
  minLength: minLength(6),
  maxLength: maxLength(10),
  oneUppercase: helpers.regex("alpha", /[A-Z]/),
  oneLowercase: helpers.regex("alpha", /[a-z]/),
  oneNumber: helpers.regex("numeric", /[0-9]/),
  oneSpecialCharacter: helpers.regex("alphaNum", /[!@#$&*.?]/),
};

const getAllWords = (input) => {
  const match = input.match(/\w/g);
  if (match) {
    return match.join("");
  }
  return "";
};

export const validateChassi = (chassi = 0) => {
  const zeroNoPrimeiroDigito = /^0/;

  if (zeroNoPrimeiroDigito.test(chassi)) {
    return false;
  }

  chassi = getAllWords(chassi);
  const repeticaoMaisDe6Vezes = /^.{4,}([0-9A-Z])\1{5,}/;

  if (repeticaoMaisDe6Vezes.test(chassi)) {
    return false;
  }

  const caracteresiIoOqQ = /[iIoOqQ]/;

  if (caracteresiIoOqQ.test(chassi)) {
    return false;
  }

  const ultimos4Numericos = /[0-9]{4}$/;

  if (!ultimos4Numericos.test(chassi)) {
    return false;
  }

  if (chassi.length > 17) {
    return false;
  }

  return true;
};

export const threeCharactersRepeated = (str) => {
  let i;
  const text = str.toString().toLowerCase().trim().split("");
  for (i = 0; i < text.length; i++) {
    if (text[i] === text[i + 1] && text[i] === text[i + 2]) {
      return true;
      break;
    }

  }
  return false;
};

export const atLeastTwoCharacters = (str) => {
  const text = str.toString().toLowerCase().trim().split(" ").join("");
  if (text.length < 2) {
    return true;
  }
  return false;
}

export const strengthPassword = (value) => {
  var strength = {
    0: "Senha muito fraca",
    1: "Senha fraca",
    2: "Senha média",
    3: "Senha forte",
    4: "Senha muito forte"
  }
  var classStrength = {
    0: "darkred",
    1: "#ff4500",
    2: "orange",
    3: "#9acd32",
    4: "green"
  }
  return {
    "color": classStrength[value], 
    "message": strength[value]
  }
}