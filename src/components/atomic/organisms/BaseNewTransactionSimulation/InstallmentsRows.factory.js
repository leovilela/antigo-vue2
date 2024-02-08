import { moneyFormatter } from '~/utils/currency.utils';
export default (transactionTypeId, simulationInstallments) => {
  return simulationInstallments.map(simulationInstallment => {
    switch (transactionTypeId) {
      case 1:
        return {
          releasedValue: moneyFormatter(simulationInstallment.value),
          transactionValue: moneyFormatter(simulationInstallment.ParcelaComCoeficiente),
          installmentMode: simulationInstallment.parcela,
          meta: simulationInstallment
        }
      case 2:
        return {
          releasedValue: moneyFormatter(simulationInstallment.ParcelaComCoeficiente),
          installmentValue: moneyFormatter(simulationInstallment.valorParcelaOriginal),
          totalReleasedTransaction: moneyFormatter(simulationInstallment.totalParcelas),
          installmentMode: simulationInstallment.parcela,
          meta: simulationInstallment
        }
      case 4:
        return {
          releasedValue: moneyFormatter(simulationInstallment.liberadoComCoeficiente),
          installmentValue: moneyFormatter(simulationInstallment.ParcelaComCoeficiente),
          totalTransaction: moneyFormatter(simulationInstallment.totalParcelas),
          installmentMode: simulationInstallment.parcela,
          meta: simulationInstallment
        }
      case 8:
        return {
          releasedValue: moneyFormatter(simulationInstallment.ParcelaComCoeficiente),
          transactionValue: moneyFormatter(simulationInstallment.value),
          installmentMode: simulationInstallment.parcela,
          meta: simulationInstallment
        }

      default:
        return {

        }
    }
  })

}
