import { format } from 'money-formatter'


export const showNumberAsCurrency = number => number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const money = {
  decimal: ",",
  thousands: ".",
  prefix: "R$ ",
  precision: 2,
  masked: false,
};



export const moneyFormatter = (value) => {
  if (!value) {
    return '0,00'
  }
  if (+value === 0) {
    return '0,00'
  }
  return format('BRL', value)
    .replace(/,/gi, '.')
    .replace(/\.([^.]*)$/, ',' + '$1')
    .replace('$', '$ ')
}
