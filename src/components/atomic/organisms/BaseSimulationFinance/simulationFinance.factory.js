import { moneyFormatter } from '~/utils/currency.utils';
export const entranceRows = (entranceValue, simulationInstallments) => {
  return simulationInstallments
    .filter(simulationInstallment => simulationInstallment.rType === 0 && [1, 6, 12].includes(simulationInstallment.installmentModeId))
    .map(simulationInstallment => {
      const simulationInstallmentValue = simulationInstallment.coefficient * entranceValue
      return {
        releasedValue: moneyFormatter(simulationInstallmentValue),
        totalValue: moneyFormatter(simulationInstallmentValue * simulationInstallment.installmentModeId),
        installmentMode: simulationInstallment.installmentModeId,
        meta: simulationInstallment
      }
    })
}


export const installmentRows = (marketValue, simulationInstallments) => {
  return simulationInstallments.map(simulationInstallment => {
    const simulationInstallmentValue = simulationInstallment.coefficient * marketValue
    return {
      releasedValue: moneyFormatter(simulationInstallmentValue),
      totalValue: moneyFormatter(simulationInstallmentValue * simulationInstallment.installmentModeId),
      installmentMode: simulationInstallment.installmentModeId,
      meta: simulationInstallment
    }
  })
}
